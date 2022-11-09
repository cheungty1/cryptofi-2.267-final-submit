# [F4] COMPLEX CRUD OPERATIONS: COMPLEX READS & WRITES

**PROGRESS:** We currently have a full stack application, that allows for users to register, login and logout + has basic GET ALL working for our currency API.

**GOAL:** We need to add to our application to allow users to ADD, READ, UPDATE & DELETE different CBDC currency entries - allowing for full site capabilities.  

**CURRENT FOCUS**:

  - **F2:** Add to our RESTful API to allow for GET ALL requests to read ALL "currency" data from the database (COMPLETE)

  - **F3:** Optimise our server GET ALL requests through the use of sort keys, indexes and through-put analysis (COMPLETE)

  - **F4:** Completing the suite of CRUD operations with image handling via "Cloud Firestore Storage" (**REMAINING CONTENT - 2/3 WEEKS**)

&nbsp;

# D. DELETE REQUEST [BY ID]

## 1. SERVER API ENDPOINT

### A Expand currencyRoute & currencyController + Pass in Existing Validation

**GOAL:** To expose an endpoint that will delete currency items on request

**STEPS:**

  - **(a) Extend `currencyRoutes.js` for `delete` by id route**

    - No need for further imports, as we only need access to the `currencyController`

    - The path remains as `/:id` as it MUST also be passed the id via query string params [dynamic ids](http://expressjs.com/en/5x/api.html#req.params)

  - **(b) Create new `async` function, being `deleteCurrencyById` in the `currencyController.js`, taking standard express handlers as parameters & `try-catch`**

&nbsp;

### B PROCESS DELETE QUERY TO DB & CLOUD STORAGE

**GOAL:** With the route established, we need to complete the `deleteCurrencyById` function to delete both the image from cloud storage & the document from Firestore

**STEPS:**

  - **(a) Store document reference & run read query**

    - (i) Store document reference by passing in the collection name & document id: `db.collection('currency').doc(req.params.id)`

    - (ii) Run a read query against the ref: `.get()`

    - (iii) Check for whether the referenced doc exists in the collection: `!doc.exists`, and if not, pass back a 400 error

  - **(b) Obtain `uploadedFile` name from downloadURL**

    - **IMPORTANT:** As with our `put()` route, to delete an image from Cloud Storage, the `delete()` method takes the exact uploadFile name that is currently stored as NOT the `downloadURL`
    
    - (i) Store the db document image link in downloadURL variable, obtained from our retrieved document: `doc.data().image`

    - (ii) Create a new function, `getFileFromUrl` in `bucketServices.js`:

      - **NOTE:** This is identical to the same function we used on the React `currencyServices` to achieve the same end

      - **THEORY:** This is the benefit of front-to-back JavaScript and basic string manipulation methods

      - **MAKE SURE:** To import in `config` and change the local of the `env` to the server-side location: `config.db.storageBucket`

    - (iii) Pass the `downloadURL` as an argument into `getFileFromUrl` in `currencyController.js`

  - **(c) Delete image from Cloud Storage & document from Cloud Firestore**

    - Call the `deleteFileFromBucket` function already-created and pass in the `uploadedFile` to delete the image

    - If there is a `true` response, stored in `bucketResponse`, run the

    - **NOTE:** We pass an argument into the `delete()` method, known as a "precondition", to check the document being deleted exists.  If set to `{exists:true}`, and the document does not exist, it will cause an error and trigger our `catch(err)`

  - **(d) Test the delete route via Postman - making sure to pass the `id` of the document as a URL query param**