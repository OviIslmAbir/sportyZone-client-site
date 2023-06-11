import React, { useContext } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import './DashBoard.css'
import {FaUsers, FaWallet} from 'react-icons/fa';
import {MdImportContacts} from 'react-icons/md';
import {BiBookmarkHeart, BiBookAdd} from 'react-icons/bi';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';



const DashBoard = () => {
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    return (
        <div>
            <Navbar></Navbar>
           <div className='d-flex container mt-4'>
                <div className='bg h-full'>
                        {
                            isAdmin ? <>
                                <li>
                                    <Link to='/dashboard/allUsers' className='nav-link link'><FaUsers style={{fontSize:"20px"}}/> Manage Users</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/manageClasses' className='nav-link link'><MdImportContacts style={{fontSize:"20px"}}/> Manage Classes</Link>
                                </li>
                            </> :
                            <>
                                { isInstructor  ? <>
                                    <li>
                                        <Link to='/dashboard/addAClass' className='nav-link link'><BiBookAdd style={{fontSize:"20px"}}/> Add A Class</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/myClasses' className='nav-link link'><MdImportContacts style={{fontSize:"20px"}}/> My Classes</Link>
                                    </li>
                                </>:
                                <>
                                <li>
                                    <Link to='/dashboard/selectedClass' className='nav-link link'><MdImportContacts style={{fontSize:"20px"}}/>  My Selected Classes</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/enrollClass' className='nav-link link'><BiBookmarkHeart style={{fontSize:"20px"}}/> My Enrolled Classes</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/paymentHistory' className='nav-link link'><FaWallet style={{fontSize:"20px"}}/> Payment history</Link>
                                </li>
                               </>}
                            </>
                            
                        }
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