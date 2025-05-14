import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // If no access token, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If the user is authenticated, render the children
};

export default ProtectedRoute;