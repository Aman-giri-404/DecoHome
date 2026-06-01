import React, { useEffect, useState } from "react";

import {
  Heart,
  ShoppingBag,
  User,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    toast.success("Logout successfully");
  };

  return (
    <>
      <div className="w-full shadow-sm border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 md:px-10 py-4">
          <ToastContainer position="bottom-right" autoClose={2000} />

          <div className="flex items-center gap-6">
            <button className="lg:hidden" onClick={() => setMobileMenu(true)}>
              <Menu size={28} />
            </button>

            <h1 className="text-4xl font-extrabold text-pink-500 cursor-pointer">
              M
            </h1>

            <ul className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-800">
              <li className="cursor-pointer hover:text-pink-500">TABLE</li>

              <li className="cursor-pointer hover:text-pink-500">CHAIR</li>

              <li className="cursor-pointer hover:text-pink-500">BEDS</li>

              <li className="cursor-pointer hover:text-pink-500">
                OFFICE DESK
              </li>

              <li className="cursor-pointer hover:text-pink-500">DINNING</li>

              <li className="cursor-pointer hover:text-pink-500 flex items-center gap-1">
                LATEST MODEL
                <span className="text-red-500 text-[10px] font-bold">NEW</span>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md w-[35%]">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="bg-transparent outline-none px-3 w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-5 md:gap-8">
            <div
              className="relative"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <div className="flex flex-col items-center cursor-pointer text-sm font-medium">
                <User size={20} />

                <span className="hidden md:block">
                  {user ? user.name : "Profile"}
                </span>
              </div>

              {showProfile && (
                <div className="absolute right-0 top-12 w-72 bg-white shadow-xl border rounded-sm p-5">
                  {user ? (
                    <>
                      <h2 className="font-bold text-gray-800 text-lg">
                        Welcome {user.name}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">{user.email}</p>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 mt-4 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold text-gray-800 text-lg">
                        Welcome
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        To access account and manage orders
                      </p>

                      <Link to="/sign-in">
                        <button className="border border-pink-500 text-pink-500 font-bold px-5 py-2 mt-4 hover:bg-pink-50 transition">
                          LOGIN / SIGNUP
                        </button>
                      </Link>
                    </>
                  )}

                  <div className="border-t my-4"></div>

                  <div className="flex flex-col gap-2 text-sm text-gray-700">
                    <p className="hover:text-pink-500 cursor-pointer">Orders</p>

                    <p className="hover:text-pink-500 cursor-pointer">
                      Wishlist
                    </p>

                    <p className="hover:text-pink-500 cursor-pointer">
                      Gift Cards
                    </p>

                    <p className="hover:text-pink-500 cursor-pointer">
                      Contact Us
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center cursor-pointer text-sm font-medium">
              <Heart size={20} />

              <span className="hidden md:block">Wishlist</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer text-sm font-medium">
              <ShoppingBag size={20} />

              <span className="hidden md:block">Bag</span>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-3 w-full text-sm"
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[100] shadow-xl transform transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h1 className="text-3xl font-bold text-pink-500">MENU</h1>

          <button onClick={() => setMobileMenu(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-5 text-gray-800 font-medium">
          <p className="hover:text-pink-500 cursor-pointer">TABLE</p>

          <p className="hover:text-pink-500 cursor-pointer">CHAIR</p>

          <p className="hover:text-pink-500 cursor-pointer">BEDS</p>

          <p className="hover:text-pink-500 cursor-pointer">OFFICE DESK</p>

          <p className="hover:text-pink-500 cursor-pointer">DINNING</p>

          <p className="hover:text-pink-500 cursor-pointer">LATEST MODEL</p>

          <div className="border-t pt-5">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded w-full"
              >
                Logout
              </button>
            ) : (
              <Link to="/sign-in">
                <button className="border border-pink-500 text-pink-500 px-5 py-2 rounded w-full">
                  LOGIN / SIGNUP
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-50"
        ></div>
      )}
    </>
  );
}
