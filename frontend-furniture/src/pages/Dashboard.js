import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import { Trash2, Plus } from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <p className="text-gray-500 mt-2">Manage Products & Orders</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Products</h3>

          <p className="text-3xl font-bold mt-2">{products.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>

          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Orders</h3>

          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Orders</h3>

          <p className="text-3xl font-bold text-orange-500 mt-2">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold">Products List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Image</th>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{item.title}</td>

                  <td className="p-4">{item.category}</td>

                  <td className="p-4 font-semibold">₹{item.price}</td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-2xl font-bold"
            >
              ×
            </button>

            <AddProduct />
          </div>
        </div>
      )}
    </div>
  );
}
