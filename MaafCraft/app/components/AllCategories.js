"use client";
import React, { useState, useEffect } from "react";
import { getAllTypes } from "../api/api";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const AllCategories = () => {
    const router = useRouter();
    const [hoveredCategory, setHoveredCategory] = useState([]);
    const [mainCategory, setMainCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [got, setGot] = useState(false);

    const handleMouseEnter = async (category) => {
        try {
            const categoriesResponse = await getAllTypes(`${category}Type`);
            setHoveredCategory(categoriesResponse.data);
            setMainCategory(category);
            setGot(true);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleMouseLeave = () => {
        setHoveredCategory([]);
        setGot(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await getAllTypes("ProductType");
                setCategories(categoriesResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryClick = (categoryName) => {
        router.push(`/products/categories/${categoryName}`);
    };

    function replaceUnderscoresWithSpaces(inputString) {
        return inputString.replace(/_/g, " ");
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col">
            <h1 className="p-4 font-bold text-xl bg-slate-50">{"🗂️"} Categories</h1>

            <div className="relative flex" onMouseLeave={handleMouseLeave}>
                <ul className="w-56 hover:cursor-pointer text-sm">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="p-1 ps-3 mb-2 border-2 border-transparent rounded-sm hover:font-semibold hover:bg-gray-200 hover:text-green-700"
                            onClick={() => handleCategoryClick(category)}
                            onMouseEnter={() => handleMouseEnter(category)}
                            
                        >
                            {"📜 "}  {replaceUnderscoresWithSpaces(category)}
                            {/* <hr/>    */}
                        </li>
                    ))}
                </ul>

                {got && (
                    <ul className="absolute ms-40 bg-white shadow-lg rounded  hover:cursor-pointer z-40 ">
                        <li className="p-2 mb-1 font-bold w-40 bg-slate-100 text-center" >{"🏷️"}{replaceUnderscoresWithSpaces(mainCategory)}{"🏷️"}  </li>
                        {hoveredCategory.map((item, index) => (
                            <li key={index}  className="p-1 ps-3 mb-1 w-40 text-sm border-2  hover:font-semibold border-transparent rounded-sm hover:bg-gray-200 hover:text-green-700"
                            >
                              {"📜 "}{replaceUnderscoresWithSpaces(item)}
                               {/* <hr/> */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllCategories;
