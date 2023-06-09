import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentCheckOutForm from '../../../Components/PaymentCheckOutForm';


const Payment = () => {
    const stripePromise = loadStripe('pk_test_51NEXDnIqNFkYGFdQ7N2FBbDMNTbmSN7zgptFGyZ8f3PN4FpHih7N9csrtHFziHlFdEuxlPJGNhWsJtLMLscP1rAX00Ajp9XryX')

    
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