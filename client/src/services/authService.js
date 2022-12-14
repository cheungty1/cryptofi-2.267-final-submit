// Import custom module
import api from "../services/api";

// Register POST Request
function register(data) {
  const formData = prepareFormData(data);
  return api.post(
    "/api/auth/register",
    formData, 
    formConfig
  );
};

// GET BY ID - CurrencyDetail
function getById(id) {
  return api.get('/api/auth/' + id);
};

// PUT - EditCurrency
function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile);
  return api.put(
    '/api/auth/' + id, 
    formData, 
    formConfig
  );
};

// Login POST Request
async function login(data) {
  const response = await api.post(
    "/api/auth/login",
    data
  );
  console.log(response?.data);
  return response
}

// REFACTORED VARIABLES/FUNCTIONS: Repeated code better abstracted to keep source code DRY (called above)
// [1] Form Config: sets the content header to form data
const formConfig = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

// [2] Form Data: format of mixed data when uploading files
function prepareFormData(data, uploadedfile){
  // New instance of class
  let formData = new FormData();

  // Append reconfigured mixed data to new object
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('image', data.image);
  if (uploadedfile) {
    formData.append('uploadedFile', uploadedfile);
  }

  // Return restructured form data (for our API)
  return formData;
};

// [3] Create file name from URL in DB
function getFileFromUrl(downloadURL) {
  // Slice off the base URL from downloadURL
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);
  let fileGlob = downloadURL.replace(baseURL, "");
  
  // Remove everything after the query string
  const indexOfEndPath = fileGlob.indexOf("?");
  fileGlob = fileGlob.substring(0, indexOfEndPath);
  
  // Return existing uploaded file glob
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
};

const authService = {
  register,
  login,
  getById,
  put,
  getFileFromUrl
}

export default authService;