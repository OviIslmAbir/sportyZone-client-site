import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import './DashBoard.css'

const DashBoard = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className='d-flex container mt-4'>
                <div className='bg h-full'>
                        <li>
                            <Link to='/dashboard/selectedClass' className='nav-link link'>My Selected Classes</Link>
                        </li>
                        <li>
                            <Link to='' className='nav-link link'>My Enrolled Classes</Link>
                        </li>
                        <li>
                            <Link to='' className='nav-link link'>Payment</Link>
                        </li>
                        <li>
                            <Link to='' className='nav-link link'>Payment history</Link>
                        </li>
                </div>
                <div style={{flex: 1, padding:"20px"}}>
                   <Outlet></Outlet>
                </div>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoard;