import { Gallery } from "next-gallery"

const images = [
    { src: "/products/1.jpg", aspect_ratio: 5/3 },
    { src: "/products/2.jpg", aspect_ratio: 4/3 },
    { src: "/products/3.jpg", aspect_ratio: 4/3 },
    { src: "/products/4.png", aspect_ratio: 4/3 },
    { src: "/products/5.jpg", aspect_ratio: 4/3 },
    { src: "/products/5.jpg", aspect_ratio: 4/3 },
    { src: "/products/5.jpg", aspect_ratio: 4/3 },
    { src: "/products/5.jpg", aspect_ratio: 5/3 },
    { src: "/products/6.png", aspect_ratio: 4/3 }
]
const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]
const className = "border-4 border-black"

export default function MyGallery() {
    return (
        <div className="mx-2 lg:mx-28 bg-slate-200 my-2 ">

            <Gallery {...{images, widths, ratios,className}} />
        </div>
    )
}