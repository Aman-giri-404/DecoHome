// Navbar.jsx

import React from "react";
import { MapPin } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg">
      <div className="  flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center cursor-pointer">
          <h1 className="text-4xl font-bold tracking-wide ">
            amazon<span className="text-orange-400 text-sm">.in</span>
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-1 hover:border border-white px-2 py-1 cursor-pointer">
          <MapPin size={18} />
          <div className="leading-tight">
            <p className="text-xs text-gray-300">Delivering to Ahmedabad</p>
            <p className="text-sm font-bold">Update location</p>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-72 px-4 py-2 rounded-l-lg text-black outline-none"
          />

          <button className="bg-sky-500 hover:bg-sky-600 px-5 py-2 rounded-r-lg font-semibold transition duration-300">
            Search
          </button>
        </div>

        <ul className="flex gap-6 text-lg font-medium">
          <li className="hover:text-sky-400 cursor-pointer transition">Home</li>

          <li className="hover:text-sky-400 cursor-pointer transition">
            About
          </li>

          <li className="hover:text-sky-400 cursor-pointer transition">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
}
