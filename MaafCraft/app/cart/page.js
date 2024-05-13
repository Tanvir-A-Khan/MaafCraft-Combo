"use client";
import React, { useState } from "react";
import Link from "next/link";

const CartPage = () => {
    // Mock data for cart items
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Handcrafted Mug", price: 10, weight: 10, quantity: 2 },
        { id: 3, name: "Artisanal Candle", price: 15,weight: 10, quantity: 3 },
        { id: 2, name: "Handwoven Basket", price: 20,weight: 10, quantity: 1 },
    ]);
    // {image: "", model:"", totalWeight:"", totalCartoon: "",price: 10, totalCbm:" ", quantity:"620"}

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-28 my-10">
            <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="flex flex-col">
                    {cartItems.length > 0 ? (
                        <>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="px-4 py-2 text-start">
                                            Image
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Weight
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Total Cartoon
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Total CBM
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Price
                                        </th>
                                        <th className="px-4 py-2 text-start">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-2 text-start"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-300"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`https://res.cloudinary.com/dzoftwksg/image/upload/v1714320615/file_m21xat.jpg`}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover mr-4"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.weight}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.weight}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2">
                                                ${item.price}
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    min="1"
                                                    className="w-16 border border-gray-300 rounded py-1 px-2"
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="text-red-500"
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 flex flex-col items-end me-36">
                                <p className="text-xl font-bold">
                                    Total Amount:{" "}
                                    <span className="text-4xl">
                                        {" "}
                                        ${totalAmount}{" "}
                                    </span>
                                </p>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartPage;
