"use client";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const License = () => {
    return (
        <div className="md:mx-28 h-auto">
            <h1 className="text-3xl text-center my-4 uppercase font-bold mb-8">
                Legal License
            </h1>

            <h1 className="text-center text-xl font-semibold text-blue-800 m-4">
                Your trust is our priority. We are committed to transparency and
                integrity in all our practices
            </h1>
            <div className="flex md:flex-row flex-col items-center flex-wrap md:justify-start bg-slate-50">
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/1.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>

                    {/* <img
                        src="/license/1.jpg"
                        alt="License 1"
                        className="w-56 h-72 hover:scale-105 transition-all "
                    /> */}
                    <h1 className="text-xl font-semibold text-center">
                        License 1
                    </h1>
                </div>
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/2.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 2
                    </h1>
                </div>

                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/3.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 3
                    </h1>
                </div>
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/4.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 4
                    </h1>
                </div>
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/5.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 5
                    </h1>
                </div>
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/6.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 6
                    </h1>
                </div>
                <div className="w-56 h-auto m-2">
                    <Zoom>
                        <img
                            alt="Lisence"
                            src="/license/7.jpg"
                            className="w-56 h-72 hover:scale-105 transition-all "
                        />
                    </Zoom>
                    <h1 className="text-xl font-semibold text-center">
                        License 7
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default License;
