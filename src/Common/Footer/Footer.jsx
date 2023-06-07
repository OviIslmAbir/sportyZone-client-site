import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'
const Footer = () => {
    return (
        <footer className="cool-footer mt-5 p-5 pb-3">
            <div className="container text-white">
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-lg-4 mb-lg-0 mb-4">
                        <Link className='nav-link common' to='/'><h2>Sporty Zone</h2></Link>
                        <p>Welcome to Sporty Zone</p>
                    </div>
                    <div className="col-lg-4 mb-lg-0 mb-5">
                        <h3>About Us</h3>
                        <li style={{listStyle:"none"}} className='mt-3'><a className='nav-link common' href="">Help center</a></li>
                        <li style={{listStyle:"none"}} className='mt-3'><a className='nav-link common' href="">Store location</a></li>
                        <li style={{listStyle:"none"}} className='mt-3'><a className='nav-link common' href="">Privacy & Policy</a></li>
                    </div>
                    <div className="col-lg-4 mb-lg-0 mb-4">
                        <h3>Contact Us</h3>
                        <p>Mirpur-10, Dhaka, Bangladesh</p>
                        <p>Email: abirovi481@gmail.com</p>
                        <p>Phone: +88017XXXXXXXX</p>
                    </div>
                </div>
            </div>
             <p className='text-center mt-5 text-white'>&copy; copyright Sporty Zone, 2023</p>
      </footer>
    );
};

export default Footer;