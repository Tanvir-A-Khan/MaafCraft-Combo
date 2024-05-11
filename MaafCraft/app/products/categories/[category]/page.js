"use client";
import { getAllProducts, getAllProductsOfCategory } from "@/app/api/api";
import AllCategories from "@/app/components/AllCategories";
import Product from "@/app/components/Product";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllProduct = ({ params }) => {
    const { category } = params;
    const [success, setSuccess] = useState(false);
    const pathname = usePathname();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productsResponse = await getAllProductsOfCategory(
                    category,
                    page,
                    perPage
                );
                setSuccess(productsResponse.result);
                setProducts(productsResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }
    if (!success) {
        return <div>No product found</div>;
    }

    return (
        <div className="flex md:mx-28 mx-4 my-3 justify-start gap-5">
            <div className="lg:block hidden bg-slate-50">
                <AllCategories />
            </div>
            <div>
                <h1 className=" text-xs font-semibold pb-2">
                    {" "}
                    {"🖇️"} {pathname}{" "}
                </h1>
                <div className="px-auto flex flex-wrap md:justify-start justify-center gap-5">
                    {products.map((data, index) => (
                        <Link href={`/products/${data.item}`} key={index}>
                            <Product
                                imageUrl={data.images[0]}
                                productName={data.item}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
