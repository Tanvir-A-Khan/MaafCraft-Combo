"use client"
import { Gallery } from "next-gallery"
import { useEffect, useState } from "react"
import { getGalleryImages } from "../api/api"
import Spinner from "../components/Spinner"
import Link from "next/link"

// const images = [
//     { src: "/products/1.jpg", aspect_ratio: 5/3 },
//     { src: "/products/2.jpg", aspect_ratio: 4/3 },
//     { src: "/products/3.jpg", aspect_ratio: 4/3 },
//     { src: "/products/4.png", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 5/3 },
//     { src: "/products/6.png", aspect_ratio: 4/3 }
// ]
const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]
const className = "border-4 border-black"

export default function MyGallery() {

    const [images, setImages] = useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(()=>{
        const getData = async()=>{
            const res = await getGalleryImages();
            setImages(res.data);
            console.log(res.data);
            setLoading(false)
        }
        getData();
    },[])

    if(loading){
        return <Spinner />
    }

    return (
        <div className="mx-2 lg:mx-28 bg-slate-200 my-2 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {images.map((data, index) => (
        <Link href={"/products/" + data.productName} key={index}>
            <img
                src={data.src}
                alt={data.productName}
                className="w-full h-auto object-cover"
            />
        </Link>
    ))}
</div>

    )
}