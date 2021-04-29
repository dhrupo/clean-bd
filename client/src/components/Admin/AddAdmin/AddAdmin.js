import React, { useState } from 'react';

const AddAdmin = () => {
  const [admin, setAdmin] = useState();

  const handleBlur = (e) => {
    setAdmin(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://whispering-coast-91544.herokuapp.com/addAdmin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ admin })
    })
      .then(res => alert("Admin added successfully"))
  }
  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="mb-3">
        <label for="admin" className="form-label">Admin Email</label>
        <input type="text" onBlur={handleBlur} name="admin" className="form-control" id="admin" required />
      </div>
      <button className="btn btn-outline-light">Add Admin</button>
    </form>
  );
};

export default AddAdmin;