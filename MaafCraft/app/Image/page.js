"use client"
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(image);
      // Send the image and form data to the API
      const response = await axios.post('http://localhost:8080/products/upload-image', {
        image: image,
        name: formData.name,
        description: formData.description
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Image Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
        </div>
        {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '10px' }} />}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
