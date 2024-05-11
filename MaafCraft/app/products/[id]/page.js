"use client";
import { getAllProducts } from "@/app/api/api";
import Spinner from "@/app/components/Spinner";
import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import Rating from "react-rating";

function DisplayOutput({ text }) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br/>") }}
        />
    );
}

const ViewProduct = ({ params }) => {
    const { id } = params;
    const [loading, setLoading] = useState(true);

    const [ratingValue, setRatingValue] = useState(1);

    const [cbm, setCbm] = useState(1);
    const [temp, setTemp] = useState(1);
    const [qunatity, setQuantity] = useState(1);
    const [data, setData] = useState({});
    const [images, setImages] = useState([""]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const [img, setImg] = useState("");

    useEffect(function () {
        const getProduct = async () => {
            const prod = await getAllProducts(id, "", 1, 1);
            setImages(prod.data.images);
            setData(prod.data);
            setImg(prod.data.images[0]);
            setRatingValue(Math.ceil(prod.data.rating));
            let c = 1;
            prod.data.productDetails.forEach((detail, index) => {
                console.log(`Product Detail ${index + 1}:`, detail);
                c = c * detail.length * detail.height * detail.width;
            });
            setTemp(c);
            setCbm(c);
            setLoading(false);
        };

        getProduct();
    }, []);

    const handleQuantity = (e) => {
        if (e.target.value <= 0) {
            alert("Quantity Can not be 0 !");
            return;
        }
        setQuantity(e.target.value);
        setCbm(temp * e.target.value);
    };

    const handleHover = (image, index) => {
        setImg(image);
        setSelectedImageIndex(index);
    };

    const zoomProps = {
        width: 400,
        zoomWidth: 500,
        img: img,
        zoomPosition: "right",
    };
    const handleRating = (rate) => {
        console.log(rate);
        setRatingValue(rate);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex justify-center">
            <div>
                <div>
                    <div className="md:mx-28 m-4 flex md:flex-row flex-col gap-8">
                        <div className="w-auto  h-auto flex gap-4 items-start">
                            <div className="flex flex-col justify-start gap-3 ">
                                {/* Displaying the first image separately */}
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 transition-all ${
                                            index === selectedImageIndex
                                                ? "border-green-500"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt="Product Image"
                                            onMouseOver={() =>
                                                handleHover(image, index)
                                            }
                                            className=" object-cover w-[96px] border-transparent transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mx-4 bg-black border-2 border-green-600">
                                {/* <img src={img} alt="" /> */}
                                <ReactImageZoom {...zoomProps} />
                            </div>
                        </div>
                        <div className="">
                            <h2 className="text-3xl pb-4 font-semibold">
                                {data.item}
                            </h2>
                            <hr />
                            <div className="py-4 *:py-1 *:text-sm">
                                <p>
                                    <strong className="text-slate-950 ">
                                        Name:
                                    </strong>{" "}
                                    {data.item}
                                </p>
                                <p>
                                    <strong className="text-slate-950">
                                        Model:
                                    </strong>{" "}
                                    {data.model}
                                </p>
                                <p>
                                    <strong className="text-slate-950">
                                        Materials:
                                    </strong>{" "}
                                    {data.materials}
                                </p>

                                <p>
                                    <strong className="text-slate-950">
                                        Technique:
                                    </strong>{" "}
                                    {data.technique}
                                </p>
                                <p>
                                    <strong className="text-slate-950">
                                        Color:
                                    </strong>{" "}
                                    {data.color}
                                </p>
                                <p>
                                    <strong className="text-slate-950">
                                        FOB Price/Pcs:
                                    </strong>{" "}
                                    {data.pricePerPiece}
                                </p>
                              
                                <p>
                                    <strong className="text-slate-950">
                                        MOQ:
                                    </strong>{" "}
                                    {data.moq}
                                </p>
                             
                                {/* <p>
                                    <strong className="text-slate-950">
                                        Lead Time:
                                    </strong>{" "}
                                    {data.leadTime}
                                </p> */}
                                {/* <!-- ... other product details ... --> */}
                                <table className="border-2 border-gray-400 mt-3">
                                    <thead className="border-2 border-gray-400">
                                        <tr className="*:border-2 *:border-gray-400 *:p-2">
                                            <th>Details</th>
                                            <th>Quantity</th>
                                            <th>Total CBM</th>
                                            <th>Total Carton</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="*:border-2 *:border-gray-400 *:p-2 *:text-left">
                                            <td>
                                                <div>
                                                    <tr className="*:border-2 *:border-gray-400 *:p-2">
                                                        <th className="w-20">
                                                            Size
                                                        </th>
                                                        <th className="w-10">
                                                            L
                                                        </th>
                                                        <th className="w-10">
                                                            W
                                                        </th>
                                                        <th className="w-10">
                                                            H
                                                        </th>
                                                        <th className="w-10">
                                                            Weight
                                                        </th>
                                                    </tr>
                                                    {data.productDetails.map(
                                                        (detail, index) => (
                                                            <tr
                                                                key="index"
                                                                className="*:border-2 *:border-gray-400 *:p-2"
                                                            >
                                                                <td key={index}>
                                                                    {
                                                                        detail.productSize
                                                                    }{" "}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.length
                                                                    }
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.height
                                                                    }
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.width
                                                                    }
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.weight
                                                                    }
                                                                    gm
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="flex flex-col border-none gap-3">
                                                <input
                                                    type="number"
                                                    value={qunatity}
                                                    onChange={handleQuantity}
                                                    className="text-center text-xl border-2 border-gray-400 h-20 w-20 "
                                                />
                                            </td>
                                            <td>
                                                {cbm} cm<sup>3</sup>{" "}
                                            </td>
                                            <td>{qunatity}</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                                <div className="flex flex-col">
                                    <Rating
                                        initialRating={ratingValue}
                                        readonly
                                        onClick={handleRating}
                                        emptySymbol={
                                            <img
                                                src="/src/blackstar.png"
                                                className="icon"
                                                width={40}
                                                height={40}
                                            />
                                        }
                                        fullSymbol={
                                            <img
                                                src="/src/yellowstar.png"
                                                className="icon"
                                                width={40}
                                                height={40}
                                            />
                                        }
                                    />{" "}
                                    <strong className="text-slate-950">
                                        Rating: {data.rating}/5.0
                                    </strong>{" "}
                                </div>
                                <div className="flex gap-4 justify-left mt-4  ">
                                    <button
                                        type="button"
                                        className="bg-green-600 rounded-md w-40 hover:bg-green-500 text-white px-4 py-2  text-xs transition-all"
                                    >
                                        {" "}
                                        Add To Cart
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-green-950 rounded-md w-40 hover:bg-green-900 text-white px-4 py-2  text-xs transition-all"
                                    >
                                        Checkout
                                    </button>
                                </div>

                                <p className="bg-green-100 p-4 mt-3 rounded-sm h-8 text-center">
                                    <strong className="text-slate-950">
                                        Note:
                                    </strong>{" "}
                                    {data.remarks}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:mx-28 m-2">
                    <h1 className="border-2 rounded-t-lg w-min px-4 py-1 font-semibold text-gray-600 hover:cursor-pointer">
                        {" "}
                        DESCRIPTION
                    </h1>
                    <hr />
                    <div className="border-2 p-4">
                        <DisplayOutput text={data.description} />

                        {/* <p>DisplayOutput(text{data.description})</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
