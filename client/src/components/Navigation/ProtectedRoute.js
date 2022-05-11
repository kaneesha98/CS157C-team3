import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
const ProtectedRoute = ({Component}) => {
    //Check if the user is login in
    const userLogin = useSelector(state => state?.users?.userAuth)
    return userLogin ? <Component /> : <Navigate to="/login" />
};

export default ProtectedRoute;