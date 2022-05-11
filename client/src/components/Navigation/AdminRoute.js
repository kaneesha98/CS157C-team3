import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const AdminRoute = ({Component}) => {
    //Check if the user is login in
    const userLogin = useSelector(state => state?.users?.userAuth)
    return userLogin?.isAdmin ? <Component /> : <Navigate to="/not-found" />;
};

export default AdminRoute;