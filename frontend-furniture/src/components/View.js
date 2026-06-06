import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function View() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  });

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);

      const data = await res.json();

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item._id === product._id);

    if (!exists) {
      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      alert("Added to Wishlist");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">Loading Product...</h1>
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
          <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side Image */}
          <div>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={`${process.env.REACT_APP_IMG_URL}${product.image}`}
                alt={product.title}
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Right Side */}
          <div>
            <p className="text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">{product.title}</h1>

            <div className="flex items-center gap-2 mt-4">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-500">(128 Reviews)</span>
            </div>

            <h2 className="text-4xl font-bold text-pink-600 mt-6">
              ₹{product.price}
            </h2>

            <p className="text-green-600 font-medium mt-2">
              Inclusive of all taxes
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-2">Product Description</h3>

              <p className="text-gray-600 leading-7">{product.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg flex justify-center items-center gap-2">
                <ShoppingCart size={20} />
                Add To Bag
              </button>

              <button className="flex-1 bg-black hover:bg-gray-900 text-white py-4 rounded-lg">
                Buy Now
              </button>

              <button onClick={addToWishlist} className="border p-4 rounded-lg">
                <Heart size={22} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="border rounded-lg p-4 text-center">
                <Truck size={28} className="mx-auto mb-2" />
                <p className="text-sm">Free Delivery</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <RotateCcw size={28} className="mx-auto mb-2" />
                <p className="text-sm">Easy Returns</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <ShieldCheck size={28} className="mx-auto mb-2" />
                <p className="text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-16 bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-5">Product Details</h2>

          <table className="w-full border">
            <tbody>
              <tr className="border">
                <td className="p-4 font-semibold">Product Name</td>

                <td className="p-4">{product.title}</td>
              </tr>

              <tr className="border">
                <td className="p-4 font-semibold">Category</td>

                <td className="p-4">{product.category}</td>
              </tr>

              <tr className="border">
                <td className="p-4 font-semibold">Price</td>

                <td className="p-4">₹{product.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
