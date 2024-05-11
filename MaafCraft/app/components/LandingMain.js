"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import AllCategories from "./AllCategories";
import Spinner from "./Spinner";
import { getAllProductsOfDashboardCategory } from "../api/api";
import Link from "next/link";

const LandingMain = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching product data
                const response = await getAllProductsOfDashboardCategory(
                    "DISCOUNT PRODUCTS"
                );
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="md:flex md:justify-between h-[80%]  bg-white border-1 border-black">
            <AllCategories className="bg-slate-100" />
            <div className=" bg-gray-200 md:w-[50%]">
                <Carousel />
            </div>

            <div className="md:w-[30%] p-2 ">
                <h1 className="font-bold mb-1">Discount Products</h1>

                {data.map((item, index) => (
                    <Link href={`/products/${item.item}`} className="flex gap-4 mb-2 mr-2 hover:cursor-pointer hover:bg-gray-100" key={index}>
                        <img
                            src={item.images}
                            alt="product"
                            className="h-[85px] w-[95px]  object-cover "
                        />

                        <div className="">
                            <h1 className="font-semibold ">{item.item}</h1>
                            <p className="text-xs">Material: {item.material}</p>
                            <p className="text-xs">
                                Price: {item.pricePerPiece}
                            </p>
                            <p className="text-xs">Rating: {item.rating}/5</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingMain;
