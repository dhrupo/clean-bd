import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


const Footer = () => {
  const { handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div className="text-white container-fluid bg-dark">
      <div className="row justify-content-around align-items-center p-5">
        <div className="col-md-3">
          <h4><Link to="" className="text-decoration-none">Clean BD</Link></h4>
          <p className="fw-light text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, pariatur saepe officiis nostrum adipisci nulla.</p>
        </div>
        <div className="col-md-3">
          <p className="title">Quick Links</p>
          <nav className="nav flex-column">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/services#" className="nav-link">Services</Link>
            <Link to="/FAQS" className="nav-link">FAQS</Link>
          </nav>
        </div>
        <div className="col-md-3">
          <p className="title">Newsletter</p>
          <p className="text-muted fw-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, animi.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="text-center mx-auto">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Email" required />
              <button className="btn btn-first-color" type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Footer;