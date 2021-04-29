import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../App';

const ServiceList = () => {
  const [user, setUser] = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const userName = user.email || user.displayName;

  useEffect(() => {
    fetch(`https://whispering-coast-91544.herokuapp.com/order?name=${userName}`)
      .then(res => res.json())
      .then(data => setOrder(data))
  }, [userName])

  return (
    <div className="container p-3">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Email / Username</th>
            <th>Service Name</th>
            <th>Payment ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            order.map(od =>
              <tr key={od._id}>
                <td>{od.user}</td>
                <td>{od.serviceName}</td>
                <td>{od.paymentId}</td>
                <td>{od.status}</td>
                <td>{new Date(od.date).toDateString("dd/MM/yyyy")}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;