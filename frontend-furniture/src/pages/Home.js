import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin`
      );

      const data = await res.json();

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-10">
          Latest Products
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-xl">
            No Products Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {item.category}
                  </p>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-pink-600 font-bold text-xl">
                      ₹{item.price}
                    </span>
                    

                    <button
                      onClick={() =>
                        navigate(`/view/${item._id}`)
                      }
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      View
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