import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import { FaUserShield } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { useQuery } from '@tanstack/react-query';
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
const ManageUsers = () => {
    useTitle('Manage users')
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json()
        return data;
    })
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is an Instructor Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
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
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => 
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn btn-warning'><FaUserShield></FaUserShield></button>}</td>
                            <td>{user.role === 'instructor' ? "Instructor" : <button onClick={() => handleMakeInstructor(user)} className='btn btn-dark'><GiTeacher></GiTeacher></button>}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;