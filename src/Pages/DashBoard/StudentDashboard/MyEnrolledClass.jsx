import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useTitle from '../../../Hooks/useTitle';
const MyEnrolledClass = () => {
    useTitle("My enrolled class")
    const [enrolledClass, setEnrolledClass] = useState([])
    const{user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/enrolled?email=${user?.email}`)
        .then(res => setEnrolledClass(res.data))
    }, [])
    return (
        <div>
            <Fade><h2 className='text-center mb-3'>My Enrolled Classes</h2></Fade>
            {enrolledClass.map(item => (
                <div key={item._id}>
                    {item.className.map((className, index) => (
                        <p className='border p-4 w-50 mx-auto text-center mt-3' key={index}>{className}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyEnrolledClass;