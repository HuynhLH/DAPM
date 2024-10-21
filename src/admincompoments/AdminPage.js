import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

const AdminPage = () => {
  const { user } = useContext(AuthContext); 
  const isAdmin = user && user.role === 'admin'; 

  if (!isAdmin) {
    return <Redirect to="/" />; 
  }

  return <div>Admin Page</div>;
};

export default AdminPage;
