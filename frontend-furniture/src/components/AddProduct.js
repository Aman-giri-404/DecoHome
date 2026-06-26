import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddProduct({ onSuccess }) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    stock: "",
    sku: "",
    tags: "",
    isFeatured: false,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`);

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validate image selected
      if (!imageFile) {
        toast.error("Please select a product image");
        setLoading(false);
        return;
      }

      let imageUrl = "";

      // Upload Image

      const imageData = new FormData();

      imageData.append("image", imageFile);

      const uploadRes = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/upload`,
        {
          method: "POST",
          body: imageData,
        },
      );

      const uploadResult = await uploadRes.json();

      if (!uploadRes.ok) {
        toast.error(uploadResult.message || "Image Upload Failed");
        return;
      }

      imageUrl = uploadResult.imageUrl;

      // Create Product

      const productRes = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          slug: generateSlug(form.title),

          image: imageUrl,

          price: Number(form.price),

          originalPrice: Number(form.originalPrice),

          stock: Number(form.stock),

          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const productData = await productRes.json();

      if (!productRes.ok) {
        toast.error(productData.message || "Failed To Create Product");
        return;
      }

      toast.success("Product Added Successfully");

      if (onSuccess) {
        onSuccess();
      }

      setForm({
        title: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        brand: "",
        stock: "",
        sku: "",
        tags: "",
        isFeatured: false,
        isActive: true,
      });

      setImageFile(null);
      setPreview("");

      document.getElementById("productImage").value = "";
    } catch (error) {
      console.error(error);

      toast.error("Server Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="border p-3 rounded"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="border p-3 rounded"
          />
        </div>

        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover border rounded-lg"
            />
          </div>
        )}

        <input
          type="text"
          name="tags"
          placeholder="chair, wood, furniture"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          required
          className="w-full border p-3 rounded"
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured Product
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active Product
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
