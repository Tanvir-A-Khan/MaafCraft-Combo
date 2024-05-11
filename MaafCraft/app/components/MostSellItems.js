"use client"
import React, { useEffect, useState } from "react";
import { getAllProductsOfCategory, getAllProductsOfDashboardCategory } from "../api/api";
import Spinner from "./Spinner";
import Link from "next/link";
import Product from "./Product";


const MostSellItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching product data
                const response = await getAllProductsOfDashboardCategory(
                    "MOST SELLING ITEMS"
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
        <div className="bg-[#efefef] my-15">
            <div className="my-15 border-2 h-auto border-[#ff2832]">
                <p className="bg-[#ff2832] p-2 px-6 uppercase font-bold text-white">
                    Most Sale Items
                </p>
                <div className="flex p-2">

                {data.map((data, index) => (
                    <Link href={`/products/${data.item}`} key={index}>
                        <Product
                            imageUrl={data.images}
                            productName={data.item}
                            />
                    </Link>
                ))}
                
                </div>
            </div>
        </div>
    );
};

export default MostSellItems;
