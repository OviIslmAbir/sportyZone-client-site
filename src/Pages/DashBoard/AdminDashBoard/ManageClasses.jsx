import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Fade } from "react-awesome-reveal";
import useTitle from '../../../Hooks/useTitle';
import Swal from 'sweetalert2'
import '../../../Common/Style/Style.css'
import { Link } from 'react-router-dom';
const ManageClasses = () => {
    useTitle("Manage Classes")
    const [allClasses, setAllClasses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/instructorAllClasses')
        .then(res => 
            setAllClasses(res.data)
        )
    }, [])

    const handleApprove = classes => {
        let status = classes.status 
        const approvedStatus = (status = 'approved')
        const updateStatus = {
            status: approvedStatus
        }
        fetch(`http://localhost:5000/instructorAllClasses/${classes._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        .then(res => res.json())
          .then(data => {
             const approvedClass = {
                name: classes.name,
                image: classes.image,
                instructorName: classes.instructorName,
                availableSeats: classes.availableSeats,
                price: classes.price
             } 
             axios.post('http://localhost:5000/classes', approvedClass)
                .then(res => {
                    if(res.data.insertedId){
                        Swal.fire({
                            title: 'Class add successfully in classes page',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }    
                        });
                    }
                })

          })
    }
    const handleDeny = classes => {
        let status = classes.status 
        const approvedStatus = (status = 'denied')
        const updateStatus = {
            status: approvedStatus
        }
        fetch(`http://localhost:5000/instructorAllClasses/${classes._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
        .then(res => res.json())
        .then(data => {})
    }
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
                        <td style={{fontSize:"13px"}}>$ {classes.price}</td>
                        <td>
                         {
                           classes.status === 'approved' ? 
                           <button disabled onClick={() => handleApprove(classes)} className='btn btn-warning'>Approved</button> : 
                           <button disabled={ classes.status === 'denied'} onClick={() => handleApprove(classes)} className='btn btn-warning'>Approve</button>
                         }
                        </td>
                        <td>
                         {
                           classes.status === 'denied' ? 
                           <button disabled onClick={() => handleDeny(classes)} className='btn btn-danger'>Denied</button> : 
                           <button disabled={classes.status === 'approved'} onClick={() => handleDeny(classes)} className='btn btn-danger'>Deny</button>
                         }
                        </td>
                        <td>
                            <Link to={`/dashboard/feedback/${classes._id}`}><button className='btn random-btn text-white'>Feedback</button></Link>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default ManageClasses;