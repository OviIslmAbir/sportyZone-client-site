import React from 'react';
import useTitle from '../../Hooks/useTitle';
import Lottie from "lottie-react";
import phone from "../../assets/phone.json";
import { FaEnvelope, FaKey } from 'react-icons/fa';
import '../../Common/Style/Style.css'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Login = () => {
    useTitle("Login")
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
                                <input type="password" {...register("password", { required: true })} className="form-control"  placeholder="Password"/>
                                <label>Password</label>
                            </div>
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