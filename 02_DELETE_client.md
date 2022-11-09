# [F4] COMPLEX CRUD OPERATIONS: COMPLEX READS & WRITES

**PROGRESS:** We currently have a full stack application, that allows for users to register, login and logout + has basic GET ALL working for our currency API.

**GOAL:** We need to add to our application to allow users to ADD, READ, UPDATE & DELETE different CBDC currency entries - allowing for full site capabilities.  

**CURRENT FOCUS**:

  - **F2:** Add to our RESTful API to allow for GET ALL requests to read ALL "currency" data from the database (COMPLETE)

  - **F3:** Optimise our server GET ALL requests through the use of sort keys, indexes and through-put analysis (COMPLETE)

  - **F4:** Completing the suite of CRUD operations with image handling via "Cloud Firestore Storage" (**REMAINING CONTENT - 2/3 WEEKS**)

&nbsp;

# D. DELETE REQUEST [BY ID]

## 2. CLIENT-SIDE DELETE FUNCTIONALITY

### A Create new `currencyService` for `del` function

**GOAL:** Create a new method to allow us to pass in our custom `axios` object & allow it to hit our API delete endpoint

**STEPS:**

  - Create a new `del` function in `currencyService.js` which takes an `id` as a parameter (NOTE: we set it to `del` as `delete` can be a reserved namespace)

  - Return the `api.delete` method, which takes the `/api/currency` and `id` as arguments

  - MAKE SURE: to set the `del` function as part of the exported `currencyService` object, so it can be called in `CurrencyDetail`

&nbsp;

### B Create new `handleDeleteClick` function in `CurrencyDetail.jsx`

**GOAL:** We have already created a button for the delete request to trigger, which takes an `onClick`.  

When the button is clicked, it should trigger a function that calls the endpoint to request the deletion of the document & pass it the `id` of the document.

**STEPS:**

  - (a) Declare new `handleDeleteClick` `async` arrow function, which takes the event (`e`) as a parameter & bind it to the `onClick` in our delete button

  - (b) Call `e.preventDefault(e)` to prevent a default action & `setLoading` to `true`, to ensure the button is clickable

  - (c) Set a `try-catch`, and within the `try`, call our newly created `currencyService.del` method & pass it the `id` (*which has been destructured already*)

  - (d) Store the API res in a `response` variable, `setLoading` to false & navigate the user back to the CurrencyMenu page (`/currency/prices`) with the `navigate` from react-router-dom (*make sure to store in that variable from the RRD hook - `useNavigate`*)

  - (e) **ON ERROR:** Make sure use the standard process of logging the error with optional chaining, `setError` to true & scroll window to top

  - (f) **TEST** the request and ensure it deletes entries correctly!