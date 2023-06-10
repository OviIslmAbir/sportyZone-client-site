import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useTitle from '../../../Hooks/useTitle';
import { Fade } from "react-awesome-reveal";
const MyEnrolledClass = () => {
    useTitle("My enrolled class")
    const [enrolledClasses, setEnrolledClasses] = useState([])
    const{user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/enrolled?email=${user?.email}`)
        .then(res => setEnrolledClasses(res.data))
    }, [])
    return (
        <div className='container'>
            <Fade><h2 className='text-center mb-3'>My Enrolled Classes</h2></Fade>
            <div className='row'>
                {
                    enrolledClasses.map(enrolledClass =>  <div className="col-lg-12" key={enrolledClass._id}>
                    <div className="card mb-3" style={{height:"280px"}}>
                        <img src={enrolledClass.image} style={{height:"100%", width:"100%"}} className="img-fluid rounded" alt="..."/>
                        <div className="card-img-overlay">
                            <div className="card-body body">
                                <h2 className="card-title">{enrolledClass.className}</h2>
                            </div>
                        </div>
                    </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default MyEnrolledClass;