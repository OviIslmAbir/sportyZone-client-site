import React from 'react';
import useTitle from '../../Hooks/useTitle';
import { FaHome} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import  Lottie  from "lottie-react";
import error from '../../assets/error.json'
import '../../Common/Style/Style.css'
const ErrorPage = () => {
    useTitle("404")
    return (
        <div className='container'>
            <div style={{height:"600px"}} className="row align-items-center">
                <div className="col-lg-7">
                    <Lottie animationData={error} loop={true} />
                </div>  
                <div className="col-lg-5 text-center">
                    <h1 className='mb-2'>404 Error</h1>
                    <h2 className='my-2 text-danger'>Ouch! Page not found</h2>
                    <Link to='/'><button className='btn random-btn mt-3 p-3 text-white'><FaHome/> <span>Back to Homepage</span></button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;