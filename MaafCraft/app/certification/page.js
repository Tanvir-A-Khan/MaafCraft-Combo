import React from "react";

const Certification = () => {
    return (
        <div className="md:mx-28 mx-2">
            <h1 className="text-3xl text-center my-4 uppercase font-bold mb-8">
                Certification
            </h1>

            <div className="flex-col justify-center gap-10 flex-wrap my-8 items-center md:flex-row flex">
                <div>
                    <img
                        className="h-36 hover:scale-105 transition-all w-36 rounded-t-lg object-cover md:rounded-none md:rounded-lg"
                        src="/certification/1.png"
                        alt="Certification 1"
                    />
                    <div className="w-36">
                        <h1 className="text-xl font-semibold">Certification</h1>
                        <p className="text-xs">
                            Details of the certification and other stuff
                        </p>
                    </div>
                </div>
                <div>
                    <img
                        className="h-36 hover:scale-105 transition-all w-36 rounded-t-lg object-cover md:rounded-none md:rounded-l-lg"
                        src="/certification/2.png"
                        alt="Certification 2"
                    />
                    <div className="w-36">
                        <h1 className="text-xl font-semibold">Certification</h1>
                        <p className="text-xs">
                            Details of the certification and other stuff
                        </p>
                    </div>
                </div>
                <div>
                    <img
                        className="h-36 hover:scale-105 transition-all w-36 rounded-t-lg object-cover md:rounded-none md:rounded-l-lg"
                        src="/certification/3.png"
                        alt="Certification 3"
                    />
                    <div className="w-36">
                        <h1 className="text-xl font-semibold">Certification</h1>
                        <p className="text-xs">
                            Details of the certification and other stuff
                        </p>
                    </div>
                </div>
                <div>
                    <img
                        className="h-36 hover:scale-105 transition-all w-36 rounded-t-lg object-cover md:rounded-none md:rounded-l-lg"
                        src="/certification/4.png"
                        alt="Certification 4"
                    />
                    <div className="w-36">
                        <h1 className="text-xl font-semibold">Certification</h1>
                        <p className="text-xs">
                            Details of the certification and other stuff
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certification;
