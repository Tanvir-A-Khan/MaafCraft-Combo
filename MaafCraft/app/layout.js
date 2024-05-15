"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer.js";
import HeaderTop from "./components/HeaderTop.js";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./Context/GlobalProvider";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const inter = Inter({ subsets: ["latin"] });

const metadata = {
    title: "Maafcraft.com",
    description: "Designed and created by Tanvir Ahmed Khan",
};

export default function RootLayout({ children }) {

    useEffect(()=>{
        const browserId = uuidv4();
        if(typeof localStorage.getItem("bid") === undefined || localStorage.getItem("bid") == null){
            localStorage.setItem("bid", browserId);
        }
        // console.log("bid: ");
        // console.log(localStorage.getItem("bid"));
    },[])

    return (
        <html lang="en">
            <body>
                <GlobalProvider>    
                    <HeaderTop />
                    <Navbar />
                    {children}
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
