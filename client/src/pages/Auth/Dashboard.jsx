import React, { useState, useEffect, useRef } from 'react';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CFCard from '../../components/common/CFCard';
import CFButton from '../../components/common/CFButton';
import authService from '../../services/authService';
import { Container } from 'react-bootstrap';
import Loader from '../../components/common/Loader';
import ErrorPage from '../../components/common/ErrorPage';
import styled from 'styled-components';
import CFNavLink from '../../components/common/CFNavLink';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Fragment } from "react"

// Custom Styles
const PreviewImage = styled.img`
  margin-bottom: 1rem;
  width: 27vw;
  height: 40vh;
  padding: 0.5rem;
  border: 3px solid var(--brand);
  border-radius: 50%;
  opacity: 0.8;
`;
const CardTitle = styled.div`
    font-size: 2em;
    font-weight: 600;
    color: var(--brand);
`;

const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

const Dashboard = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user, logout } = useAuth();

    // REACT-ROUTER DOM HOOKS
    const params = useParams();
    const navigate = useNavigate();
  
// HOOK: SETTING COMPONENT STATE (& init values)
const [userProfile, setUserProfile] = useState({
  id: user.id,
  username: "",
  email: '',
  password: "",
  isAdmin: "",
  image: ""
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

//Uploaded File from Existing downloadURL
const [uploadedFile, setUploadedFile] = useState("");
const [preview, setPreview] = useState(true);

// Destructure data state nested object properties
const { id, username, email, password, isAdmin, image } = userProfile;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]); 

// FORM FUNCTIONS
  // [0] FORM PRE-POPULATION CALL
  async function fetchUserProfile() {
    try {
      // (i) API FETCH CALL
      const response = await authService.getById(user.id);
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
  }
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

  return (
    <CFCard authform >
      <div className="text-center mb-4">
      <PreviewImage src={image} alt="avatar-preview" />
        <CardTitle>Profile</CardTitle>
        <h5>Welcome {username}!</h5>
      <p><strong>Email: </strong>{email}</p>
      { isAdmin && <p><strong>Secret: </strong> Hello Admin - nice to see you here</p>}
      </div>

      {user && <div className="text-center mt-4"><CFNavLink to="/edit-profile">Edit User Profile</CFNavLink></div>}

      <div>{space}</div> 

      {/* Log Out & Forces a Redirect */}
      { user &&
          <CFButton onClick={() => { logout() }}>
            Log Out
          </CFButton>
      }
    </CFCard>
  )
}

export default Dashboard