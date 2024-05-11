"use client"
import React, { useState } from 'react';
import Link from "next/link";       

const CartPage = () => {
  // Mock data for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Handcrafted Mug', price: 10, quantity: 2 },
    { id: 2, name: 'Handwoven Basket', price: 20, quantity: 1 },
    { id: 3, name: 'Artisanal Candle', price: 15, quantity: 3 },
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = itemId => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-28 my-10">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b border-gray-300 py-2">
              <img src={`images/${item.id}.jpg`} alt={item.name} className="w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p>Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                    className="w-16 border border-gray-300 rounded py-1 px-2"
                  />
                  <button className="ml-4 text-red-500" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">Total Amount: ${totalAmount}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
