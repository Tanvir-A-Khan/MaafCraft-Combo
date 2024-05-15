"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import AllCategories from "../components/AllCategories";
import Spinner from "../components/Spinner";
import { getAllProducts } from "../api/api";
import Product from "../components/Product";
import { usePathname } from "next/navigation";

const AllProductCat = () => {
    const pathname = usePathname()
    // const router = useRouter();
    console.log(pathname);

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            const productsResponse = await getAllProducts();
            setProducts(productsResponse?.data?.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading || !products) {
        return <Spinner />
        
    }

    return (
        <div className="flex md:mx-28 mx-4 my-3 justify-start gap-5">
            <div className="lg:block hidden bg-slate-50">
                <AllCategories />
            </div>
                
            <div>
                <h1 className=" text-xs font-semibold pb-2"> {"🖇️"} {pathname} </h1>

            <div className="px-auto flex flex-wrap md:justify-start justify-center gap-5">
                {products.map((data, index) => (
                    <Link href={`/products/${data.item}`} key={index}>
                        <Product
                            imageUrl={data.images[0]}
                            productName={data.item}
                            price={data.pricePerPiece}
                            rating={data.rating}
                            />
                    </Link>
                ))}
            </div>
            
                </div>
        </div>
    );
};

export default AllProductCat;
