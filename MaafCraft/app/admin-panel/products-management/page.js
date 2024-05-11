"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { getAllProducts } from "@/app/api/api";

const TABLE_HEAD = [
    "Item",
    "Images",
    "Model",
    "Materials",
    "Size",
    "Technique",
    "Color",
    "Price$",
    "Remarks",
    "MOQ",
    "Description",
];

const ProductManagement = () => {
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllProducts();
                if (response.result) {
                    setTableRows(response.data.data);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="">
            <h1 className="text-xl text-center my-4 uppercase font-bold mb-2">
                Product Management
            </h1>
            <Link
                href="/admin-panel/products-management/add-new"
                className="bg-green-600 p-2 mb-2 rounded-lg text-white text-xs font-semibold"
            >
                Add Product
            </Link>

            <Card className="h-full w-[100%] ">
                <h1 className="text-xl w-full text-center my-4 uppercase font-bold mb-8">
                    All products
                </h1>
                <table className="w-[100%]  text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={index}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, index) => (
                            <tr key={index}>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.item}
                                    </Typography>
                                </td>
                                <td className="p-4 bg-blue-gray-50/50">
                                    <div className="flex">

                                  {row.images.map((img, index)=>(
               
                                      <img src={img} alt="image" width="85" height="auto" key={index} />
                                      
                                    ))}
                                    </div>
                                </td>
                                <td className="p-4 bg-blue-gray-50/50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.model}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.materials}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.productDetails &&
                                            row.productDetails
                                                .map(
                                                    (
                                                        {
                                                            length,
                                                            width,
                                                            height,
                                                            weight,
                                                        },
                                                        index
                                                    ) =>
                                                        `${length}x${width}x${height} ${weight}g`
                                                )
                                                .join(", ")}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.technique}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.color}
                                    </Typography>
                                </td>
                                <td className="p-4 bg-blue-gray-50/50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        ${row.pricePerPiece}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.remarks}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.moq}
                                    </Typography>
                                </td>
                               
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {row.description}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <div className="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">
              Silver
            </td>
            <td className="px-6 py-4">
              Laptop
            </td>
            <td className="px-6 py-4">
              $2999
            </td>
            <td className="px-6 py-4">
              <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
            </td>
          </tr>
          {/* Other table rows */}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-semibold">1-10</span> of <span className="font-semibold">1000</span></span>
        <ul className="flex space-x-px rtl:space-x-reverse text-sm">
          {/* Pagination links */}
        </ul>
      </nav>
    </div>
        </div>
    );
};

export default ProductManagement;
