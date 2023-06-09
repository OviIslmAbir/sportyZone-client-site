import React, { useContext, useState } from 'react';
import useTitle from '../../Hooks/useTitle';
import Lottie from "lottie-react";
import phone from "../../assets/phone.json";
import { FaEnvelope, FaKey, FaUser, FaImage } from 'react-icons/fa';
import {BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import '../../Common/Style/Style.css'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../Common/SocialLogin/SocialLogin';
import Swal from 'sweetalert2'
const Register = () => {
    useTitle("Register")
    const {createUser, user, updateUserProfile} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            setError('Password and Confirm password do not match.');
            return;
        }
        createUser(data.email, data.password)
        .then(result => {
            const newUser = result.user;
            console.log(newUser);

            updateUserProfile(data.name, data.photo)
               .then(() => {
                    const saveUser = {name: data.name, email: data.email}
                    fetch('http://localhost:5000/users', {
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

                    .catch(error => console.log(error))
               })
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
                    <h2 className='my-3 text-center'>Please Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><FaUser/></span>
                            <div className="form-floating">
                                <input type="text"  {...register("name", { required: true })} className="form-control" placeholder="Name"/>
                                <label>Name</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><FaEnvelope/></span>
                            <div className="form-floating">
                                <input type="email"  {...register("email", { required: true })} className="form-control" placeholder="Email"/>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><FaImage/></span>
                            <div className="form-floating">
                                <input type="url"  {...register("photo", { required: true })} className="form-control" placeholder="Photo"/>
                                <label>Photo URL</label>
                            </div>
                        </div>
                        <div className="input-group my-3">
                            <span className="input-group-text"><FaKey/></span>
                            <div className="form-floating">
                                <input type={showPassword ? 'text' : 'password'} style={{borderRight:"none"}} className="form-control" placeholder="Password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/
                                })} />
                                <label>Password</label>
                            </div>
                            <span className="input-group-text" style={{borderLeft:"none"}} onClick={togglePasswordVisibility}>
                                    {showPassword ? <BsFillEyeFill style={{fontSize:"22px"}}/> : <BsFillEyeSlashFill style={{fontSize:"22px"}}/>}
                            </span>
                        </div>
                        <div className='text-center'>
                            {errors.password?.type === 'required' && <p className="text-danger">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-danger">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-danger">Password must be less than 25 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-danger">Password must have one Uppercase , one number and one special character.</p>}
                        </div>
                        <div className="input-group my-3">
                            <span className="input-group-text"><FaKey/></span>
                            <div className="form-floating">
                                <input type="password" className="form-control" placeholder="Confirm Password"  {...register("confirmPassword", {required: true})} />
                                <label>Confirm Password</label>
                            </div>
                        </div>
                        {<p className="text-danger text-center">{error}</p>}
                        <div>
                            <input type="submit" value="Register" className='random-btn btn w-100 p-3 text-white' />
                        </div>
                        <p className='mt-4 text-center'>Already have an account? <Link style={{textDecoration: "none"}} to='/login' className='text-danger '>Login</Link></p>
                    </form>
                    <hr />
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;