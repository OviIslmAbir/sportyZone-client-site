import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Fade } from "react-awesome-reveal";
import '../../../Common/Style/Style.css'
const ManageClasses = () => {
    const [allClasses, setAllClasses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/instructorAllClasses')
        .then(res => 
            setAllClasses(res.data)
        )
    }, [])
    return (
        <div>
        <Fade>
           <h2 className='text-center mb-3'>Manage Users</h2>
        </Fade>
         <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th style={{fontSize:"12px"}} scope="col">Class Image</th>
                    <th style={{fontSize:"12px"}} scope="col">Class Name</th>
                    <th style={{fontSize:"12px"}} scope="col">Name</th>
                    <th style={{fontSize:"12px"}} scope="col">Instructor Email</th>
                    <th style={{fontSize:"12px"}} scope="col">Seats</th>
                    <th style={{fontSize:"12px"}} scope="col">Price</th>
                    <th className='text-center' style={{fontSize:"12px"}} scope="col">Approve</th>
                    <th className='text-center' style={{fontSize:"12px"}} scope="col">Deny</th>
                    <th className='text-center' style={{fontSize:"12px"}} scope="col">Feedback</th>
                </tr>
            </thead>
            <tbody>
                {
                    allClasses.map((classes, index) => 
                    <tr key={classes._id}>
                        <th scope="row">{index + 1}</th>
                        <td><img style={{width:"40px", height:"40px", borderRadius:"10px"}} src={classes.image} alt="" /></td>
                        <td style={{fontSize:"13px"}}>{classes.name}</td>
                        <td style={{fontSize:"13px"}}>{classes.instructorName}</td>
                        <td style={{fontSize:"13px"}}>{classes.email}</td>
                        <td style={{fontSize:"13px"}}>{classes.availableSeats}</td>
                        <td style={{fontSize:"13px"}}>{classes.price}</td>
                        <td>
                           <button className='btn btn-warning'>Approve</button>
                        </td>
                        <td>
                           <button className='btn btn-danger'>Deny</button>
                        </td>
                        <td>
                           <button className='btn random-btn text-white'>Feedback</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default ManageClasses;