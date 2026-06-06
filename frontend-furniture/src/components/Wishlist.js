import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
  };

  const moveToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (!exists) {
      cart.push(product);

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }

    removeFromWishlist(product._id);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10 min-h-screen">

        <div className="flex items-center gap-3 mb-10">

          <Heart
            size={32}
            className="text-pink-500"
          />

          <h1 className="text-4xl font-bold">
            My Wishlist
          </h1>

          <span className="text-gray-500">
            ({wishlist.length} Items)
          </span>

        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">

            <Heart
              size={80}
              className="text-gray-300"
            />

            <h2 className="text-2xl font-bold mt-5">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save your favorite products here.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                {/* Product Image */}
                <div className="relative">

                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-72 object-cover"
                  />

                  <button
                    onClick={() =>
                      removeFromWishlist(item._id)
                    }
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50"
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>

                </div>

                {/* Product Info */}
                <div className="p-4">

                  <h2 className="font-bold text-lg line-clamp-1">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.category}
                  </p>

                  <p className="text-pink-600 font-bold text-xl mt-3">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      moveToCart(item)
                    }
                    className="w-full mt-4 bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800"
                  >
                    <ShoppingCart size={18} />
                    Move To Bag
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}