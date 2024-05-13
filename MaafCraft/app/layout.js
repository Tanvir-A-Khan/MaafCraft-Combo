import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer.js";
import HeaderTop from "./components/HeaderTop.js";
import Navbar from "./components/Navbar";
import { StateProvider } from "./Context/AppContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Maafcraft.com",
    description: "Designed and created by Tanvir Ahmed Khan",
};

export default function RootLayout({ children }) {
    return (
        <StateProvider>
            <html lang="en">
                <body>
                    <HeaderTop />
                    <Navbar></Navbar>
                    {children}
                    <Footer />
                </body>
            </html>
        </StateProvider> 
    );
}