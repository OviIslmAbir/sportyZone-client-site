import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from "sweetalert2";
import useSelectedClasses from '../../../Hooks/useSelectedClasses';
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
const SingleClass = (props) => {
    const {user} = useContext(AuthContext)
    const {image, name, instructorName, availableSeats, price} = props.singleClass
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [, refetch] = useSelectedClasses()
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const handleAddClass = () => {
        if(user && user.email){  
            const selectedClasses = { name, image, price, email: user?.email, userName: user?.displayName}
            fetch('https://assignment-12-server-site-ecru.vercel.app/selectedClasses', {
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
                          localStorage.setItem(`buttonDisabled_${name}_${user?.email}`, 'true');
                    }
            })
        }
    }
    useEffect(() => {
        const isButtonDisabled = localStorage.getItem(`buttonDisabled_${name}_${user?.email}`);
        if (isButtonDisabled === 'true') {
          setButtonDisabled(true);
        }
      }, [name, user]);
    
    return (
                <div className="col">
                        {
                            availableSeats === 0 ?<>
                            <div style={{border:"none"}} className="card h-100 shadow-lg">
                                <img src={image} style={{height:"200px"}} className="card-img-top" alt="..."/>
                                <div className="card-body bg-danger text-white">
                                    <h5 className="card-title mb-3">{name}</h5>
                                    <div>
                                        <h6 className="card-title mb-3">Instructor Name: {instructorName}</h6>
                                        <p className="card-text mb-2">Available Seats: {availableSeats}</p>
                                        <p className="card-text">Price: ${price}</p>
                                    </div>
                                    <div className='text-end'>
                                        <button onClick={handleAddClass} disabled={(user ? false : true) || (buttonDisabled) || (isAdmin) || (isInstructor) || (availableSeats === 0)} className='random-btn btn text-white'>Add Class</button>
                                    </div>
                                </div>
                            </div>
                            </> : 
                            <>
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
                                        <button onClick={handleAddClass} disabled={(user ? false : true) || (buttonDisabled) || (isAdmin) || (isInstructor)} className='random-btn btn text-white'>Add Class</button>
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                </div>
    );
};

export default  SingleClass;