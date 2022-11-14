// Import react modules:
// Import useState - Hook that allows state variables in functional components
// Import UseEffect - hook that runs wrapped functions during the component's lifecycle 
// Import useRef - allows persistent of values between renders
import React, { useState, useEffect, useRef } from 'react';
import { Fragment } from "react"
import { Container } from 'react-bootstrap';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CFCard from '../../components/common/CFCard';
import CFButton from '../../components/common/CFButton';
import authService from '../../services/authService';
import styled from 'styled-components';
import CFNavLink from '../../components/common/CFNavLink';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

// Custom Styles
const PreviewImage = styled.img`

  margin-bottom: 1rem;
  height: 320px;
  width: 320px;
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

// Destructure data state nested object properties
const { id, username, email, /*password,*/ isAdmin, image } = userProfile;

// HOOK: Re-mount Request Prevention (React18)
const effectRan = useRef(false);

 // HOOK: ON-LOAD SIDE EFFECTS
 useEffect(() => {
  console.log("Effect Ran");
  if (effectRan.current === false) {
    fetchUserProfile();
    //setLoading(false);

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

    // (iii) CLEANUP FUNCTIONS
  } catch(err) {
    console.log(err?.response);
    setError(true);
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }
  setLoading(false);
  };

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
    <CFCard authform >
      {!loading && 
      <div className="text-center mb-4 ">
      <PreviewImage src={image} alt="avatar-preview" />
        <CardTitle>Profile</CardTitle>
        <h5>Welcome {username}!</h5>
      <p><strong>Email: </strong>{email}</p>
      { isAdmin && <p><strong>Secret: </strong> Hello Admin - nice to see you here</p>}
      </div>
      }

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

// Export function
export default Dashboard