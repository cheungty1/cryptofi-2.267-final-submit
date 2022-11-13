// Import our Database Configuration (allows us to query database)
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { findUser, hashPassword, comparePassword, userDetailsToJSON, jwtSignUser } = require('../utilities/authServices');
const { storageBucketUpload, getFileFromUrl, deleteFileFromBucket } = require('../utilities/bucketServices');
const debugREAD = require('debug')('app:read');
const debugAuth = require('debug')('app:authcontroller');
const debugPOST = require('debug')('app:post');
const _ = require('lodash');

module.exports = {
  // GET ALL Users
  async listUsers(req, res, next){
    // Store the document query in variable & call GET method
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    // [400 ERROR] Check for User Asking for Non-Existent Documents
    if (snapshot.empty) {
      return next(ApiError.badRequest('The users you were looking for do not exist'));

    // SUCCESS: Push object properties to array and send to client
    } else {
      let users = [];
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin
        });
      });
      res.send(users);
    }
  },

  // REGISTER: POST
  async register(req, res, next){
      // Destructure specific properties for use
      debugAuth(req.body);
      debugPOST(req.files);
      debugPOST(res.locals);
      debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`);
      const { username, email, password } = req.body;

      // Validation: Block matching user email
      const userMatch = await findUser(email);
      if( userMatch.length === 1 ){
        return next(ApiError.badRequest('This email is already in use'));
      } 

      // (b) File Upload to Storage Bucket
      let downloadURL = null;
      try {      
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);

      // [500 ERROR] Checks for Errors in our File Upload
      } catch(err) {
      return next(ApiError.internal('An error occurred in uploading the image to storage', err));
      }

      // Save new user to database
      // NOTE: If the "add" fails, it will return an error, so we do NOT have to check for a success response
      try {
      const usersRef = db.collection('users'); 
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false,
        // Added Image key: value pair to allow for avatar image uploads
        image: downloadURL
      });

      // Confirm Registration & Convert user details to JSON
      console.log(`Success - User: ${response.id} registered!`);
      const userJSON = await userDetailsToJSON(response.id);

      // Return token ONLY
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile could not be registered', err));
    }
  },


  // LOGIN: POST
  async login(req, res, next){
    try {
      // Destructure specific properties for use
      debugAuth(req.body);
      debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`);
      const { email, password } = req.body; 
      
      // Validation: Block non-matching user email
      const userMatch = await findUser(email);

      if (userMatch.length === 0){
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: email)'));
      }

      // Validation: Block non-matching passwords
      const passwordMatch = await comparePassword(userMatch, password);
      if (!passwordMatch) {
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: password)')); 
      }

      // Confirm Login & Convert User Details to JSON
      console.log(`Success - User: ${userMatch[0].id} is logged in!`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      // Return token ONLY
      res.send({
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile cannot be logged into at this time', err));
    }
  },

// GET Profile BY ID - Custom added to allow the population of Edit Profile form
async getUserProfileById(req, res, next){
  // Test: Check ID passed via URL query string parameters
  debugREAD(req.params);

  try {
    // Store the profile document query in variable & call GET method for ID
    const avatarRef = db.collection('users').doc(req.params.id);
    const doc = await avatarRef.get();
    console.log(doc)
    //do below here
//here edit out password, take doc variable and update value to only be made up of no password***

    // [400 ERROR] Check for User Asking for Non-Existent Documents
    if (!doc.exists) {
      return next(ApiError.badRequest('The user you were looking for does not exist'));

    // SUCCESS: Send back the specific document's data
    } else {
      // Convert Data to JSON
      // Use Spread operator and lodash method to EXCLUDE the password while reconstructing the user object
      // Omits the password sent back to client when populating the form of the edit Profile page 
      const userJSON = _.omit(
        { ...doc.data() },
        'password'
      );
      console.log(userJSON);
      res.send(userJSON); // here returns all the data
    }

  // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
  } catch(err) {
    return next(ApiError.internal('Your request could not be processed at this time', err));
  }
},

  // [4] PUT Profile BY ID - Edit Profile details and image in Custom Edit Profile page
  async putUserProfileById(req, res, next){
    // (a) Validation (JOI) Direct from Form (refactored)
    debugPOST(req.params);
    debugPOST(req.body);
    debugPOST(req.files);
    debugPOST(res.locals);

    // (b1) File Upload to Storage Bucket
    // IMAGE CHANGED: If the image is updated, a new file will be saved under req.files
    // NOTE: We will call standard file uploader + we will ALSO need to delete the OLD image URL from the storage location (if there is one)
    let downloadURL = null;
    try {      
      if (req.files){
        // (i) Storage-Upload
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);
        
        // (ii) Delete OLD image version in Storage Bucket, if it exists
        if (req.body.uploadedFile) {
          debugPOST(`Deleting old image in storage: ${req.body.uploadedFile}`);
          const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile);
        }
      // (b2) IMAGE NOT CHANGED: We just pass back the current downloadURL and pass that back to the database, unchanged!
    } else if (req.body.image) {
      console.log(`No change to image in DB`);
      downloadURL = req.body.image;
      
    } else {
      return next(ApiError.badRequest('The file you are trying to upload cannot be edited at this time'));
    }
      
    // [500 ERROR] Checks for Errors in our File Upload
    } catch(err) {
      return next(ApiError.internal('An error occurred in saving the image to storage', err));
    }

    // (c) Store the users document query in variable & call UPDATE method for ID
    try {
      const avatarRef = db.collection('users').doc(req.params.id);
      const response = await avatarRef.update({
        username: req.body.username,
        email: req.body.email,
        //password: req.body.password,
        isAdmin: false,
        image: downloadURL
      });
      res.send(response);

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time', err));
    }
  },
}