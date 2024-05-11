"use client";
import React, { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import Spinner from "../components/Spinner";

const ViewProduct = () => {
  const [q, setQ] = useState(0);
  const [data, setData] = useState({
    item: "Seagrass Laundry Basket",
    development_name: "Mysuru",
    development_no: "HT24-HD-009",
    materials: "Seagrass Laundry & Metal Frame Cotton Liner",
    weight: "3126 ",
    size: "D-45xB40x66 ",
    technique: "Hand Weave",
    color: "Natural & Black",
    FOB_price_per_pcs: "$$$$",
    remarks: "There will be a remarks line",
    moq: "500 Pcs/Style(1x20Ft mixed article)",
    lead_time: "10 WK's from the date of payment confirmation",
    description:
      " This is the descripiton of the product including all the information about authenticity do's and dont's ",
  });
  //   const [data, setData] = useState({
  //     title: "Jute Product",
  //     art_no: "1235612342435",
  //     dimension: "15inch X 12inch x6inch",
  //     material: "100% Jute Fabric",
  //     unit: "1 set unit",
  //     packing: "1 Set per Carton",
  //     cartoon_size: "1x1x1cm",
  //     item_size: "38x30x16",
  //     cbm_per_cartoon: "5000",
  //     quantity: q,
  //     description:
  //       " This is the descripiton of the product including all the information",
  //   });
  const images = [
    "./products/1.jpg",
    "./products/2.jpg",
    "./products/3.jpg",
    "./products/4.png",
    "./products/5.jpg",
    "./products/6.png",
  ];
  const [img, setImg] = useState(images[0]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleHover = (image, index) => {
    setImg(image);
    setSelectedImageIndex(index);
  };

  const zoomProps = {
    width: 600,
    zoomWidth: 600,
    img: img,
    zoomPosition: "original ",
  };
  if (loading) {
    return <Spinner />
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
                      index === selectedImageIndex ? "border-green-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt="Product Image"
                      onMouseOver={() => handleHover(image, index)}
                      className=" object-cover w-[96px] border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="mx-4">
                {/* <img src={img} alt="" /> */}
                <ReactImageZoom {...zoomProps} />
              </div>
            </div>
            <div className="">
              <h2 className="text-3xl pb-4 font-semibold">{data.item}</h2>
              <hr />
              <div className="py-4 *:py-1 *:text-xs">
                <p>
                  <strong className="text-slate-950 ">Item:</strong> {data.item}
                </p>
                <p>
                  <strong className="text-slate-950">Development Name:</strong>{" "}
                  {data.development_name}
                </p>
                <p>
                  <strong className="text-slate-950">Development No:</strong>{" "}
                  {data.development_no}
                </p>
                <p>
                  <strong className="text-slate-950">Materials:</strong>{" "}
                  {data.materials}
                </p>
                <p>
                  <strong className="text-slate-950">Weight:</strong>{" "}
                  {data.weight}
                </p>
                <p>
                  <strong className="text-slate-950">Size:</strong> {data.size}
                </p>
                <p>
                  <strong className="text-slate-950">Technique:</strong>{" "}
                  {data.technique}
                </p>
                <p>
                  <strong className="text-slate-950">color:</strong>{" "}
                  {data.color}
                </p>
                <p>
                  <strong className="text-slate-950">FOB Price/Pcs:</strong>{" "}
                  {data.FOB_price_per_pcs}
                </p>
                <p>
                  <strong className="text-slate-950">Remarks:</strong>{" "}
                  {data.remarks}
                </p>
                <p>
                  <strong className="text-slate-950">MOQ:</strong> {data.moq}
                </p>
                <p>
                  <strong className="text-slate-950">Lead Time:</strong>{" "}
                  {data.lead_time}
                </p>
                {/* <!-- ... other product details ... --> */}
                <table className="border-2 border-gray-400 mt-3">
                  <thead className="border-2 border-gray-400">
                    <tr className="*:border-2 *:border-gray-400 *:p-2">
                      <th>Items Size</th>
                      <th>Quantity</th>
                      <th>Total CBM</th>
                      <th>Total Carton</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="*:border-2 *:border-gray-400 *:p-2 *:text-right">
                      <td>{data.item_size}</td>
                      <td className="flex flex-col border-none gap-3">
                        <input
                          type="number"
                          onChange={(e) => setQ(e.target.value)}
                          className="text-right border-2 border-gray-400"
                        />
                        <button
                          type="button"
                          className="bg-green-800 rounded-md hover:bg-green-600 text-white px-4 py-2 text-xs transition-all"
                        >
                          Add Quantity
                        </button>
                      </td>
                      <td>{q}</td>
                      <td>1000</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
                <div className="flex gap-4 justify-left mt-4  ">
                  <button
                    type="button"
                    className="bg-green-800 rounded-md w-40 hover:bg-green-600 text-white px-4 py-2  text-xs transition-all"
                  >
                    {" "}
                    Add To Cart
                  </button>
                  <button
                    type="button"
                    className="bg-green-800 rounded-md w-40 hover:bg-green-600 text-white px-4 py-2  text-xs transition-all"
                  >
                    Checkout
                  </button>
                </div>
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
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
