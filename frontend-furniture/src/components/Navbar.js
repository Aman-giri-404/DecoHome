import React, { useEffect, useState } from "react";

import {
  Menu,
  Search,
  MapPin,
  User,
  Package,
  X,
  Handbag,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

 
  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    navigate("/sign-in");
  };

 
  const handleSearch = () => {
    console.log(search);

  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      <div className="bg-[#131921] text-white px-4 py-3 ">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
    
          <div className="flex items-center gap-4">
            {/* MOBILE MENU */}
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={28} />
            </button>

          
            <Link to="/">
              <h1 className="text-4xl md:text-3xl font-bold tracking-wide cursor-pointer">
                amazon
                <span className="text-orange-400 text-sm">.in</span>
              </h1>
            </Link>

       
            <div className="hidden lg:flex items-center gap-1 hover:border border-white px-2 py-1 cursor-pointer">
              <MapPin size={18} />

              <div className="leading-tight">
                <p className="text-xs text-gray-300">Delivering to Ahmedabad</p>

                <p className="text-sm font-bold">Update location</p>
              </div>
            </div>
          </div>

        
          <div className="flex flex-1 items-center max-w-3xl">
            <select className="hidden md:block bg-gray-200 text-black px-3 py-[11px] rounded-l-md outline-none border-r border-gray-400 text-sm">
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

       
          <div className="hidden md:flex items-center gap-4">
          
            <div className="hover:border border-white px-2 py-1 rounded cursor-pointer">
              {user ? (
                <div>
                  <p className="text-xs text-gray-300">Hello, {user.name}</p>

                  <button onClick={handleLogout} className="text-sm font-bold">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/sign-in">
                  <div className="flex items-center gap-2">
                    <User size={20} />

                    <div>
                      <p className="text-xs text-gray-300">Hello, sign in</p>

                      <p className="text-sm font-bold">Account & Lists</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            
            <div className="hover:border border-white px-2 py-1 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <Package size={20} />

                <div>
                  <p className="text-xs text-gray-300">Returns</p>

                  <p className="text-sm font-bold">Orders</p>
                </div>
              </div>
            </div>

          
            <Link to="/">
              <div className="flex items-center gap-2 hover:border border-white px-2 py-1 rounded cursor-pointer relative">
               <Handbag color="#ffff" strokeWidth={2} size={32} />

         

                <span className="font-bold mt-2">Cart</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

   

      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 ">
          <div className="bg-white w-72 h-full p-5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>

              <button onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-lg">
              <Link to="/">Home</Link>
              <Link to="/sign-in">Login</Link>
              <Link to="/sign-up">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
