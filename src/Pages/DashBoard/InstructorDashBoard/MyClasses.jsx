import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../../Common/Style/Style.css'
import { Fade } from "react-awesome-reveal";
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
const MyClasses = () => {
    useTitle("My Classes")
    const[instructorClasses, setInstructorClasses] = useState([])
    const {user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`https://assignment-12-server-site-ecru.vercel.app/instructorClasses?email=${user?.email}`)
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
                                    {
                                        instructorClass?.feedback?.feedback ?
                                        <p>Feedback: {instructorClass?.feedback?.feedback}</p> : <></>
                                    }
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