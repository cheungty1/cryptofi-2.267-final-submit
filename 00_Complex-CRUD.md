# [F4] COMPLEX CRUD OPERATIONS: COMPLEX READS & WRITES

**PROGRESS:** We currently have a full stack application, that allows for users to register, login and logout + has basic GET ALL working for our currency API.

**GOAL:** We need to add to our application to allow users to ADD, READ, UPDATE & DELETE different CBDC currency entries - allowing for full site capabilities.  

**CURRENT FOCUS**:

  - **F2:** Add to our RESTful API to allow for GET ALL requests to read ALL "currency" data from the database (COMPLETE)

  - **F3:** Optimise our server GET ALL requests through the use of sort keys, indexes and through-put analysis (COMPLETE)

  - **F4:** Completing the suite of CRUD operations with image handling via "Cloud Firestore Storage" (**REMAINING CONTENT - 2/3 WEEKS**)

&nbsp;

## 0. PROCESS FOR COMPLEX READ & WRITES ("COMPLEX CRUD")

**CORE GOAL:** Broadly speaking, we need to handle the following requests, to correctly populate our client-side application with data:

  - GET ALL currency
  - POST new currency item 
  - GET currency item by ID
  - UPDATE currency item by ID
  - DELETE currency item by ID

&nbsp;

**PROCESS:** We will approach these in a consistent process:

  - **(a) SERVER:** 
  
    - Build the new endpoint route

    - Build the controller function to run the request query against the database & issue the response

    - **WRITE REQUESTS:** Create any necessary middleware, utilities or policies to manage the process / upload files

    - Test the endpoint returns the correct response via Postman

  - **(b) CLIENT:**

    - Build the static page to issue the request to the API endpoint, including routing via `App.js` (*minimal CSS*)

    - Define component logic to handle events & mount actions in order to submit the request to the endpoint

    - **WRITE REQUESTS:** Structure the form data to allow for multipart data submissions

    - Adapt client-side `axios` services to factor in new endpoint requests

    - Adapt static client-side page to a dynamic page & test for success & error

&nbsp;

### DOCUMENTATION FOR CRUD OPERATIONS:

  - **GET:** https://firebase.google.com/docs/firestore/query-data/get-data

  - **POST / UPDATE:** https://firebase.google.com/docs/firestore/manage-data/add-data

  - **DELETE:** https://firebase.google.com/docs/firestore/manage-data/delete-data