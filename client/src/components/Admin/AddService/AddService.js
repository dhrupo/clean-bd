import React, { useState } from 'react';

const AddService = () => {
  const [service, setService] = useState({});
  const [file, setFile] = useState(null);

  const handleBlur = (e) => {
    const newService = { ...service };
    newService[e.target.name] = e.target.value;
    setService(newService);
  }

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('serviceName', service.serviceName);
    formData.append('servicePrice', service.servicePrice);

    fetch("https://whispering-coast-91544.herokuapp.com/addService", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert("service successfully added");
      })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-5 p-5 w-50">
      <div className="mb-3">
        <label for="serviceName" className="form-label">Service Name</label>
        <input onBlur={handleBlur} type="text" name="serviceName" className="form-control" id="serviceName" required />
      </div>
      <div className="mb-3">
        <label for="servicePrice" className="form-label">Service Price</label>
        <input onBlur={handleBlur} type="text" name="servicePrice" className="form-control" id="servicePrice" required />
      </div>
      <div className="mb-3">
        <label for="serviceImage" className="form-label">Upload Service Image</label>
        <input onChange={handleFileChange} type="file" name="file" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Add Service</button>
    </form>
  );
};

export default AddService;