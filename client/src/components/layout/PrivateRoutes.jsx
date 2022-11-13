// Import react modules
import React from 'react';

// Import Custom Modules:
// Import elements from react router dom
// Import Outlet element- used as a placeholder and used in parent route elements to render their child route elements
// Import Navigate element- useNavigate changes the current location when it is rendered
// Import useLocation element - useLocation hook returns the location object that represents the current URL
import { Outlet, Navigate, useLocation } from 'react-router-dom'; 

// Import custom modules
import useAuth from '../../hooks/useAuth';

// Private Routes component - wrap around AUTH pages for pages to only be displayed when logged in 
const PrivateRoutes = () => {
  const { getCurrentUser } = useAuth();
  const location = useLocation();

  return (
    !getCurrentUser()
      ? <Navigate to="/login" state={{ from: location }} replace />
      : <Outlet /> 
  )
}

// Export function
export default PrivateRoutes