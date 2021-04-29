import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import "./Workflow.css";
import Feedback from '../Feedback/Feedback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faTruckPickup, faUser, faSmile } from '@fortawesome/free-solid-svg-icons'

const Workflow = () => {
  return (
    <div className="workflow-bg p-5">
      <h5 className="mb-4 title text-center text-white">How It Work</h5>
      <div className="row row-cols-1 row-cols-md-4 g-4 text-center mb-5">
        <div className="col">
          <div className="card h-100">
            <FontAwesomeIcon icon={faPhoneAlt} className="p-2 mx-auto fa-5x" />
            <div className="card-body">
              <h5 className="card-title">Easy Online Booking</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <FontAwesomeIcon icon={faTruckPickup} className="p-2 mx-auto fa-5x" />
            <div className="card-body">
              <h5 className="card-title">Insured & Bounded</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <FontAwesomeIcon icon={faUser} className="p-2 mx-auto fa-5x" />
            <div className="card-body">
              <h5 className="card-title">Experienced Staff</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <FontAwesomeIcon icon={faSmile} className="p-2 mx-auto fa-5x" />
            <div className="card-body">
              <h5 className="card-title">100% Satisfaction</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
      </div>

      <ServiceCard></ServiceCard>
      <Feedback></Feedback>

    </div>
  );
};

export default Workflow;