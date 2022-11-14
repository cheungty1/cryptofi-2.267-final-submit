// Import react modules:
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CFCard from '../../components/common/CFCard';
import CFButton from '../../components/common/CFButton';
import authService from '../../services/authService';
import styled from 'styled-components';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

// Custom Styles
const Styles = styled.div`
.form-control {
  border-radius: 100rem;
}
`;

// Custom Styles
const PreviewImage = styled.img`
  height: 250px;
  width: 250px;
  padding: 0.5rem;
  border: 3px solid var(--brand);
  border-radius: 50%;
  opacity: 0.8;
`;

// Edit Profile component
const EditProfile = () => {

// HOOK: CONTEXT FOR AUTH
const { user} = useAuth();

// REACT-ROUTER DOM HOOK
const navigate = useNavigate();
  
// HOOK: SETTING COMPONENT STATE (& init values)
const [userProfile, setUserProfile] = useState({
  id: user.id,
  username: "",
  email: '',
  //password: "",
  isAdmin: "",
  image: ""
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

// Uploaded File from Existing downloadURL
const [uploadedFile, setUploadedFile] = useState("");
const [preview, setPreview] = useState(true);

// Destructure data state nested object properties
  const { id, username, email, /*password, isAdmin,*/ image } = userProfile;

// UseRef for password confirmation (not used)
//const passwordConfirmRef = useRef();

 // HOOK: Re-mount Request Prevention (React18)
 const effectRan = useRef(false);

 // HOOK: ON-LOAD SIDE EFFECTS
 useEffect(() => {
   console.log("Effect Ran");
   if (effectRan.current === false) {
     fetchUserProfile();
     setLoading(false);

     // CLEAN UP FUNCTION
     return () => {
       console.log("Unmounted");
       effectRan.current = true;
     }
   }
   // Disable Linter Error:
   // eslint-disable-next-line react-hooks/exhaustive-deps 
 }, [id]); 

// FORM FUNCTIONS
  // [0] FORM PRE-POPULATION CALL
  async function fetchUserProfile() {
    try {
      // (i) API FETCH CALL
      const response = await authService.getById(id);
      const fetchedUserProfile = await response.data;
      console.log(fetchedUserProfile);

      // (ii) UPDATING STATE DATA OBJECT
      setUserProfile(userProfile => ({...userProfile,...fetchedUserProfile}));

      // Save uploaded file glob to state
      if (!fetchedUserProfile.image) {      
        console.log('No downloadURL provided by DB'); 
      } else {
        const fileGlob = authService.getFileFromUrl(fetchedUserProfile.image);
        setUploadedFile(fileGlob);
      }

    // (iii) CLEANUP FUNCTIONS
    } catch(err) {
      console.log(err?.response);
      setError(true);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

  // [1] CHANGE STATE FOR TEXT FORM DATA
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,             
      [name]: value        
    });
  }

   // [2] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserProfile({
      ...userProfile, 
      image: file
    });
    setPreview(false);
  }

 // [2] handleSubmit will submit form data to API
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Password Validation:
    /*// Early Validation - Error Check First
    if(password !== passwordConfirmRef.current.value){
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
*/
  // API Call to Write User Data
  try {
    const response = await authService.put(user.id, userProfile, uploadedFile);
    console.log(response);
    navigate('/dashboard');
  } catch(err) {
    console.log(err?.response);
    setError(true); 
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }
  setLoading(false);
}

 // CONDITIONAL LOAD: USER ERROR [POSSIBLY REPLACE WITH LOADING STATE]
 if (!user) {
  return (
    <CFCard title="Profile" authform>
      <div className="text-center mb-4">
        Cannot Retrieve User
      </div>
    </CFCard>
  )
}
// CONDITIONAL LOAD: ERROR
if (error) {
  return (
    <Container className="text-center">
      <ErrorPage />
    </Container>
  )
}

// CONDITIONAL LOAD: LOADING
if (loading) {
  return (
    <Container>
      <Loader />
    </Container>
  )
}

  return (
    <Styles>
    <CFCard title="Edit User Profile">
      {/* FORM SECTION */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new Username" 
            name="username"
            value={username}
            onChange={ handleTextChange }
          />
        </Form.Group>

      {/* FORM SECTION */}
      <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new Email" 
            name="email"
            value={email}
            onChange={ handleTextChange }
          />
        </Form.Group>

      {/* Password Section - Omitted because of the need for 2 factor authentication}
      {/* FORM SECTION 
      <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new Password" 
            name="password"
            value={user.password}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 4: PASSWORD CONFIRM 
        <Form.Group className="mb-3" controlId="password-confirm">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required />
        </Form.Group>

        {/* FORM SECTION: CONDITIONAL PREVIEW OF IMAGE (File in DB) */}
        { preview && !loading && 
          <div className="text-center mt-2 mb-5">
            <h6>Current Image</h6>
            <PreviewImage src={image} alt="preview"/>
          </div>
        }

        {/* FORM SECTION: IMAGE */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Edit Avatar Image</Form.Label>
          <Form.Control 
            type="file"
            className="mb-4"
            onChange={ handleFileChange }
          />
        </Form.Group>

      {/* SUBMIT BUTTON */}
      <Form onSubmit={ handleSubmit }>   
        <CFButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CFButton>
        </Form>
    </CFCard>
    </Styles>
  )
}

// Export function
export default EditProfile