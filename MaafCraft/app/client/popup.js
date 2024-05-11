"use client"
import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle the popup */}
      <button onClick={togglePopup}>Open Popup</button>

      {/* Popup content */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Popup Content</h2>
            <img src="./products/1.jpg" alt="Image" className="w-32 mb-4" />
            <p>This is the content of the popup.</p>
            <button onClick={togglePopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
