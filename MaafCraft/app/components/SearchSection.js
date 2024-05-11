"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const SearchSection = () => {
  return (
    <div className="flex-col flex lg:flex-row lg:mx-28 h-auto m-4 gap-3 items-center justify-center w-auto ">
      <div className="hidden lg:flex justify-center gap-5 mb-3 lg:min-w-32 min-w-max hover:cursor-pointer">
        <img src="/logo.jpg" alt="logo" className="h-8 lg:h-14  max-w-48" />
      </div>

      <div className="flex justify-between h-10 border-2 border-green-600 ">
        <input
          type="text"
          placeholder="Search"
          className="ps-6  w-[100%] lg:w-[20rem]"
        />

        <select
          name="language"
          id="language"
          className="bg-gray-200 text-gray-500 w-2/5 text-[13px] hidden lg:block"
        >
          <option>All Categories</option>
          <option>Jute</option>
          <option>Cloth</option>
          <option>Craft</option>
        </select>

        <div>
          <FontAwesomeIcon
            icon={faSearch}
            className="text-3xl p-1 px-3 text-white bg-green-600 hover:cursor-pointer hover:bg-green-800 tansition-all"
          />
        </div>
      </div>

      <div className="justify-center items-center h-12 mb-5    hidden lg:flex">
        <div>
          <h1 className="font-semibold hover:cursor-pointer hidden lg:block">
            CART
          </h1>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-back w-10 hover:cursor-pointer"
          />
        </div>
        <p className="bg-green-600 h-6 rounded-lg items-center ms-1 mt-5 p-1 text-white font-semibold text-xs hover:cursor-pointer">
          {" "}
          0 Items
        </p>
      </div>
    </div>
  );
};

export default SearchSection;
