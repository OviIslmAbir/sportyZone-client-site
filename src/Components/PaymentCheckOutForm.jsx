import React, { useContext, useEffect, useState } from 'react';
import '../Common/Style/Style.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2'
import moment from 'moment';
import { useLoaderData, useNavigate } from 'react-router-dom';
const PaymentCheckOutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError , setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)

    const {user} = useContext(AuthContext)
    const selectedClass = useLoaderData()
    const price = selectedClass.price

    const navigate = useNavigate()
    useEffect(() => {
        axios.post('https://assignment-12-server-site-ecru.vercel.app/create-payment-intent', {price})
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
                selectedClass: selectedClass._id,
                className: selectedClass.name
            }
            axios.post('https://assignment-12-server-site-ecru.vercel.app/payments', payment)
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
                navigate('/classes')
                const enrolledItem = {
                  className: selectedClass.name,
                  image: selectedClass.image,
                  email: user?.email
                }
                axios.post(`https://assignment-12-server-site-ecru.vercel.app/enrolled?email=${user?.email}`, enrolledItem)
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