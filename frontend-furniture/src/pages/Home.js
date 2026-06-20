import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Latest Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover our newest collection
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="h-14 w-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-5 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="bg-white shadow rounded-xl p-10 text-center">
              <h2 className="text-2xl font-bold">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-2">
                Products will appear here once added.
              </p>
            </div>
          )}

        {/* Products */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/view/${item._id}`)
                  }
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                      alt={item.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/500x500?text=No+Image";
                      }}
                      className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-gray-500 uppercase">
                      {item.category && typeof item.category === "object" ? item.category.name : item.category}
                    </p>

                    <h2 className="font-bold text-xl mt-2 line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center mt-5">
                      <span className="text-pink-600 text-2xl font-bold">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/view/${item._id}`);
                        }}
                       
                      >
                       
                      </button>
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