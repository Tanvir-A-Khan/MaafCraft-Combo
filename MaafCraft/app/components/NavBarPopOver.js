import React from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  faHome,
  faBars,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTop from "./HeaderTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchSection from "./SearchSection";

const NavBarPopOver = () => {
  return (
    <div>
      <div className="flex justify-between md:px-28 lg:hidden  bg-slate-200 h-14">
        {/* Hidden Navbar */}
        <div className="lg:hidden flex items-center  ">
              <img
                src="/logo.jpg"
                alt="logo"
                className=" ps-2 h-10  w-auto"
              />
            <SearchSection />
          
        </div>

        <Popover
          animate={{
            mount: { scale: 1.7, y: 120, x: -80 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <PopoverHandler>
            <Button className="text-3xl text-slate-900 mr-4 lg:hidden  hover:cursor-pointer ">
              {" "}
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-50 bg-slate-50 w-56 m-auto ">
            <ul className="z-50 *:rounded-md *:p-1 ">
              {/* Add FontAwesome icon to the first list item */}
              <Link
                href="/"
                className="hover:bg-[#555555] duration-300 hover:cursor-pointer text-white"
              >
                <li>
                  <FontAwesomeIcon
                    icon={faHome}
                    className="text-black text-xl "
                  />
                </li>
              </Link>
              <Link
                href={"/"}
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                                flex items-center ${
                                  usePathname() === "/products"
                                    ? "bg-[#2e2e2e] text-white "
                                    : null
                                }`}
              >
                Cart
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-back  hover:cursor-pointer text-xs "
                />
              </Link>
              <Link
                href="/products"
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/products"
                                ? "bg-[#2e2e2e] text-white "
                                : null
                            }`}
              >
                <li>All Products</li>
              </Link>
              <Link
                href="/about"
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/about"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>About</li>
              </Link>
              <Link
                href="/certification"
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/certification"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Certification</li>
              </Link>
              <Link
                href="/license"
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/license"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Legal License</li>
              </Link>

              <Link
                href={"/membership"}
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/membership"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Membership</li>
              </Link>
              <Link
                href={"/material-info"}
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/material-info"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Materials Info</li>
              </Link>
              <Link
                href={"/gallery"}
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/gallery"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Gallery</li>
              </Link>
              <Link
                href={"/contact"}
                className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/contact"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Contact</li>
              </Link>
              <Link
                href={"/admin-panel"}
                className={`bg-red-500 hover:bg-red-700 duration-300 hover:cursor-pointer h-[100%] 
                            flex items-center ${
                              usePathname() === "/admin-panel"
                                ? "bg-[#2e2e2e] text-white"
                                : null
                            }`}
              >
                <li>Admin Panel</li>
              </Link>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavBarPopOver;
