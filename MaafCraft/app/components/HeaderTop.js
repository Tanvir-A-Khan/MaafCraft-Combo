"use client";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getNameAutoComplete } from "../api/api";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import { useStateContext } from "../Context/AppContext";
import { extractDataFromJWT } from "../auth";

export const Context = React.createContext();

const HeaderTop = () => {
    const { globalState, setGlobalState } = useStateContext();

    const [islogged, setIslogged] = useState(globalState);

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if ((globalState !== null) & (typeof globalState !== undefined)) {
            const data = extractDataFromJWT(globalState);
            if (data) {
                console.log(data);
                setIsAdmin(data.roles.includes("ROLE_ADMIN"));
                setIslogged(data.roles.includes("ROLE_USER"));
            }
        }
    }, [globalState]);

    const handleProfile = () => {
        const email = extractDataFromJWT(globalState).sub;
        console.log(email);
    };

    const handleLogout = () => {    
        console.log("loggingout ...");
        setGlobalState(null);
        localStorage.removeItem("auth");
    };
    const router = useRouter();
    const [items, setItems] = useState([{ id: 0, name: "Searching...." }]);

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
        <div className="w-full lg:block hidden">
            <div className="md:flex justify-between h-auto md:px-28 bg-[#EFEFEF] py-2">
                <h1 className="flex text-green-600 md:p-2 justify-center text-xl md:text-3xl font-semibold h-auto items-center">
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

                <div className="h-auto flex justify-center items-center gap-3 ">
                    {globalState ? (
                        <div className="flex w-40 justify-between">
                            <button onClick={handleProfile}>Profile</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <Link href={"/registration"}>Signup</Link>
                    )}
                </div>
            </div>
            <div className="px-96 text-green-800 font-semibold">
                <Marquee>
                    Maafcraft offers quality products, competitive prices, and
                    on-time delivery.
                </Marquee>
            </div>
        </div>
    );
};

export default HeaderTop;
