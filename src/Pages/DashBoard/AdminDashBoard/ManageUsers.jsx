import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import { FaUserShield } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { useQuery } from '@tanstack/react-query';
const ManageUsers = () => {
    useTitle('Manage users')
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json()
        return data;
    })
    return (
        <div>
            <h2>Manage Users</h2>
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
                            <td><button onClick={{}} className='btn btn-warning'><FaUserShield></FaUserShield></button></td>
                            <td><button onClick={{}} className='btn btn-dark'><GiTeacher></GiTeacher></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;