"use client"
import React, { useState } from 'react';
import Link from "next/link";

const LoginForm = () => {
  const [formDataLogin, setFormDataLogin] = useState({

    email: '',
    password: '',
  });

  const handleChangeLoginData = (e) => {
    const { name, value } = e.target;
    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formDataLogin);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleLogin} className="max-w-lg my-6 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 uppercase ">Reset your password</h2>
      <hr/>
      <br/>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-xs">Email</label>
        <input type="email" id="email" name="email" value={formDataLogin.email} onChange={handleChangeLoginData} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-xs">Password</label>
        <input type="password" id="password" name="password" value={formDataLogin.password} onChange={handleChangeLoginData} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" required />
      </div>
      <p className='text-xs my-4'>Already have an account? <Link href="/registration">Login Here</Link></p>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Login</button>
    </form>
  );
};

export default LoginForm;
