import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStorageData = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  // Fetch product — no auth check
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
        if (!res.ok) { setProduct(null); return; }
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const requireLogin = () => {
    if (!localStorage.getItem("user")) {
      toast.error("Please login first");
      navigate("/sign-in");
      return false;
    }
    return true;
  };

  const addToWishlist = () => {
    if (!requireLogin() || !product) return;
    const wishlist = getStorageData("wishlist", []);
    if (wishlist.find((item) => item._id === product._id)) {
      toast.error("Already in Wishlist");
      return;
    }
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistAdded(true);
    toast.success("Added To Wishlist");
  };

  const addToBag = () => {
    if (!requireLogin() || !product) return;
    const cart = getStorageData("cart", []);
    if (cart.find((item) => item._id === product._id)) {
      toast.error("Already in Bag");
      return;
    }
    cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added To Bag");
  };

  const buyNow = () => {
    if (!requireLogin() || !product) return;
    localStorage.setItem("cart", JSON.stringify([{ ...product, qty }]));
    navigate("/bag");
  };

  const originalPrice = product ? Math.round(product.price * 2) : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center text-gray-500">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10 min-h-screen">

        {/* ── Top Section: Image + Details ── */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left — Product Image */}
          <div className="sticky top-5">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${product.image}`}
              alt={product.title}
              onError={(e) => { e.target.src = "/no-image.png"; }}
              className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col gap-5">

            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4].map((s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
                <Star size={16} fill="none" className="text-yellow-400" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-gray-500">4.5</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">120 Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-pink-600">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded">
                50% OFF
              </span>
            </div>
            <p className="text-xs text-gray-400 -mt-3">Inclusive of all taxes</p>

            <hr className="border-gray-100" />

            {/* Stock & Delivery */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <ShieldCheck size={16} />
                In Stock
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Truck size={16} />
                Free Delivery on all orders
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <RotateCcw size={16} />
                Easy 7-day Returns
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 text-lg text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-gray-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 text-lg text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-1">
              <button
                onClick={addToBag}
                className="flex-1 min-w-[160px] bg-pink-500 hover:bg-pink-600 active:scale-95 text-white py-3.5 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={buyNow}
                className="flex-1 min-w-[160px] bg-gray-900 hover:bg-black active:scale-95 text-white py-3.5 rounded-xl font-semibold transition"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={addToWishlist}
              className={`flex items-center gap-2 text-sm font-medium transition w-fit
                ${wishlistAdded ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}`}
            >
              <Heart size={18} fill={wishlistAdded ? "currentColor" : "none"} />
              {wishlistAdded ? "Wishlisted" : "Add to Wishlist"}
            </button>

          </div>
        </div>

        {/* ── Description ── */}
        <div className="mt-16 border border-gray-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-8 text-base">{product.description}</p>
        </div>

        {/* ── Product Details Table ── */}
        <div className="mt-8 border border-gray-100 rounded-2xl p-8 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Product Details</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                { label: "Product", value: product.title },
                { label: "Category", value: product.category },
                { label: "Price", value: `₹${product.price.toLocaleString()}` },
                { label: "Description", value: product.description },
              ].map(({ label, value }) => (
                <tr key={label} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-6 font-semibold text-gray-500 w-36 align-top">
                    {label}
                  </td>
                  <td className="py-3 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <Footer />
    </>
  );
}