import React from "react";


export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white mt-16">
      {/* Top Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h2 className="font-bold text-lg mb-5">Get to Know Us</h2>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                About Myntra
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Careers
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Press Releases
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Myntra Science
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-5">Connect with Us</h2>


            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Facebook
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Twitter
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Instagram
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-5">
              Make Money with Us
            </h2>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Sell on Myntra
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Myntra Accelerator
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Protect Your Brand
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Global Selling
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Become an Affiliate
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Advertise Products
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-5">Help & Support</h2>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Your Account
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Returns Centre
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Product Safety
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Purchase Protection
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Download App
              </li>
              <li className="hover:text-[#ff3f6c] cursor-pointer transition">
                Help Center
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand Section */}
      <div className="border-b border-gray-700 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            MYNTRA
          </h1>

          <div className="flex gap-4">
           

            <button className="border border-gray-600 px-4 py-2 rounded-lg hover:border-pink-500 hover:text-pink-400 transition">
              🇮🇳 India
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#1F2937] p-5 rounded-xl hover:scale-105 transition">
          <h3 className="font-semibold mb-2">100% Original</h3>
          <p className="text-sm text-gray-400">
            Guarantee for all products at Myntra
          </p>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl hover:scale-105 transition">
          <h3 className="font-semibold mb-2">Free Shipping</h3>
          <p className="text-sm text-gray-400">
            On orders above ₹999
          </p>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl hover:scale-105 transition">
          <h3 className="font-semibold mb-2">Easy Returns</h3>
          <p className="text-sm text-gray-400">
            Hassle-free return policy
          </p>
        </div>

        <div className="bg-[#1F2937] p-5 rounded-xl hover:scale-105 transition">
          <h3 className="font-semibold mb-2">Secure Payments</h3>
          <p className="text-sm text-gray-400">
            100% safe and secure checkout
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <p className="hover:text-[#ff3f6c] cursor-pointer transition">
              Terms & Conditions
            </p>

            <p className="hover:text-[#ff3f6c] cursor-pointer transition">
              Privacy Policy
            </p>

            <p className="hover:text-[#ff3f6c] cursor-pointer transition">
              Cookie Policy
            </p>

            <p className="hover:text-[#ff3f6c] cursor-pointer transition">
              Contact Us
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 Myntra Clone. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}