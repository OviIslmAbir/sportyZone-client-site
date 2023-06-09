import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const DashHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
            <h1>{user?.displayName}</h1>
            <h2>{user?.email}</h2>
        </div>
    );
};

export default DashHome;