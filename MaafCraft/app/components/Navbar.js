"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";       
import { usePathname } from "next/navigation";
import NavBarPopOver from "./NavBarPopOver";
import CustomNav from "./CustomNav";


const Navbar = () => {
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
                            flex items-center ${usePathname() === "/products"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            All Products
                        </li>
                    </Link>
                    <Link href="/about"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/about"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            About
                        </li>
                    </Link>
                    <Link href="/certification"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/certification"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Certification
                        </li>
                    </Link>
                    <Link href="/license"  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/license"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Legal License
                        </li>
                    </Link>

                    <Link href={"/membership"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/membership"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Membership
                        </li>
                    </Link>
                    <Link href={"/material-info"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/material-info"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Materials Info
                        </li>
                    </Link>
                    <Link href={"/gallery"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/gallery"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Gallery
                        </li>
                    </Link>
                    <Link href={"/contact"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/contact"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Contact
                        </li>
                    </Link>
                    <Link href={"/admin-panel"}  className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${usePathname() === "/admin-panel"
                                            ? "bg-[#2e2e2e] text-white "
                                            : null
                                        }`}>
                        <li >
                            Admin Panel
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;