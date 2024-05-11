"use client"
import Link from "next/link";
import React from "react";

import { usePathname } from 'next/navigation'

const AdminNav = () => {
    const path = usePathname();
    return (
        <div className="md:ms-28 md:me-4 mx-2 my-4 mt-20">
            <div className="flex flex-col gap-2">
                <Link
                    href={"/admin-panel/products-management"}
                    className={`bg-green-600 p-2 m-0 text-white text-xs rounded-md w-36 hover:bg-green-800
                    ${usePathname() === "/admin-panel/products-management"
                    ? "bg-[#ff0000] text-white "
                    : null
                    
                    }`}
                    // className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                    // flex items-center ${usePathname()==="/allproducts"? "bg-[#555555]" : null}`}
                >
                    Product Management
                </Link>
                <Link
                    href={"/admin-panel/checkout-management"}
                    className={`bg-green-600 p-2 m-0 text-white text-xs rounded-md w-36 hover:bg-green-800 
                    ${usePathname()==="/admin-panel/checkout-management"? "bg-[#ff0000]" : null}`}
                >
                    Checkout Management
                </Link>
                <Link
                    href={"/admin-panel/feedback-management"}
                    className={`bg-green-600 p-2 m-0 text-white text-xs rounded-md w-36 hover:bg-green-800 
                    ${usePathname()==="/admin-panel/feedback-management"? "bg-[#ff0000]" : null}`}
                >
                    FeedBack Messages
                </Link>
                <Link
                    href={"/admin-panel/user-management"}
                    className={`bg-green-600 p-2 m-0 text-white text-xs rounded-md w-36 hover:bg-green-800 
                    ${usePathname()==="/admin-panel/user-management"? "bg-[#ff0000]" : null}`}
                >
                    User Management
                </Link>
            </div>
        </div>
    );
};

export default AdminNav;
