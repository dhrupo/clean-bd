import React from 'react';
import blog1 from "../../../images/blog1.jpg";
import blog2 from "../../../images/blog2.jpg";
import blog3 from "../../../images/blog3.jpg";

const Blog = () => {
  return (
    <div className="p-5">
      <h5 className="mb-4 title text-center">Blogs & Updates</h5>
      <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
        <div className="col">
          <div className="card h-100">
            <img src={blog1} className="card-img-top" height="400" alt="" />
            <div className="card-body">
              <h5 className="card-title">How to clean your home</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src={blog2} className="card-img-top" height="400" alt="" />
            <div className="card-body">
              <h5 className="card-title">Waste Management</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src={blog3} className="card-img-top" height="400" alt="" />
            <div className="card-body">
              <h5 className="card-title">Clean your environment</h5>
              <p className="card-text text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, incidunt.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;