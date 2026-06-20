import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Bag() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    } else {
      setUser(null);
    }
  }, []);

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
        : item
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
        : item
    );

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);

    updateCart(updated);

    toast.success("Item removed");
  };

  if (!user) {
    return (
      <>
        <ToastContainer />
        <Navbar />

        <div className="max-w-4xl mx-auto px-5 py-20 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow-xl rounded-2xl p-10 text-center w-full max-w-lg">
            <ShoppingBag
              size={70}
              className="mx-auto text-pink-500 mb-5"
            />

            <h1 className="text-3xl font-bold mb-3">
              Login Required
            </h1>

            <p className="text-gray-600 mb-8">
              You are not logged in.
              <br />
              Please login first to view and manage your shopping bag.
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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;

  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/sign-in");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Address
      const addressRes = await fetch(`${process.env.REACT_APP_API_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          fullName: checkoutForm.fullName,
          mobile: checkoutForm.mobile,
          addressLine1: checkoutForm.addressLine1,
          addressLine2: checkoutForm.addressLine2,
          city: checkoutForm.city,
          state: checkoutForm.state,
          pincode: checkoutForm.pincode,
        }),
      });

      const addressData = await addressRes.json();
      if (!addressRes.ok) {
        toast.error(addressData.message || "Failed to save address details");
        setLoading(false);
        return;
      }

      const addressId = addressData.address?._id || addressData._id;

      // 2. Create Order
      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.qty,
        price: item.price,
      }));

      const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          items: orderItems,
          totalAmount: total,
          paymentMethod: checkoutForm.paymentMethod,
          paymentStatus: checkoutForm.paymentMethod === "ONLINE" ? "Paid" : "Pending",
          address: addressId,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        toast.error(orderData.message || "Failed to place order");
        setLoading(false);
        return;
      }

      toast.success("Order Placed Successfully!");
      
      // Clear Cart
      updateCart([]);
      
      // Redirect to orders history page
      setTimeout(() => {
        navigate("/order");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Checkout transaction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

                    <p className="text-gray-500 mt-1">
                      {item.category && typeof item.category === "object"
                        ? item.category.name
                        : item.category}
                    </p>

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
                onClick={() => setShowCheckout(true)}
                className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg font-semibold"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-extrabold tracking-tight mb-6">Checkout Details</h2>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={checkoutForm.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={checkoutForm.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter mobile number"
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={checkoutForm.addressLine1}
                  onChange={handleInputChange}
                  required
                  placeholder="Flat/House no., Street, Sector"
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={checkoutForm.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Landmark, Area, Colony"
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={checkoutForm.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={checkoutForm.state}
                    onChange={handleInputChange}
                    required
                    placeholder="State"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={checkoutForm.pincode}
                  onChange={handleInputChange}
                  required
                  placeholder="6 digit pincode"
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={checkoutForm.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="COD">Cash On Delivery (COD)</option>
                  <option value="ONLINE">Online Card Payment</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold transition"
              >
                {loading ? "Processing Order..." : `Place Order (Total: ₹${total})`}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
