"use client";
import "react-slideshow-image/dist/styles.css";

import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Spinner from "./Spinner";
import { getAllProductsOfDashboardCategory } from "../api/api";
import Link from "next/link";

const Carousel = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching product data
                const response = await getAllProductsOfDashboardCategory(
                    "SLIDER"
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
        <Slide
            autoplay={true}
            onChange={function noRefCheck() {}}
            onStartChange={function noRefCheck() {}}
        >
            {data.map((item, index) => (
                <Link href={`/products/${item.item}`} className="each-slide-effect" key={index}>
                    <div
                        style={{
                            backgroundImage: `url(${item.images})`,
                            backgroundSize: "fit", // Set the background size to cover
                            backgroundPosition: "center", // Center the background image
                            backgroundRepeat: "no-repeat",
                            // width: '500px', // Set the width
                            height: "550px", // Set the height
                        }}
                    >
                        <div className="flex flex-col items-center justify-end h-full">
                            <div className="bg-white bg-opacity-40 w-full flex flex-col items-start ps-20 p-4">
                                {" "}
                                {/* Adjust opacity value as needed */}
                                <p className="text-3xl font-semibold">
                                    {item.item}
                                </p>
                                <p className="text-xs">
                                    Materials: {item.material} {" | "} Price:{" "}
                                    {item.pricePerPiece}{" BDT"}
                                </p>
                                <p className="text-xs">
                                    Model: {item.model}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </Slide>
    );
};

export default Carousel;
