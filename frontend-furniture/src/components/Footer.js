import React from "react";
import { Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#131A22] text-white mt-10">
      <div className="bg-[#232F3E] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h2 className="font-bold text-lg mb-4">Get to Know Us</h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:underline cursor-pointer">About Myntra</li>

              <li className="hover:underline cursor-pointer">Careers</li>

              <li className="hover:underline cursor-pointer">Press Releases</li>

              <li className="hover:underline cursor-pointer">Myntra Science</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Connect with Us</h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:underline cursor-pointer">Facebook</li>

              <li className="hover:underline cursor-pointer">Twitter</li>

              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Make Money with Us</h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:underline cursor-pointer">Sell on Myntra</li>

              <li className="hover:underline cursor-pointer">
                Sell under Myntra Accelerator
              </li>

              <li className="hover:underline cursor-pointer">
                Protect and Build Your Brand
              </li>

              <li className="hover:underline cursor-pointer">
                Myntra Global Selling
              </li>

              <li className="hover:underline cursor-pointer">
                Supply to Myntra
              </li>

              <li className="hover:underline cursor-pointer">
                Become an Affiliate
              </li>

              <li className="hover:underline cursor-pointer">
                Fulfilment by Myntra
              </li>

              <li className="hover:underline cursor-pointer">
                Advertise Your Products
              </li>

              <li className="hover:underline cursor-pointer">
                Myntra on Merchants
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Let Us Help You</h2>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:underline cursor-pointer">Your Account</li>

              <li className="hover:underline cursor-pointer">Returns Centre</li>

              <li className="hover:underline cursor-pointer">
                Recalls and Product Safety Alerts
              </li>

              <li className="hover:underline cursor-pointer">
                100% Purchase Protection
              </li>

              <li className="hover:underline cursor-pointer">
                Myntra App Download
              </li>

              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#232F3E] py-8 border-b border-gray-700">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
          <h1 className="text-4xl font-bold tracking-wide">Myntra</h1>

          <button className="border border-gray-500 px-4 py-2 rounded flex items-center gap-2 text-sm hover:border-white">
            <Globe size={16} />
            English
            <ChevronDown size={14} />
          </button>

          <button className="border border-gray-500 px-4 py-2 rounded flex items-center gap-2 text-sm hover:border-white">
            🇮🇳 India
          </button>
        </div>
      </div>

      <div className="bg-[#131A22] py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400">
          <div>
            <h3 className="text-white">AbeBooks</h3>

            <p>Books, art</p>

            <p>& collectibles</p>
          </div>

          <div>
            <h3 className="text-white">Myntra Web Services</h3>

            <p>Scalable Cloud</p>

            <p>Computing Services</p>
          </div>

          <div>
            <h3 className="text-white">Audible</h3>

            <p>Download</p>

            <p>Audio Books</p>
          </div>

          <div>
            <h3 className="text-white">IMDb</h3>

            <p>Movies, TV</p>

            <p>& Celebrities</p>
          </div>

          <div>
            <h3 className="text-white">Shopbop</h3>

            <p>Designer</p>

            <p>Fashion Brands</p>
          </div>

          <div>
            <h3 className="text-white">Myntra Business</h3>

            <p>Everything For</p>

            <p>Your Business</p>
          </div>

          <div>
            <h3 className="text-white">Myntra furniture</h3>

            <p>100 million furniture</p>

            <p>Over 15 million sell</p>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm mt-10 px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <p className="hover:underline cursor-pointer">
              Conditions of Use & Sale
            </p>

            <p className="hover:underline cursor-pointer">Privacy Notice</p>

            <p className="hover:underline cursor-pointer">Interest-Based Ads</p>
          </div>

          <p>© 1996-2026, Myntra.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}
