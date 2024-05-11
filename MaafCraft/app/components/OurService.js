import {
    faBuilding,
    faCloud,
    faEarthAmericas,
    faHandshake,
    faLanguage,
    faMoneyBill,
    faPersonDress,
    faTrophy,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OurService = () => {
    return (
        <div className="bg-[#444444]">
            <h1 className="text-3xl text-center uppercase font-bold text-white pt-4">Our Service
            <p className="text-white text-xs pt-3 font-light">Providing the best service</p>
            </h1>
            <div className="grid  grid-cols-3 *:m-auto p-4 gap-4 my-4 py-10 *:transition-all">
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faTrophy}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10 "
                    />
                    <p className="text-gray-200 text-xs font-light" >5+ years of experience</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faEarthAmericas}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10 "
                    />
                    <p className="text-gray-200 text-xs font-light">Sourcing globally</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faCloud}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">Cost savings up to 70%</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faHandshake}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">The combined experience of over 8 years in sourcing</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">Sourced over 1,000 products. Shipped over 500 containers</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faPersonDress}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">40. all team, strategically located across the globe</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">Saved our customers over USD 30M</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faLanguage}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">We speak over 5 languages</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <FontAwesomeIcon
                        icon={faBuilding}
                        className="text-white text-4xl  p-6 rounded-[50%] bg-green-400 hover:bg-gray-500 w-10"
                    />
                    <p className="text-gray-200 text-xs font-light">Office in Bangladesh</p>
                </div>
            </div>
        </div>
    );
};

export default OurService;
