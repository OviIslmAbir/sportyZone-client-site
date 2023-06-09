import React, { useContext, useEffect, useState } from 'react';
import '../Common/Style/Style.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import useSelectedClasses from '../Hooks/useSelectedClasses';
import Swal from 'sweetalert2'
import moment from 'moment';
const PaymentCheckOutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError , setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const {user} = useContext(AuthContext)

    const [selectedClasses] = useSelectedClasses()
    const total = selectedClasses.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2))

    useEffect(() => {
        axios.post('http://localhost:5000/create-payment-intent', {price})
          .then(res => {
            setClientSecret(res.data.clientSecret)
          })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
          if (error) {
            setCardError(error.message)
          } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
          }
          setProcessing(true)
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'unKnown',
                  name: user?.displayName || 'anonymous',
                },
              },
            },
          );
          if (confirmError) {
            setCardError(confirmError.message)
          }
          setProcessing(false)
          console.log(paymentIntent)
          if(paymentIntent.status === "succeeded"){
              const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date : moment().format('MMMM Do YYYY, h:mm:ss a'),
                quantity: selectedClasses.length,
                selectedClasses: selectedClasses.map(selectedClass =>  selectedClass._id),
                className: selectedClasses.map(selectedClass =>  selectedClass.name)
            }
            axios.post('http://localhost:5000/payments', payment)
            .then(res => {
                if(res.data.result.insertedId){
                    Swal.fire({
                        title: 'Payment Successfully.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }    
                    });
                }
            })
          }
    }
    return (
        <div>
           <div className='container'>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                            }}
                        />
                    <button className='btn random-btn mt-4 text-white' type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </form>
                {cardError && <p className='text-center mt-2 text-danger'>{cardError}</p>}
            </div>
        </div>
    );
};

export default PaymentCheckOutForm;