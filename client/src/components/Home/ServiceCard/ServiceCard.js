import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ServiceCard.css";

const ServiceCard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://whispering-coast-91544.herokuapp.com/services")
      .then(res => res.json())
      .then(data => setServices(data))
  }, [services])

  return (
    <div className="container p-4">
      <h5 className="mb-4 title text-light text-center">Our Services</h5>
      <div className="row row-cols-md-3 g-4">
        {
          services.map(sr =>
            <Link to="/services#/orderService">
              <div className="col text-center" key={sr._id}>
                <div className="card h-100 service-img-div">
                  <img src={`https://whispering-coast-91544.herokuapp.com/${sr.image}`} height="300" className="service-img card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{sr.serviceName}</h5>
                    <p className="card-text">Price: ${sr.servicePrice}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default ServiceCard;