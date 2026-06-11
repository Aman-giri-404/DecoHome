import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

useEffect(() => {
  const savedWishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const storedUser = localStorage.getItem("user");

  const savedUser = storedUser
    ? JSON.parse(storedUser)
    : null;

  setWishlist(savedWishlist);
  setUser(savedUser);
}, []);

  const openProduct = (id) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    navigate(`/view/${id}`);
  };

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
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (!exists) {
      cart.push({
        ...product,
        qty: 1,
      });

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    }

    removeFromWishlist(product._id);

    alert("Moved To Bag");
  };

  if (!user) {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-5 py-20 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center w-full max-w-lg">

          <Heart
            size={70}
            className="mx-auto text-pink-500 mb-5"
          />

          <h1 className="text-3xl font-bold mb-3">
            Login Required
          </h1>

          <p className="text-gray-600 mb-8">
            You are not logged in.
            <br />
            Please login first to view and manage your wishlist.
          </p>

          <button
            onClick={() => navigate("/sign-in")}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            Login Now
          </button>

          <p className="mt-6 text-gray-500">
            Don't have an account?
          </p>

          <button
            onClick={() => navigate("/sign-up")}
            className="mt-2 text-pink-500 font-semibold hover:underline"
          >
            Create Account
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}

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
              Save your favourite products here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {wishlist.map((item) => (
              <div
                key={item._id}
                onClick={() => openProduct(item._id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >

                <div className="relative">

                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-72 object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item._id);
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50"
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>

                </div>

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
                    onClick={(e) => {
                      e.stopPropagation();
                      moveToCart(item);
                    }}
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