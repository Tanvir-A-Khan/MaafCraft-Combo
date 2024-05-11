"use client";
import Spinner from "@/app/components/Spinner";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
function imageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
const dashboard = ["SLIDER", "DISCOUNT PRODUCTS", "MOST SELLING ITEMS", "TOP REVIEWD ITEMS"];

const AddProductForm = () => {
    const [loading, setLoading] = useState(false);
    const dataRef = {
        item: "",
        model: "",
        materials: "",
        productDetails: [
            {
                productSize: "",
                length: "",
                width: "",
                height: "",
                weight: "",
            },
        ],
        technique: "",
        color: "",
        remarks: "",
        moq: "",
        leadTime: "",
        description: "",
        images: [],
        pricePerPiece: "",
        rating: "",
        category: "",
        dashboardView: "",
    };
    const [formData, setFormData] = useState(dataRef);

    // Getting categories
    async function getData() {
        const res = await fetch(`${SERVER_URL}/products/get-all-categories`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        return res.json();
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cat = await getData();
                setCategories(cat.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDetailsChange = (index) => (e) => {
        const { name, value } = e.target;
        const newProductDetails = [...formData.productDetails];
        newProductDetails[index][name] = value;
        setFormData({ ...formData, productDetails: newProductDetails });
    };

    const handleAddProductDetails = () => {
        setFormData({
            ...formData,
            productDetails: [
                ...formData.productDetails,
                {
                    productSize: "",
                    length: 0,
                    width: 0,
                    height: 0,
                    weight: 0,
                },
            ],
        });
    };

    const handleImageChange = async (e, index) => {
        const newImages = [...formData.images];
        const image = e.target.files[0];
        const base64String = await imageToBase64(image);
        newImages[index] = base64String;
        setFormData({ ...formData, images: newImages });
    };

    const handleAddImageInput = () => {
        setFormData({
            ...formData,
            images: [...formData.images, ""],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        try {
            const res = await fetch(`${SERVER_URL}/products/add-new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to add product");
            } else {
                setFormData(dataRef);
                alert("Product Added Successfully");
            }

            console.log("Product added successfully");
        } catch (error) {
            console.error("Error adding product:", error);
        } finally{
            setLoading(false)
        }
    };

    if(loading){
        return <Spinner />
    }

    return (
        <div>
            <p className="font-semibold text-xl ps-4 uppercase ">
                Add New Product
            </p>
            <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-2 p-4">
                <div className="flex">
                {/* left section */}
                    <div>
                        <input
                            type="text"
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            placeholder="Item"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="developmentName"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="Model"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />

                        <input
                            type="text"
                            name="materials"
                            value={formData.materials}
                            onChange={handleChange}
                            placeholder="Materials"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />

                        {formData.productDetails.map((detail, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    name="productSize"
                                    value={detail.productSize}
                                    onChange={handleDetailsChange(index)}
                                    placeholder="Size"
                                    className="w-full mb-4 p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="length"
                                    value={detail.length}
                                    onChange={handleDetailsChange(index)}
                                    placeholder="L"
                                    className="w-full mb-4 p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="width"
                                    value={detail.width}
                                    onChange={handleDetailsChange(index)}
                                    placeholder="W"
                                    className="w-full mb-4 p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="height"
                                    value={detail.height}
                                    onChange={handleDetailsChange(index)}
                                    placeholder="H"
                                    className="w-full mb-4 p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="weight"
                                    value={detail.weight}
                                    onChange={handleDetailsChange(index)}
                                    placeholder="Weight"
                                    className="w-full mb-4 p-2 border rounded"
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddProductDetails}
                            className="w-full bg-blue-500 text-white p-2 rounded"
                        >
                            Add More Details
                        </button>

                        <input
                            type="text"
                            name="technique"
                            value={formData.technique}
                            onChange={handleChange}
                            placeholder="Technique"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        <label htmlFor="Category"> Category: </label>
                        <select
                            name="category"
                            id="category"
                            onChange={handleChange}
                            className="bg-slate-200 p-1 rounded-md"
                        >
                            {categories.map((category, index) => (
                                <option value={category} key={index}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label htmlFor="Dashboard"> Dashboard View: </label>
                        <select
                            name="dashboardView"
                            id="dashboardView"
                            onChange={handleChange}
                            className="bg-slate-200 p-1 rounded-md"
                        >
                            {dashboard.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* right section */}
                    <div className="w-[40%]">
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            placeholder="Color"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="pricePerPiece"
                            value={formData.pricePerPiece}
                            onChange={handleChange}
                            placeholder="FOB Price Per Piece"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Remarks"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="moq"
                            value={formData.moq}
                            onChange={handleChange}
                            placeholder="Minimum Order Quantity"
                            className="w-full mb-4 p-2 border rounded"
                            required
                        />
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex mb-4">
                                <input
                                    type="file"
                                    name={`image-${index}`}
                                    onChange={(e) =>
                                        handleImageChange(e, index)
                                    }
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImageInput}
                            className="w-full bg-blue-500 text-white p-2 rounded"
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                <div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full mb-4 p-2 border rounded"
                        required
                        rows="4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Add Product
                    </button>
                </div>
            </form>

            
        </div>
    );
};

export default AddProductForm;
