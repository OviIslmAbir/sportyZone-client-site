import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../Common/Style/Style.css'
import { Fade } from "react-awesome-reveal";
import { AuthContext } from '../../../Provider/AuthProvider';
const MyClasses = () => {
    const[instructorClasses, setInstructorClasses] = useState([])
    const {user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/instructorClasses?email=${user?.email}`)
        .then(res => setInstructorClasses(res.data))
    })
    return (
            <div>
                <Fade>
                  <h2 className='text-center mb-3'>My Classes</h2>
                </Fade>
                <div className= "row row-cols-1 row-cols-md-2 g-4">
                    {instructorClasses.map( instructorClass =>
                    <div className='col' key={instructorClass._id}>
                        <div style={{border:"none"}} className="card h-100 shadow-lg">
                            <img src={instructorClass.image} style={{height:"200px"}} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title mb-3">{name}</h5>
                                <div>
                                    <h5 className="card-title mb-3">Instructor Name: {instructorClass.instructorName}</h5>
                                    <p className="card-text mb-2">Available Seats: {instructorClass.availableSeats}</p>
                                    <p className="card-text">Price: ${instructorClass.price}</p>
                                    <p className="card-text">Total Enroll Student: {instructorClass.totalEnroll}</p>
                                    <p className="card-text">Status: {instructorClass.status}</p>
                                </div>
                                <div className='text-end'>
                                <button type="button" className="btn random-btn text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Feedback
                                </button>

                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
               </div>
            </div>
    );
};

export default MyClasses;