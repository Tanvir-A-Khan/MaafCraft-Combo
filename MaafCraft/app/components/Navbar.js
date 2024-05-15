"use client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";       
import { usePathname } from "next/navigation";
import NavBarPopOver from "./NavBarPopOver";
import { useStateContext } from "../Context/AppContext";
import { extractDataFromJWT } from "../auth";

const Navbar = () => {

    const path = usePathname();
    const {globalState} = useStateContext();
    const [isAdmin, setIsAdmin] =  useState(false);
    useEffect(()=>{
        if(globalState!==null & typeof globalState !== undefined){
            const data = extractDataFromJWT(globalState);
            if(data){
                console.log(data);
                setIsAdmin(data.roles.includes("ROLE_ADMIN"))
            }

        }
    },[globalState])
    return (
        <div className="sticky top-0 z-10 ">
            <NavBarPopOver/>
            {/* <CustomNav /> */}

            <div className="bg-[#444444] text-center mx-28 hidden lg:flex">
                <ul className=" md:flex flex-wrap justify-start divide-x-2 divide-solid divide-y-2
                 divide-[#555555] *:px-[11px] *:py-[2px] *:text-[12px]
                  *:uppercase *:font-extralight *:tracking-wide *:text-white items-center">
                    {/* Add FontAwesome icon to the first list item */}
                    <Link href="/" className="hover:bg-[#555555] duration-300 hover:cursor-pointer text-white bg-green-600 ">
                        <li >
                            <FontAwesomeIcon
                                icon={faHome}
                                className="text-white text-3xl w-5"
                            />
                        </li>
                    </Link>
                    <Link href="/products"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/products"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            All Products
                        </li>
                    </Link>
                    <Link href="/about"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/about"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            About
                        </li>
                    </Link>
                    <Link href="/certification"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/certification"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Certification
                        </li>
                    </Link>
                    <Link href="/license"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/license"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Legal License
                        </li>
                    </Link>

                    <Link href={"/catalog"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/catalog"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Catalog
                        </li>
                    </Link>
                    <Link href={"/material-info"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/material-info"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Materials Info
                        </li>
                    </Link>
                    <Link href={"/gallery"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/gallery"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Gallery
                        </li>
                    </Link>
                    <Link href={"/contact"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${path === "/contact"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Contact
                        </li>
                    </Link>
                    {/* {
                        isAdmin &&
                    <Link href={"/admin-panel"}  
                    className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                    flex items-center ${path === "/admin-panel"
                    ? "bg-[#2e2e2e] text-white "
                    : null
                        }`}>
                       
                            Admin Panel
                      
                    </Link>
                    } */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;