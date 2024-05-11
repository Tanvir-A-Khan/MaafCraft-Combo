import MostSellItems from "./components/MostSellItems.js";
import LandingMain from "./components/LandingMain.js";
import OurService from "./components/OurService.js";


export default function Home() {
    return (
        <main className="bg-[#EFEFEF] h-auto">
            <div className="md:mx-28 mx-2 py-6">
                <div>
                    <LandingMain/>
                </div>
                <div className="h-72">
                    <MostSellItems/>
                </div>

                <div className="h-auto">
                    <OurService/>
                </div>

            </div>
        </main>
    );
}
