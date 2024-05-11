import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faLinkedin,
    faInstagram,
    faCcMastercard,
    faCcVisa,
    faPaypal,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import {
    faLock,
    faShield,
    faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
    return (
        <div>
            <div className="flex md:flex-row flex-col justify-between md:px-28 px-10 py-12 *:text-xs bg-gray-300">
                <div className="flex flex-col gap-12 md:w-1/4">
                    <div className="*:mb-2 *:leading-4">
                        <h3 className="text-green-600 py-2 lowercase text-sm md:text-3xl font-semibold h-auto ">
                            maafcraft{"🍃"} 
                        </h3>
                        <h1 className="font-bold text-[14px] my-2">
                            CONTACT DETAILS
                        </h1>
                        <p>
                            Factory: South Debipur (Ranigonj), Ghoraghat,
                            Dinajpur, Bangladesh
                        </p>
                        <p>
                            Head office: Plot #111 (8th Floor), Road #13
                            (Ranavola Avenue), Sector #10, Uttara Model Town,
                            Bangladesh.{" "}
                        </p>
                    </div>
                    <div>
                        <h1 className="font-bold text-[14px] my-2">
                            WE ARE USING SAFE PAYMENTS:
                        </h1>
                        <ul className="flex justify-start gap-6 *:w-10 *:text-4xl">
                            <FontAwesomeIcon
                                icon={faCcMastercard}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faCcVisa}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faPaypal}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-12 *:mb-2">
                    <div>
                        <h1 className="font-bold text-[14px] my-2">HOT LINE</h1>
                        <p>Call Us for any query</p>
                        <p className="text-2xl font-bold text-[#ff2832]">
                            +88 01942 257473
                        </p>
                    </div>

                    <div>
                        <h1 className="font-bold text-[14px] my-2">
                            SOCIAL NETWORK
                        </h1>
                        <ul className="flex justify-start gap-3 *:w-6 *:text-2xl">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                            <FontAwesomeIcon
                                icon={faWhatsapp}
                                className="hover:cursor-pointer hover:text-green-700 transition-colors"
                            />
                        </ul>
                    </div>
                </div>

                <div className="*:mb-2 flex flex-col">
                    <h1 className="font-bold text-[14px] my-2 ">MY ACCOUNT</h1>

                    <Link href="/registration">Register</Link>
                </div>
                <div className="*:mb-2">
                    <h1 className="font-bold text-[14px] my-2">INFORMATION</h1>
                    <p>Site: maafcraft.com</p>
                    <p>Email: maafcraftbd@gmail.com</p>
                </div>
            </div>

            {/* LAST PORTION  */}
            <div className="bg-gray-800 m-0 text-white flex justify-between p-4 *:text-xs md:px-28 px-10 *:uppercase items-center">
                <span>
                    Copyright © 2024 Maafcraft.com - All rights reserved
                </span>
                {/* <ul className="hidden md:flex divide-x-2 *:mx-0 divide-solid divide-[#555555] *:px-[11px]  *:text-[12px]  ">
                    <li>About us</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Return Policy</li>
                </ul> */}
                <span>@Bangladesh</span>
            </div>
        </div>
    );
};

export default Footer;
