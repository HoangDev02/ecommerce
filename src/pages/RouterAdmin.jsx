import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RouterAdmin({ children }) {
    const auth = useSelector((state) => state.auth.login?.currentUser);
    return auth.isAdmin ? children : <Navigate to="/" />;
}

export default RouterAdmin