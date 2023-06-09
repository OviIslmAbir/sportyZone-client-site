import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const PaymentHistory = () => {
    useTitle('Payment history')
    const [history, setHistory] = useState([])
    const{user} = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/payments?email=${user?.email}`)
        .then(res => setHistory(res.data))
    }, [])
    console.log(history)
    return (
        <div>
            <h2 className='text-center'>Payment History</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">PAYMENT DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((singleHistory, index) => 
                        <tr key={singleHistory._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{singleHistory.email}</td>
                            <td>${singleHistory.price}</td>
                            <td>{singleHistory.date}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;