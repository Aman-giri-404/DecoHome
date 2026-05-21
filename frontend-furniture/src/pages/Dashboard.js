import { useEffect, useState } from "react";

export default function Dashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/product`
    );

    const data = await res.json();

    setProducts(data);
  };

  const handleDelete = async (id) => {

    await fetch(
      `${process.env.REACT_APP_API_URL}/product/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-4 border">Image</th>
            <th className="p-4 border">Title</th>
            <th className="p-4 border">Price</th>
            <th className="p-4 border">Category</th>
            <th className="p-4 border">Action</th>
          </tr>

        </thead>

        <tbody>

          {products.map((item) => (

            <tr key={item._id}>

              <td className="border p-4">
                <img
                  src={item.image}
                  alt=""
                  className="h-20 w-20 object-cover"
                />
              </td>

              <td className="border p-4">
                {item.title}
              </td>

              <td className="border p-4">
                ₹ {item.price}
              </td>

              <td className="border p-4">
                {item.category}
              </td>

              <td className="border p-4">

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}