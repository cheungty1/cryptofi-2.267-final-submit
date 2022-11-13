// Import react modules: useState and useEffect
import React, { useState, useEffect } from 'react';

// Import custom modules
// Import useNavigate from React router dom
import { useNavigate } from "react-router-dom";
// Import JWT Decode - library that decodes JWTs token (Base64Url encoded)
import jwtDecode from 'jwt-decode';

// Create AuthContext Wrapper
const AuthContext = React.createContext()

// Create basic AuthProvider - defines wrapper and allow access to context values
export function AuthProvider({ children }) {

  // State - User State, Mount Request & Variables
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  // UseEffect hook - runs wrapped functions during the component's lifecycle
  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  // Register & Login Function - Sets Item to local storage
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  // Get Current User Function - Gets Item from local storage
  function getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (error) {
      return null;
    }
  }
  
  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  // Define value attribute with props above
  const value = {
    user,
    getCurrentUser,
    loginSaveUser,
    logout
  }

  // AuthContext.Provider takes "value" attribute 
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

// Export function
export default AuthContext;