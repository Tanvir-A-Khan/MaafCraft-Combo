"use client";
import React from "react";
import { CldImage } from "next-cloudinary";

const Product = (props) => {
    const { imageUrl, productName, price, rating, addToCartHandler } = props;

    return (
        <div className="h-[220px] w-[160px] lg:h-[230px] lg:w-[190px] bg-base-50 shadow-2xl flex flex-col items-center ">
            <div className="h-[150px] w-[160px] lg:h-[170px] lg:w-[180px] ">
                <CldImage
                    src={imageUrl}
                    width={500}
                    height={500}
                    alt={productName}
                    className="object-cover rounded-t-lg hover:opacity-70  transition-all h-[150px] w-full"
                />
            </div>
            <div className="h-[80px] w-[100%] px-4 pt-1 overflow-hidden bg-slate-100">
                <h2 className="flex items-start justify-start w-[170px] text-base font-semibold leading-snug overflow-hidden">
                    {productName}
                </h2>
                <div className=" flex  justify-between">
                    <div>
                        <h2 className="text-xs">Price: {price}TK</h2>
                        <h2 className="text-xs">Rating: {rating}/5.0</h2>
                    </div>
                 
                </div>
            </div>
        </div>
    );
};
export default Product;
