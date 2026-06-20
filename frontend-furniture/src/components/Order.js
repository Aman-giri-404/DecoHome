import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ShoppingBag, Calendar, MapPin, CreditCard, ChevronRight } from "lucide-react";

export default function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserOrders(parsedUser._id);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.log("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  if (!loading && !user) {
    return (
      <>
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
              Please login first to view your order history.
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

      <div className="max-w-5xl mx-auto px-5 py-10 min-h-screen">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/")}>
            Home
          </span>
          <ChevronRight size={14} />
          <span className="text-black font-medium">My Orders</span>
        </div>

        {/* Heading */}
        <div className="flex items-center gap-3 mb-8 border-b pb-5">
          <ShoppingBag className="text-pink-500" size={32} />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Order History</h1>
            <p className="text-gray-500 text-sm mt-1">
              Track and view details of your recent purchases
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={60} />
            <h2 className="text-2xl font-bold text-gray-800">No Orders Found</h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2.5 rounded-xl transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Order Top Summary Header */}
                <div className="bg-gray-50/75 border-b p-5 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Order Placed
                      </p>
                      <div className="flex items-center gap-1.5 text-gray-700 font-medium text-sm mt-1">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Total Amount
                      </p>
                      <p className="text-pink-600 font-bold text-sm mt-1">
                        ₹{(order.totalAmount || 0).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Order ID
                      </p>
                      <p className="text-gray-500 text-xs font-mono mt-1">
                        #{order._id}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="p-6 grid md:grid-cols-3 gap-8">
                  {/* Left columns: Items list */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
                      Order Items
                    </h3>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 border border-gray-50 rounded-xl hover:bg-gray-50/50 transition cursor-pointer"
                        onClick={() => item.product?._id && navigate(`/view/${item.product._id}`)}
                      >
                        {item.product?.image ? (
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}${item.product.image}`}
                            alt={item.product.title}
                            className="h-16 w-16 object-cover rounded-lg border"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-slate-100 flex items-center justify-center text-xs text-slate-400 rounded-lg">
                            No Image
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                            {item.product?.title || "Product Deleted"}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Qty: <span className="font-medium text-gray-700">{item.quantity}</span>
                          </p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">
                            ₹{(item.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right column: Delivery Address & Payment Method */}
                  <div className="space-y-6 md:border-l md:pl-8 border-gray-100">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                        <MapPin size={16} className="text-pink-500" />
                        Delivery Address
                      </h3>
                      {order.address ? (
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-semibold text-gray-800">
                            {order.address.fullName}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Mobile: {order.address.mobile}
                          </p>
                          <p className="mt-1 leading-relaxed text-xs">
                            {order.address.addressLine1}
                            {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                          </p>
                          <p className="text-xs">
                            {order.address.city}, {order.address.state} - {order.address.pincode}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No address details available.</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                        <CreditCard size={16} className="text-pink-500" />
                        Payment Details
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="text-xs">
                          Method:{" "}
                          <span className="font-semibold text-gray-800">
                            {order.paymentMethod}
                          </span>
                        </p>
                        <p className="text-xs">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              order.paymentStatus === "Paid"
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
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