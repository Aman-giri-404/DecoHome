import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function Bag() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedItems = items.map((item) => ({
      ...item,
      qty: item.qty || 1,
    }));

    setCartItems(updatedItems);
  }, []);

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  };

  const updateQuantity = (id, type) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        if (type === "inc") {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        if (type === "dec" && item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
      }

      return item;
    });

    setCartItems(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);

    setCartItems(updated);

    localStorage.setItem("cart", JSON.stringify(updated));

    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const deleteSelected = () => {
    const updated = cartItems.filter(
      (item) => !selectedItems.includes(item._id),
    );

    setCartItems(updated);

    localStorage.setItem("cart", JSON.stringify(updated));

    setSelectedItems([]);
  };

  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(item._id),
  );

  const totalPrice = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const placeOrder = () => {
 
   
  };

  return (
    <>
     

      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <ShoppingBag />
          Shopping Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-10 text-center">
            <h2 className="text-2xl font-bold">Your Bag is Empty</h2>

            <p className="text-gray-500 mt-2">
              Add products to continue shopping
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center mb-5">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === cartItems.length &&
                      cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                  />

                  <span className="font-semibold">Select All</span>
                </label>

                <button
                  onClick={deleteSelected}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete Selected
                </button>
              </div>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow rounded-xl p-5 flex gap-5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleSelect(item._id)}
                      className="mt-2"
                    />

                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                      alt={item.title}
                      className="w-36 h-36 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h2 className="font-bold text-xl">{item.title}</h2>

                      <p className="text-gray-500 mt-1">{item.category}</p>

                      <p className="text-pink-600 text-2xl font-bold mt-3">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => updateQuantity(item._id, "dec")}
                          className="border p-2 rounded"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-bold">{item.qty}</span>

                        <button
                          onClick={() => updateQuantity(item._id, "inc")}
                          className="border p-2 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}

            <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold mb-5">PRICE DETAILS</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Selected Items</span>

                  <span>{selectedProducts.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Amount</span>

                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>

                  <span>FREE</span>
                </div>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Grand Total</span>

                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-lg mt-6 font-bold"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>

    
    </>
  );
}
