import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import ServiceList from './ServiceList/ServiceList';
import OrderService from './OrderService/OrderService';
import AddReview from './AddReview/AddReview';

const Services = () => {
  return (
    <div className="container-fluid">
      <HashRouter>
        <div className="row">
          <div className="col-md-3 flex-column">
            <Link to="/serviceList" className="p-3 mb-2 nav-link">My Service</Link>
            <Link to="/orderService" className="p-3 mb-2 nav-link">Book Service</Link>
            <Link to="/addReview" className="p-3 mb-2 nav-link">Add Review</Link>
          </div>
          <div className="col-md-9 bg-first-color">
            <Route exact path="/" component={ServiceList} />
            <Route path="/serviceList" component={ServiceList} />
            <Route path="/orderService" component={OrderService} />
            <Route path="/addReview" component={AddReview} />
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

export default Services;