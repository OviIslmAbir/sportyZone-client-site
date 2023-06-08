import React from 'react';
import useSelectedClasses from '../../../Hooks/useSelectedClasses';
import { FaTrash } from 'react-icons/fa';
import '../../../Common/Style/Style.css'
const MySelectedClass = () => {
    const [selectedClasses, refetch] = useSelectedClasses()
    const total = selectedClasses.reduce((sum, item) => item.price + sum, 0);
    return (
        <div>
            <h2 className='text-center mb-4'>My Selected Classes</h2>
            <div className='d-flex justify-content-around my-3'>
                <h4>Total Price: ${total}</h4>
                <button className='btn random-btn text-white'>Pay</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Class Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedClasses.map((selectedClass, index) => 
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td><img className='rounded' style={{width:"50px", height:"50px"}} src={selectedClass.image} alt="" /></td>
                            <td>{selectedClass.name}</td>
                            <td>${selectedClass.price}</td>
                            <td><button className='btn btn-outline-danger'><FaTrash></FaTrash></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MySelectedClass;