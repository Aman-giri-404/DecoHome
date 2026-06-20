import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import {
  Trash2,
  Plus,
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Mail,
  Clock,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    lowStockProducts: [],
    topSellingProducts: [],
    recentOrders: [],
    unreadMessages: 0,
    successfulPayments: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const formatCategory = (category) => {
    if (!category) return "N/A";
    if (typeof category === "object" && category.name) {
      return category.name;
    }
    return category;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time analytics and management
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              fetchProducts();
              fetchStats();
            }}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition"
            title="Refresh Data"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-950 mt-1">
              ₹{(stats.totalRevenue || 0).toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total Orders</p>
            <p className="text-3xl font-bold text-slate-950 mt-1">
              {stats.totalOrders || 0}
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
        </div>

        {/* Card 3: Completed Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Completed Orders</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">
              {stats.deliveredOrders || 0}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Clock size={24} />
          </div>
        </div>

        {/* Card 4: Pending Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Pending Orders</p>
            <p className="text-3xl font-bold text-amber-500 mt-1">
              {stats.pendingOrders || 0}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Clock size={24} />
          </div>
        </div>

        {/* Card 5: Total Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total Products</p>
            <p className="text-3xl font-bold text-slate-950 mt-1">
              {stats.totalProducts || 0}
            </p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package size={24} />
          </div>
        </div>

        {/* Card 6: Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total Users</p>
            <p className="text-3xl font-bold text-slate-950 mt-1">
              {stats.totalUsers || 0}
            </p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Users size={24} />
          </div>
        </div>

        {/* Card 7: Successful Payments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Successful Payments</p>
            <p className="text-3xl font-bold text-teal-600 mt-1">
              {stats.successfulPayments || 0}
            </p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <CreditCard size={24} />
          </div>
        </div>

        {/* Card 8: Unread Messages */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Unread Enquiries</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">
              {stats.unreadMessages || 0}
            </p>
          </div>
          <div className="p-3 bg-yellow-50 text-amber-600 rounded-xl">
            <Mail size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-4 px-4 font-semibold border-b-2 transition ${
            activeTab === "products"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          All Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-4 px-4 font-semibold border-b-2 transition ${
            activeTab === "orders"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Recent Orders ({stats.recentOrders?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("top-selling")}
          className={`pb-4 px-4 font-semibold border-b-2 transition ${
            activeTab === "top-selling"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Top Selling ({stats.topSellingProducts?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("low-stock")}
          className={`pb-4 px-4 font-semibold border-b-2 transition ${
            activeTab === "low-stock"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Low Stock ({stats.lowStockProducts?.length || 0})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        {activeTab === "products" && (
          <div>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">All Products List</h2>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-200 text-slate-700 rounded-full">
                Database Source
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-sm">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Product Title</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Stock</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {products.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                          alt={item.title}
                          className="h-14 w-14 rounded-xl object-cover border border-slate-100 shadow-sm"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        {item.title}
                      </td>

                      <td className="p-4 text-slate-500">
                        {formatCategory(item.category)}
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        ₹{item.price}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.stock <= 5
                              ? "bg-rose-50 text-rose-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.stock} in stock
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition font-medium"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-8 text-slate-400">
                        No products available in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">
                Recent 5 Transactions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-sm">
                  <tr>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Payment Status</th>
                    <th className="p-4 text-left">Order Status</th>
                    <th className="p-4 text-left">Total Amount</th>
                    <th className="p-4 text-left">Method</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {stats.recentOrders && stats.recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">
                          {order.user?.name || "Unknown User"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.user?.email || "N/A"}
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.paymentStatus === "Failed"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.orderStatus === "Delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.orderStatus === "Cancelled"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        ₹{(order.totalAmount || 0).toLocaleString()}
                      </td>

                      <td className="p-4 text-slate-500 font-medium">
                        {order.paymentMethod || "COD"}
                      </td>

                      <td className="p-4 text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                  {(!stats.recentOrders || stats.recentOrders.length === 0) && (
                    <tr>
                      <td colSpan="6" className="text-center p-8 text-slate-400">
                        No orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "top-selling" && (
          <div>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Top Selling Products</h2>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                <TrendingUp size={12} />
                High Demand
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-sm">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Total Sold</th>
                    <th className="p-4 text-left">Availability</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {stats.topSellingProducts && stats.topSellingProducts.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover border border-slate-100"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                        <span className="font-semibold text-slate-900">{item.title}</span>
                      </td>

                      <td className="p-4 text-slate-500">
                        {formatCategory(item.category)}
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        ₹{item.price}
                      </td>

                      <td className="p-4 font-bold text-indigo-600 text-base">
                        {item.sold || 0} sold
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.stock <= 5
                              ? "bg-rose-50 text-rose-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.stock} in stock
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!stats.topSellingProducts || stats.topSellingProducts.length === 0) && (
                    <tr>
                      <td colSpan="5" className="text-center p-8 text-slate-400">
                        No sales data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "low-stock" && (
          <div>
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Low Stock Alert</h2>
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full">
                <AlertTriangle size={12} />
                Requires Restock
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-sm">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Stock Level</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {stats.lowStockProducts && stats.lowStockProducts.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover border border-slate-100"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                        <span className="font-semibold text-slate-900">{item.title}</span>
                      </td>

                      <td className="p-4 text-slate-500">
                        {formatCategory(item.category)}
                      </td>

                      <td className="p-4 font-semibold text-slate-900">
                        ₹{item.price}
                      </td>

                      <td className="p-4 font-bold text-rose-600 text-base">
                        {item.stock} units left
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 animate-pulse">
                          Restock Needed
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!stats.lowStockProducts || stats.lowStockProducts.length === 0) && (
                    <tr>
                      <td colSpan="5" className="text-center p-8 text-slate-400">
                        All products are sufficiently stocked.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-5 top-5 text-2xl font-bold text-slate-400 hover:text-slate-600 transition"
            >
              ×
            </button>

            <AddProduct
              onSuccess={() => {
                setShowAddModal(false);
                fetchProducts();
                fetchStats();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
