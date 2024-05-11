"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getNameAutoComplete } from "../api/api";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
const HeaderTop = () => {
    // window.location.reload();
    const [temp, setTemp] = useState(localStorage.getItem("auth")==null);

    const [auth, setAuth]=useState()
    useEffect(()=>{
        setAuth(localStorage.getItem("auth") != null);
    },[temp, ]);

    const handleLogout = () => {
        console.log("working");
        console.log();
        localStorage.clear();
        setAuth(!auth)

        
    }
    const router = useRouter();
    const [items, setItems] = useState([
        { id: 0, name: "HTML" },
        { id: 1, name: "JavaScript" },
        { id: 2, name: "Basic" },
        { id: 3, name: "PHP" },
        { id: 4, name: "Java" },
    ]);

    const handleOnSearch = async (string, results) => {
        // Triggered when the user types in the search input
        const response = await getNameAutoComplete(string);
        setItems(response.data);

        console.log(string, results);
    };

    const handleOnHover = (item) => {
        // Triggered when the user hovers over an item in the suggestions list
        console.log("Item hovered:", item);
    };

    const handleOnSelect = (item) => {
        // Triggered when the user selects an item from the suggestions list

        router.push("/products/" + item.name);
        console.log("Item selected:", item);
        // onSearchSelected(item);
    };
    return (
        <div className="w-[100%] lg:block hidden">
            <div className="md:flex justify-between h-auto  md:px-28 bg-[#EFEFEF] py-2">
                <h1 className="flex text-green-600 md:p-2 justify-center text-xl md:text-3xl font-semibold h-auto items-center ">
                    {"🍃"} maafcraft and fashion
                </h1>
                <div className="hidden lg:flex flex-col items-center h-auto justify-center text-xs gap-2 text-red-600">
                    <h2>
                        <FontAwesomeIcon icon={faPhone} className="w-5" />
                        Hotline: +88 01942 257473
                    </h2>
                    <h2>
                        <FontAwesomeIcon icon={faPhone} className="w-5" />
                        Hotline: +88 01942 257473
                    </h2>
                </div>
                <div className="z-20 flex items-center">
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        className="w-96"
                    />
                    <Link href={"/cart"}>
                        <AiOutlineShoppingCart className="text-4xl ms-10 hover:cursor-pointer" />
                    </Link>
                </div>
                <span className="h-auto flex justify-center items-center gap-3 ">
                    {auth==false && (
                        <Link href={"/registration"}>Signup</Link>
                    )}
                    {auth && (
                        <div className="flex">

                        <h1>Profile__
                        </h1>
                        <button onClick={handleLogout } >Logout</button>
                        </div>
                    )}
                </span>
            </div>
            <div className="px-96 text-green-800 font-semibold">
                <Marquee>
                    Maafcraft offers quality products, competitive prices and
                    on-time delivery.
                </Marquee>
            </div>
            {/* <SearchSection/> */}
        </div>
    );
};

export default HeaderTop;
