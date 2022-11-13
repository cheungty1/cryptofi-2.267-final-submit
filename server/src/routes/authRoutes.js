// AUTH ROUTES FILE
// Import express and router 
const express = require('express'); 
const router = express.Router();

// Import auth modules
const AuthPolicy = require('../policies/authPolicy');
const FilePolicy = require('../policies/filePolicy');
const fileServerUpload = require('../middleware/fileServerUpload');
const AuthController = require('../controllers/authController');
const authPolicy = require('../policies/authPolicy');

// Setup routes within export function
module.exports = () => {
  // AUTH: TEST (GET ALL) ROUTE
  router.get('/users', 
    AuthController.listUsers
  );

  // AUTH: REGISTER (POST) Route
  router.post('/register', 
    [AuthPolicy.validateAuth,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    AuthController.register
  );

  // AUTH: LOGIN (POST) Route
  router.post('/login', 
    AuthPolicy.validateAuth,
    AuthController.login
  );

  // GET BY ID Route
  router.get('/:id',
  AuthController.getUserProfileById
  );

  // AUTH: PUT Route
  router.put('/:id', 
    [AuthPolicy.validateAuth,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    AuthController.putUserProfileById
  );

  return router
}