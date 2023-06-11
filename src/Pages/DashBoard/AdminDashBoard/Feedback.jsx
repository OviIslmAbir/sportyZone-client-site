import React from 'react';
import '../../../Common/Style/Style.css'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";

const Feedback = () => {
    const id = useParams()
    const navigate = useNavigate()
    console.log(id.id)
    const handleFeedback = (event) => {
        event.preventDefault()
        const form = event.target
        const feedback = form.feedback.value
        const setFeedback = {
           feedback
        }
        fetch(`http://localhost:5000/instructorAllClasses/${id.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(setFeedback)
        })
        .then(res => res.json())
        .then(data => { 
            if(data.modifiedCount > 0){
                form.reset()
                Swal.fire({
                    title: 'Feedback send successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }    
                });
                navigate('/dashboard/manageClasses')
            }
        })
    }
    return (
        <div>
            <Fade><h3 className='text-center mb-4'>Send Feedback</h3></Fade>
            <form onSubmit={handleFeedback} className='w-50 mx-auto shadow-lg p-5'>
                <label><h4>Write Feedback :</h4></label>
                <input type="text" className='form-control p-2' name='feedback' placeholder='write feedback'/>
                <input className='btn random-btn w-100 text-white p-2 mt-3' type="submit" value="Send" />
            </form>
        </div>
    );
};

export default Feedback;