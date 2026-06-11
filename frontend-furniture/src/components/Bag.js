import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Bag() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/sign-in");
      return;
    }

    setUser(storedUser);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, [navigate]);

  const updateCart = (items) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            qty: item.qty + 1,
          }
        : item,
    );

    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            qty: item.qty > 1 ? item.qty - 1 : 1,
          }
        : item,
    );

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);

    updateCart(updated);

    toast.success("Item removed");
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;

  const total = subtotal + shipping;

  return (
    <>
      <ToastContainer />

      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10 min-h-screen">
        <p className="text-gray-500">Welcome, {user?.name}</p>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={34} className="text-pink-500" />

          <h1 className="text-4xl font-bold">Shopping Bag</h1>

          <span className="text-gray-500">({cart.length} Items)</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={80} className="mx-auto text-gray-300" />

            <h2 className="text-3xl font-bold mt-6">Your Bag is Empty</h2>

            <p className="text-gray-500 mt-2">
              Add some products to continue shopping.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-5 bg-white rounded-xl shadow p-5"
                >
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                    alt={item.title}
                    className="w-full md:w-40 h-40 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.title}</h2>

                    <p className="text-gray-500 mt-1">{item.category}</p>

                    <p className="text-pink-600 font-bold text-2xl mt-3">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="border p-2 rounded"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="font-bold text-lg">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="border p-2 rounded"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="self-start bg-red-50 p-3 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Price Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={() => toast.success("Proceed to checkout")}
                className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg font-semibold"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
