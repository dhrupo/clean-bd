import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ManageService = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(`https://whispering-coast-91544.herokuapp.com/services`)
      .then(res => res.json())
      .then(data => setService(data))
  }, [])

  const handleDelete = (id) => {
    fetch(`https://whispering-coast-91544.herokuapp.com/deleteService/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(data => {
        alert("Service deleted");
        setService(service);
      })
  }

  return (
    <div className="container p-3">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Service Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            service.map(sr =>
              <tr key={sr._id}>
                <td>{sr.serviceName}</td>
                <td>{sr.servicePrice}</td>
                <td>
                  <button onClick={() => handleDelete(sr._id)} className="btn btn-outline-danger">Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ManageService;