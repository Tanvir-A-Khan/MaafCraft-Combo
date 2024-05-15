"use client";
import React from "react";

const InfoImage = (props) => {
  const { imageUrl, productName } = props;

  return (
    <div className=" md:w-[800px] w-[445px] h-[250px] ">
      <img
        src={imageUrl}
        alt={productName}
        className="object-cover rounded-lg hover:scale-105 transition-all h-full  w-full"
      />
    </div>
  );
};

export default InfoImage;
