// Import react modules: useContext and useDebugValue
// useContext - manage state globally allows user to stayed logged in (authorization)
// useDebugValue - displays a label for custom hooks in React DevTools
import { useContext, useDebugValue } from "react";
// AuthContext - allows us to access the React Context API (state management tool for sharing data across React components)
import AuthContext from "../contexts/AuthContext";

// Create useAuth custom HOOK - to access AuthContext values through a Wrapper
const useAuth = () => {
  // DEBUG: Displays whether user is logged in properly or not (only when DevTools opened)
  const { user } = useContext(AuthContext);
  useDebugValue(user, user => user?.id ? "Logged In" : "Logged Out");

  return useContext(AuthContext);
}

// Export function
export default useAuth;