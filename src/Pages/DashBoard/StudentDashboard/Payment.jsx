import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentCheckOutForm from '../../../Components/PaymentCheckOutForm';
import useTitle from '../../../Hooks/useTitle';


const Payment = () => {
    useTitle("Payment")
    const stripePromise = loadStripe(import.meta.env.VITE_PaymentPk)

    
    return (
        <div>
            <h2 className='text-center mb-5'>Payment</h2>
            <div style={{margin:"0 70px 0 70px"}}>
                <Elements stripe={stripePromise}>
                      <PaymentCheckOutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;