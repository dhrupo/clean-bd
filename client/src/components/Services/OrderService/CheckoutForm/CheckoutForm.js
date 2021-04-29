import React, { useEffect, useState, useContext } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { UserContext } from "../../../../App";

const CheckoutForm = () => {
  const [user, setUser] = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const [services, setServices] = useState([]);
  const [service, setService] = useState({});
  const [servicePrice, setServicePrice] = useState();
  const [date, setDate] = useState();
  const [paymentError, setPaymentError] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState();

  useEffect(() => {
    fetch("https://whispering-coast-91544.herokuapp.com/services")
      .then(res => res.json())
      .then(data => setServices(data))
  }, [services])

  const servicesList = services.length > 0
    && services.map((item, i) => {
      return (
        <option key={i} value={item._id}>{item.serviceName}</option>
      )
    }, this);

  const handleChange = (e) => {
    const id = e.target.value;
    const findService = services.find(sr => sr._id === id);
    const servicePrice = findService.servicePrice;
    setServicePrice(servicePrice);
    setService(findService);
  }

  const handleDate = (e) => {
    setDate(e.target.value);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    if (error) {
      setPaymentSuccess(null);
      setPaymentError(error.message);
    }
    else {
      setPaymentError(null);
      setPaymentSuccess(paymentMethod.id);

      const orderData = {
        serviceName: service.serviceName,
        user: user.email || user.displayName,
        paymentId: paymentMethod.id,
        cardLastFourDigit: paymentMethod.card.last4,
        date: date,
        status: 'pending'
      }
      fetch("https://whispering-coast-91544.herokuapp.com/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
        .then(res => {
          alert("product successfully added");
        })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-5 p-5 w-50">
      <div className="mb-3">
        <label className="form-label">
          Select Service
        </label>
        <select name="serviceType" onChange={handleChange} className="form-select">
          <option disabled selected>Select Service</option>
          {servicesList}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Date
        </label>
        <input type="date" onChange={handleDate} className="form-control" name="date" min="2021-04-18" max="2021-12-31" />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Card number
          </label>
        <CardNumberElement className="form-control"
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Expiration date
        </label>
        <CardExpiryElement className="form-control"
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          CVC
        </label>
        <CardCvcElement className="form-control"
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
        />
      </div>
      <div className="row justify-content-around">
        <div className="col">
          <h4>
            Total Bill : {servicePrice}
          </h4>
        </div>
        <div className="col">
          <button className="btn btn-outline-light w-100" type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </div>
      {paymentError && <h5 className="text-danger">{paymentError}</h5>}
      {paymentSuccess && <h5 className="text-success">Your Payment Successful</h5>}
    </form>
  );
};

export default CheckoutForm;