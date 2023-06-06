import React from 'react';
import { Link } from 'react-router-dom';
import {Tooltip} from 'react-tooltip';
import "../Style/Style.css"
const Navbar = () => {
    const handleLogout = () => {
        
    }
    const user = true
    return (
        <div className='container'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Sporty Zone</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                              <Link class="nav-link active me-3" to='/'>Home</Link>
                            </li>
                            <li class="nav-item">
                              <Link class="nav-link active me-3" to='/'>Instructors</Link>
                            </li>
                            <li class="nav-item">
                              <Link class="nav-link active me-3" to='/'>Classes</Link>
                            </li>
                            <li class="nav-item">
                              <Link class="nav-link active me-3" to='/'>Dashboard</Link>
                            </li>
                            <div>
                                {
                                    user ? <button onClick={handleLogout}  className='random-btn btn me-3 btn-danger text-dark'>Log out</button>
                                    : <Link to='/login'><button style={{width:"80px"}} className='random-btn btn btn-danger me-3 text-dark'>Login</button></Link>

                                }
                                {
                                    user ? 
                                    <>
                                    <img 
                                    data-tooltip-id="tooltip" data-tooltip-content={user.displayName}
                                    style={{width:"40px", height:"40px", borderRadius:"50%", cursor:"pointer"}} 
                                    src={user.photoURL} alt="" /> 
                                    <Tooltip id="tooltip" place="right" effect="solid"   />
                                    </>
                                    : <></>
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;