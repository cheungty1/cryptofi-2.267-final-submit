// Import React modules
import React from 'react';

// Import custom modules
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Global Stylesheet Imports (Bootstrap FIRST)
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Import root component
import App from './App';

// Wrap Authprovider around App Component to allow authentication in all the components and pages - lets user stayed logged in
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);