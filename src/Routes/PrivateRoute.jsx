import React from 'react';
import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return(
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )
    }
    if(user){
        return children
    }
    return <Navigate state={{from: location}} to='/login' replace></Navigate>
};

export default PrivateRoute;