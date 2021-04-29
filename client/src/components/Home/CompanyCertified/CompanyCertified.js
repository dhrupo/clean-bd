import React from 'react';
import certified from "../../../images/certified.jpg";

const CompanyCertified = () => {
  return (
    <div className="container p-5">
      <div className="row align-items-center">
        <div className="col-md-6 col-sm-12">
          <h5 className="mb-4 title">About Us</h5>
          <h2>Certified Cleaning Company Since 2005.</h2>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sed, dolorem necessitatibus voluptatum ipsa officiis tempore harum architecto. Assumenda, omnis.</p>
          <button className="mt-3 btn btn-first-color">Read More</button>
        </div>
        <div className="col-md-6 col-sm-12 d-none d-lg-block">
          <img src={certified} className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CompanyCertified;