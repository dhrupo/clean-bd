import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51IeB5ZLccMGl3BV0Cj5rAs3vmtSMDPoA9vYlgrnPdokf6I7Pyya93bMawTyiQ5BF4fEzDKd8Ixdd9TPn7dEdTMTP00vpaf21Ai');

const OrderService = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  );
};

export default OrderService;