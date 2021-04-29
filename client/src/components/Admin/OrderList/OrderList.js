import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    fetch(`https://whispering-coast-91544.herokuapp.com/orders`)
      .then(res => res.json())
      .then(data => setOrder(data))
  }, [])

  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  const handleBlur = (id) => {
    const findOrder = order.find(od => od._id === id);
    findOrder.status = status;

    fetch(`https://whispering-coast-91544.herokuapp.com/editOrder/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(findOrder)
    })
      .then(res => {
        alert("status successfully changed");
      })
  }

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
                <td>
                  <form>
                    <select className="form-select" name="status" onChange={handleChange} onBlur={() => handleBlur(od._id)}>
                      {od.status === "pending" &&
                        <React.Fragment>
                          <option value={od.status}>{od.status}</option>
                          <option value="done">done</option>
                          <option value="ongoing">ongoing</option>
                        </React.Fragment>
                      }
                      {od.status === "done" &&
                        <React.Fragment>
                          <option value={od.status}>{od.status}</option>
                          <option value="pending">pending</option>
                          <option value="ongoing">ongoing</option>
                        </React.Fragment>
                      }
                      {od.status === "ongoing" &&
                        <React.Fragment>
                          <option value={od.status}>{od.status}</option>
                          <option value="pending">pending</option>
                          <option value="done">done</option>
                        </React.Fragment>
                      }
                    </select>
                  </form>
                </td>
                <td>{new Date(od.date).toDateString("dd/MM/yyyy")}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;