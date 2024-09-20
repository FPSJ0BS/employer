// src/components/PrivateRoute.js

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { login } = useSelector(state => state.login);
  return login ? children : <Navigate to="/login-email" replace />;
};

export default PrivateRoute;
