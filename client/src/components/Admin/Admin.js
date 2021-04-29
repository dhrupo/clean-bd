import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import AddService from './AddService/AddService';
import AddAdmin from './AddAdmin/AddAdmin';
import OrderList from './OrderList/OrderList';
import ManageService from './ManageService/ManageService';

const Admin = () => {
  return (
    <div className="container-fluid">
      <HashRouter>
        <div className="row">
          <div className="col-md-3 flex-column">
            <Link to="/manageServices" className="p-3 mb-2 nav-link">Manage Services</Link>
            <Link to="/addService" className="p-3 mb-2 nav-link">Add Service</Link>
            <Link to="/addAdmin" className="p-3 mb-2 nav-link">Add Admin</Link>
            <Link to="/orderList" className="p-3 mb-2 nav-link">Order List</Link>
          </div>
          <div className="col-md-9 bg-first-color">
            <Route exact path="/" component={OrderList} />
            <Route exact path="/manageServices" component={ManageService} />
            <Route path="/addService" component={AddService} />
            <Route path="/AddAdmin" component={AddAdmin} />
            <Route path="/orderList" component={OrderList} />
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

export default Admin;