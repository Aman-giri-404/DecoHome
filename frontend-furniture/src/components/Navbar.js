// Navbar.jsx

import React, { useEffect, useState } from "react";

import {
  Menu,
  Search,
  ShoppingCart,
  MapPin,
  User,
  Package,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // GET USER FROM LOCAL STORAGE
  useEffect(() => {

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }

  }, []);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    navigate("/sign-in");
  };

  // SEARCH
  const handleSearch = () => {

    console.log(search);

    // later connect with backend search
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">

      {/* TOP NAVBAR */}
      <div className="bg-[#131921] text-white px-4 py-3">

        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>

            {/* LOGO */}
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer">
                amazon
                <span className="text-orange-400">.in</span>
              </h1>
            </Link>

            {/* LOCATION */}
            <div className="hidden lg:flex items-center gap-1 hover:border border-white px-2 py-1 cursor-pointer">

              <MapPin size={18} />

              <div className="leading-tight">

                <p className="text-xs text-gray-300">
                  Delivering to Ahmedabad
                </p>

                <p className="text-sm font-bold">
                  Update location
                </p>

              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="flex flex-1 items-center max-w-3xl">

            <select
              className="hidden md:block bg-gray-200 text-black px-3 py-[11px] rounded-l-md outline-none border-r border-gray-400 text-sm"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Mobiles</option>
            </select>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-[10px] text-black outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-[#febd69] hover:bg-[#f3a847] px-5 py-[10px] rounded-r-md transition"
            >
              <Search className="text-black" size={22} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4">

            {/* USER */}
            <div className="hover:border border-white px-2 py-1 rounded cursor-pointer">

              {user ? (

                <div>

                  <p className="text-xs text-gray-300">
                    Hello, {user.name}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="text-sm font-bold"
                  >
                    Logout
                  </button>

                </div>

              ) : (

                <Link to="/sign-in">

                  <div className="flex items-center gap-2">

                    <User size={20} />

                    <div>
                      <p className="text-xs text-gray-300">
                        Hello, sign in
                      </p>

                      <p className="text-sm font-bold">
                        Account
                      </p>
                    </div>

                  </div>

                </Link>
              )}
            </div>

            {/* ORDERS */}
            <div className="hover:border border-white px-2 py-1 rounded cursor-pointer">

              <div className="flex items-center gap-2">

                <Package size={20} />

                <div>

                  <p className="text-xs text-gray-300">
                    Returns
                  </p>

                  <p className="text-sm font-bold">
                    Orders
                  </p>

                </div>
              </div>
            </div>

            {/* CART */}
            <Link to="/cart">

              <div className="flex items-center gap-2 hover:border border-white px-2 py-1 rounded cursor-pointer relative">

                <ShoppingCart size={32} />

                <span className="absolute top-0 left-5 text-orange-400 font-bold">
                  0
                </span>

                <span className="font-bold mt-2">
                  Cart
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* SECOND NAVBAR */}
      <div className="bg-[#232f3e] text-white px-4 py-2 hidden md:block">

        <div className="max-w-[1600px] mx-auto flex items-center gap-6 overflow-x-auto text-sm font-medium">

          <div className="flex items-center gap-1 cursor-pointer hover:text-orange-300">
            <Menu size={20} />
            <span>All</span>
          </div>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Fresh
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Bestsellers
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Mobiles
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Today's Deals
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Electronics
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Fashion
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Home & Kitchen
          </p>

          <p className="cursor-pointer hover:text-orange-300 whitespace-nowrap">
            Computers
          </p>

        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {
        menuOpen && (

          <div className="fixed inset-0 bg-black/50 z-50">

            <div className="bg-white w-72 h-full p-5">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-bold">
                  Menu
                </h2>

                <button onClick={() => setMenuOpen(false)}>
                  <X />
                </button>

              </div>

              <div className="flex flex-col gap-5 text-lg">

                <Link to="/">Home</Link>

                <Link to="/sign-in">Login</Link>

                <Link to="/sign-up">Register</Link>

                <Link to="/dashboard">Dashboard</Link>

              </div>
            </div>
          </div>
        )
      }
    </header>
  );
}