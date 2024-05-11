"use client";
import React, { useState } from "react";
import Link from "next/link";
import { loginUser, registerUser } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
    const router = useRouter();
    const [formDataRegistration, setFormDataRegistration] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        address: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataRegistration((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formDataRegistration);
            if(data.result){
                console.log(data);
                toast(data.message);
            }else{
                toast(data.message);
            }
            setFormDataRegistration({
                name: "",
                email: "",
                phone: "",
                linkedin: "",
                address: "",
                password: "",
            });
        } catch (error) {
            // Handle the registration error
            console.error("Registration failed:", error);
            toast("Failed to register user. Please try again later.");
        }
    };

    // =================================
    const [formDataLogin, setFormDataLogin] = useState({
        email: "",
        password: "",
    });

    const handleChangeLoginData = (e) => {
        const { name, value } = e.target;
        setFormDataLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formDataLogin);

        try{
            const data = await loginUser(formDataLogin);
            console.log(data);
            toast("Login in Success")
            // window.location.href = '/'
            // router.push("/");
            // window.location.reload();

            setFormDataLogin({});
            router.push("/")
            

        }catch(e){
            console.log(e);
        }
        // Add your form submission logic here
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between mx-28">
            <form
                onSubmit={handleSubmit}
                className="lg:w-[48%] my-6 p-6  bg-white rounded-lg shadow-lg"
            >
                <Toaster position="top-center" reverseOrder={true} />
                <h2 className="text-2xl font-bold  uppercase">
                    New Customer
                </h2>
                <p className="">Register Here</p>
                <hr /><hr /><hr /><hr /><hr /><br />
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-xs"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formDataRegistration.name}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-xs"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDataRegistration.email}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-gray-700 text-xs"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formDataRegistration.phone}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-xs"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formDataRegistration.password}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="linkedin"
                        className="block text-gray-700 text-xs"
                    >
                        Linkedin
                    </label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formDataRegistration.linkedin}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="block text-gray-700 text-xs"
                    >
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formDataRegistration.address}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                    Register
                </button>
            </form>
            <form
                onSubmit={handleLogin}
                className="lg:w-[48%] my-6 p-6 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold uppercase ">
                    Returning Customer
                </h2>
                <p>Login Here</p>
                <hr /><hr /><hr /><hr /><hr />
                <br />

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-xs"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDataLogin.email}
                        onChange={handleChangeLoginData}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-xs"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formDataLogin.password}
                        onChange={handleChangeLoginData}
                        className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                    Login
                </button>
                <p className="text-sm my-4">
                    <Link href="/forget-password">Forgot you password? Reset here</Link>
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;
