"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStateContext } from "../Context/AppContext";
import { getCartItem, removeACart, updateQuantity } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { extractDataFromJWT } from "../auth";

const CartPage = () => {

    const { globalState, setGlobalState } = useStateContext();
    const [email, setEmail] = useState(null);
    useEffect(() => {
        if ((globalState !== null) & (typeof globalState !== undefined)) {
            const data = extractDataFromJWT(globalState);
            if (data) {
                console.log(data);
                setEmail(data.sub)
            }
        }
        getAllCartItems();
    }, [globalState]);
    
    const [cartItems, setCartItems] = useState([]);
    // {image: "", model:"", totalWeight:"", totalCartoon: "",price: 10, totalCbm:" ", quantity:"620"}
    const getAllCartItems = async()=>{  
        console.log("called", localStorage.getItem("browserId"));
      
        const res = await getCartItem(localStorage.getItem("browserId"), email);
        console.log("fetched",  res.data);
        setCartItems(res.data)
    }
   

    // Mock data for cart items

    const handleQuantityChange = (itemId, newQuantity) => {
        updateQuantity(itemId, newQuantity).then((res)=>{
            console.log("res",res);
            toast(res.message);
        })
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = async(itemId) => {
        const res = await removeACart(itemId)
        console.log(res);
        toast(res.message);
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const totalAmount = cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleCheckout = ()=>{
        if(!email){
            toast("Please Log in First 🥺");
            return
        }
        toast("getting it")
    }

    return (
        <div className="mx-28 my-10 px-4">
        <Toaster position="top-center" reverseOrder={true} />
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {!cartItems ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="flex flex-col">
                {cartItems.length > 0 ? (
                    <>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300 text-xs">
                                    <th className="py-2 text-start">Image</th>
                                    <th className="py-2 text-start">Name</th>
                                    <th className="py-2 text-start">Weight</th>
                                    <th className="py-2 text-start">Total Cartoon</th>
                                    <th className="py-2 text-start">Total CBM</th>
                                    <th className="py-2 text-start">Price</th>
                                    <th className="py-2 text-start">Quantity</th>
                                    <th className="py-2 text-start"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-b text-xs border-gray-300">
                                        <td className="py-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover mr-4"
                                            />
                                        </td>
                                        <td className="py-2">{item.productName}</td>
                                        <td className="py-2">{item.weight} gm</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">{item.cbm * item.quantity} m<sup>3</sup></td>
                                        <td className="py-2">BDT ${item.price}</td>
                                        <td className="py-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                min="1"
                                                className="w-16 border border-gray-300 rounded py-1 px-2"
                                            />
                                        </td>
                                        <td className="py-2">
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-6 flex flex-col items-end">
                            <p className="text-xl font-bold">
                                Total Amount:{" "}
                                <span className="text-4xl">${totalAmount}</span>
                            </p>
                            <button 
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={handleCheckout}
                            >
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
