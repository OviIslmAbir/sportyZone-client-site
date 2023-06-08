import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from "sweetalert2";
import useSelectedClasses from '../../../Hooks/useSelectedClasses';
const SingleClass = (props) => {
    const {user} = useContext(AuthContext)
    const {image, name, instructorName, availableSeats, price} = props.singleClass
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [, refetch] = useSelectedClasses()
    const handleAddClass = () => {
        if(user && user.email){  
            const selectedClasses = { name, image, price, email: user.email}
            fetch('http://localhost:5000/selectedClasses', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedClasses)
            })
            .then(res => res.json())
            .then(data => {
                    if(data.insertedId){
                        refetch(); 
                        Swal.fire({
                            icon: 'success',
                            title: 'Class added on the my selected classes page.',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          setButtonDisabled(true);
                    }
            })
        }
    }
    
    return (
                <div className="col">
                        <div style={{border:"none"}} className="card h-100 shadow-lg">
                        <img src={image} style={{height:"200px"}} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title mb-3">{name}</h5>
                            <div>
                                <h6 className="card-title mb-3">Instructor Name: {instructorName}</h6>
                                <p className="card-text mb-2">Available Seats: {availableSeats}</p>
                                <p className="card-text">Price: ${price}</p>
                            </div>
                            <div className='text-end'>
                                <button onClick={handleAddClass} disabled={(user ? false : true) || (buttonDisabled)} className='random-btn btn text-white'>Add Class</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default SingleClass;