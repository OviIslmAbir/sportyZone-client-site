import React from 'react';
import { Link } from 'react-router-dom';
import {Tooltip} from 'react-tooltip';
import "../Style/Style.css"
const Navbar = () => {
    const handleLogout = () => {
        
    }
    const user = false
    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Sporty Zone</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                              <Link className="nav-link active me-3" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link active me-3" to='/'>Instructors</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link active me-3" to='/'>Classes</Link>
                            </li>
                            {user ? 
                                <li className="nav-item">
                                <Link className="nav-link active me-3" to='/'>Dashboard</Link>
                                </li>: <></>
                            }
                        </ul>
                        <div>
                                {
                                    user ? <button onClick={handleLogout}  className='random-btn btn me-3 btn-danger '>Log Out</button>
                                    : <Link to='/login'><button style={{width:"80px"}} className='random-btn btn btn-danger me-3 '>Login</button></Link>

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
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;