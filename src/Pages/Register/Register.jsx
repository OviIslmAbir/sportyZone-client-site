import React from 'react';
import useTitle from '../../Hooks/useTitle';
import Lottie from "lottie-react";
import phone from "../../assets/phone.json";
import { FaEnvelope, FaKey, FaUser, FaImage } from 'react-icons/fa';
import '../../Common/Style/Style.css'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Register = () => {
    useTitle("Register")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
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
                                <input type="password" className="form-control" placeholder="Password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/
                                })} />
                                <label>Password</label>
                            </div>
                        </div>
                        <div className='text-center'>
                            {errors.password?.type === 'required' && <p className="text-danger">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-danger">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-danger">Password must be less than 25 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-danger">Password must have one Uppercase , one number and one special character.</p>}
                        </div>
                        <div>
                            <input type="submit" value="Register" className='random-btn btn w-100 p-3 text-white' />
                        </div>
                        <p className='mt-4 text-center'>Already have an account? <Link style={{textDecoration: "none"}} to='/login' className='text-danger '>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;