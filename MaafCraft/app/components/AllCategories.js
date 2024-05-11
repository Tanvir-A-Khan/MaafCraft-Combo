"use client";
import React, { useState, useEffect } from "react";
import { getAllCategories } from "../api/api";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const AllCategories = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await getAllCategories();
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
        // Navigate to the category page with category as path variable
        router.push(`/products/categories/${categoryName}`);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col">
            <h1 className="ps-4 pt-4 font-bold text-xl">All Categories</h1>

            <div>
                <ul className="p-4 w-56  hover:cursor-pointer text-sm">
                    {categories.map((category, index) => (
                        <li
                        key={index}
                        className="p-1  border-2 border-transparent
                        rounded-sm  font-semibold hover:bg-gray-200 hover:text-green-700"
                        onClick={() => handleCategoryClick(category)}
                        >
                            {"🍃"} {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllCategories;
