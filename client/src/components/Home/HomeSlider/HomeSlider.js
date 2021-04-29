import React from 'react';
import "./HomeSlider.css";
import slide1 from "../../../images/slide1.jpg"
import slide2 from "../../../images/slide2.jpg"
import slide3 from "../../../images/slide3.jpg"
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={slide1} className="img-fluid d-block w-100" alt="" />
          <div className="my-carousel-caption d-none d-md-block">
            <h1 className="mb-5 first-color">Home Cleaning</h1>
            <h5 className="second-color mb-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, distinctio.</h5>
            <Link to="/services#/orderService" className="text-light btn btn-lg btn-first-color">Book a service</Link>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slide2} className="img-fluid d-block w-100" alt="" height="600" />
          <div className="my-carousel-caption d-none d-md-block">
            <h1 className="mb-5 first-color">Office Cleaning</h1>
            <h5 className="second-color mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, repellat!</h5>
            <Link to="/services#/orderService" className="text-light btn btn-lg btn-first-color">Book a service</Link>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slide3} className="img-fluid d-block w-100" alt="" height="600" />
          <div className="my-carousel-caption d-none d-md-block">
            <h1 className="mb-5 first-color">Windows Cleaning</h1>
            <h5 className="second-color mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, consequatur.</h5>
            <Link to="/services#/orderService" className="text-light btn btn-lg btn-first-color">Book a service</Link>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeSlider;