import React from 'react';
import useSelectedClasses from '../../../Hooks/useSelectedClasses';
import { FaTrash } from 'react-icons/fa';
import '../../../Common/Style/Style.css'
import Swal from "sweetalert2";
import useTitle from '../../../Hooks/useTitle';
import { Link } from 'react-router-dom';

const MySelectedClass = () => {
    useTitle('My selected class')
    const [selectedClasses, refetch] = useSelectedClasses()
    const total = selectedClasses.reduce((sum, item) => item.price + sum, 0);
    const name = selectedClasses.map(selectedClass => selectedClass.name)
    const handleDelete = selectedClass => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selectedClasses/${selectedClass._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                        }
                        localStorage.removeItem(`buttonDisabled_${name}`)
                    })
            }
        })
    }
    return (
        <div>
            <h2 className='text-center mb-4'>My Selected Classes</h2>
            <div className='d-flex justify-content-around my-3'>
                <h4>Total Price: ${total}</h4>
                <Link to='/dashboard/payment'><button className='btn random-btn text-white'>Pay</button></Link>
            </div>
            <table className="table">
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
                        <tr key={selectedClass._id}>
                            <th scope="row">{index + 1}</th>
                            <td><img className='rounded' style={{width:"50px", height:"50px"}} src={selectedClass.image} alt="" /></td>
                            <td>{selectedClass.name}</td>
                            <td>${selectedClass.price}</td>
                            <td><button onClick={() => handleDelete(selectedClass)} className='btn btn-outline-danger'><FaTrash></FaTrash></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MySelectedClass;