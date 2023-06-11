import React, { useContext } from 'react';
import {MdImportContacts} from 'react-icons/md';
import {FaImage, FaEnvelope } from 'react-icons/fa';
import { GiTeacher } from "react-icons/gi";
import { BiChair, BiMoneyWithdraw } from "react-icons/bi";
import { AuthContext } from '../../../Provider/AuthProvider';
import '../../../Common/Style/Style.css'
import useTitle from '../../../Hooks/useTitle';
import { Fade } from "react-awesome-reveal";
import axios from 'axios';
import Swal from 'sweetalert2'
const AddAClass = () => {
    const {user} = useContext(AuthContext)
    useTitle("Add a class")
    const handleClass = event => {
        event.preventDefault()
        const from = event.target
        const name = from.className.value
        const image = from.classImage.value
        const instructorName = user?.displayName
        const instructorEmail = user?.email
        const price = from.price.value
        const availableSeats = from.availableSeats.value
        const addClass = {
          name,
          image,
          instructorName,
          email: instructorEmail,
          price: parseFloat(price),
          availableSeats: parseInt(availableSeats),
          totalEnroll: 0,
          status: 'pending'
        }
        axios.post('http://localhost:5000/instructorClasses', addClass)
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    title: 'Class add Successfully.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }    
                });
            }
        })
        
    }
    return (
        <div>
            <Fade>
               <h2 className='text-center mb-3'>Add a class</h2>
            </Fade>
            <form onSubmit={handleClass}  className='row'>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3" id="basic-addon1"><MdImportContacts/></span>
                        <input type="text" name='className' className="form-control p-3" placeholder="Class Name"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <p></p>
                        <span className="input-group-text p-3" id="basic-addon1"><FaImage/></span>
                        <input type="url" name='classImage' className="form-control p-3" placeholder="Class Image" />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3" id="basic-addon1"><GiTeacher/></span>
                        <input type="text" className="form-control p-3" defaultValue={user?.displayName} placeholder="Instructor Name" />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3" id="basic-addon1"><FaEnvelope/></span>
                        <input type="email" className="form-control p-3" defaultValue={user?.email} placeholder="Instructor Email"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3" id="basic-addon1"><BiChair/></span>
                        <input type="number" name='availableSeats' className="form-control p-3" placeholder="Available seats"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <span className="input-group-text p-3" id="basic-addon1"><BiMoneyWithdraw/></span>
                        <input name='price' type="number" className="form-control p-3" placeholder="Price"/>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <input type="submit" value="Add A Class" className='btn random-btn w-100 text-white p-3'/>
                </div>
            </form>
        </div>
    );
};

export default AddAClass;