import React, { useContext, useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import Lottie from "lottie-react";
import phone from "../../assets/phone.json";
import { FaEnvelope, FaKey } from 'react-icons/fa';
import '../../Common/Style/Style.css'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'
const Login = () => {
    useTitle("Login")
    const {login, user} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        login(data.email, data.password)
          .then(result => {
              const loggedUser = result.user
              console.log(loggedUser)
              Swal.fire({
                title: 'User Login Successfully.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }    
            });
            navigate(from)
          })
          .catch(error => {
            console.log(error.message)
          })
    };
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='container my-5'>
            <div className="row align-items-center">
                <div className="col-lg-6">
                  <Lottie animationData={phone} loop={true} />
                </div>
                <div className="col-lg-6 shadow-lg p-5">
                    <h2 className='my-3 text-center'>Please Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><FaEnvelope/></span>
                            <div className="form-floating">
                                <input type="email"  {...register("email", { required: true })} className="form-control"  placeholder="Email"/>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="input-group my-3">
                            <span className="input-group-text"><FaKey/></span>
                            <div className="form-floating">
                                <input type={showPassword ? 'text' : 'password'} style={{borderRight:"none"}}  {...register("password", { required: true })} className="form-control"  placeholder="Password"/>
                                <label>Password</label>
                            </div>
                            <span className="input-group-text" style={{borderLeft:"none"}} onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsFillEyeFill style={{fontSize:"22px"}}/> : <BsFillEyeSlashFill style={{fontSize:"22px"}}/>}
                            </span>
                        </div>
                        <div>
                            <input type="submit" value="Login" className='random-btn btn w-100 p-3 text-white' />
                        </div>
                        <p className='mt-4 text-center'>Don't Have An Account ? <Link style={{textDecoration: "none"}} to='/register' className='text-danger '>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;