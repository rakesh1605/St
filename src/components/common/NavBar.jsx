import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ProfileDropdown from "../Auth/ProfileDropdown";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  // clg("total item",totalItems)
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [sublinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublink result", result.data.data);
      setSublinks(result.data.data);
    } catch (error) {
      console.error("Could not fetch the category list:", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700 bg-richblack-900">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} width={160} height={42} alt="logo" loading="lazy" />
        </Link>

        {/* Navbar Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-200">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 cursor-pointer">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}

                {/* Dropdown */}
                {link.title === "Catalog" && (
                  <div className="invisible absolute left-0 top-full mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 w-[180px] shadow-lg z-50">
                    {/* Dropdown arrow */}
                    <div className="absolute left-8 top-0 h-4 w-4 rotate-45 bg-richblack-5 -translate-y-1/2"></div>

                    {sublinks.length > 0 ? (
                      sublinks.map((subLink) => (
                        <Link
                          to={`/catalog/${subLink.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          key={subLink._id}
                          className="hover:text-caribbeangreen-600 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-richblack-100 text-richblack-600"
                        >
                          {subLink.name}
                        </Link>
                      ))
                    ) : (
                      <div className="text-caribbeangreen-900 py-2 px-3">
                        Loading categories...
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right-side (Login, Signup, Cart, Profile) */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
             <Link to="/dashboard/cart" className="relative">
             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
             {totalItems > 0 && (
               <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                 {totalItems}
               </span>
             )}
           </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
