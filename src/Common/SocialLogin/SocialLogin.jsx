import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import '../Style/Style.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const SocialLogin = () => {
    const {googleLogin} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        googleLogin()
          .then(result => {
             const loggedUser = result.user
             console.log(loggedUser)
             const saveUser = {name: loggedUser.displayName, email: loggedUser.email}
             fetch('https://assignment-12-server-site-ecru.vercel.app/users', {
                 method: "POST",
                 headers: {
                     'content-type' : 'application/json'
                 },
                 body : JSON.stringify(saveUser)
                })
                 .then(res => res.json())
                 .then(data => {
                         if(data.insertedId){
                             Swal.fire({
                                 icon: 'success',
                                 title: 'User created successfully.',
                                 showConfirmButton: false,
                                 timer: 1500
                            });

                            navigate('/');
                         }
                     })
          })
          .catch(error => {
            console.log(error.message)
          })
    }
    return (
        <div className='text-center mt-3'>
            <button onClick={handleGoogleLogin} style={{borderRadius:"50%", width:"50px", height:"50px"}} className='btn random-btn text-white'><FaGoogle style={{fontSize:"25px"}}></FaGoogle></button>
        </div>
    );
};

export default SocialLogin;