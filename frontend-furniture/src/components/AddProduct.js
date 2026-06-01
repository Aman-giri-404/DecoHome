import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      let imageUrl = "";

      // Upload Image First
      if (imageFile) {
        const formData = new FormData();

        formData.append("image", imageFile);

        const uploadRes = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          toast.error(uploadData.error || "Image upload failed");
          setLoading(false);
          return;
        }

        imageUrl = uploadData.imageUrl;
      } else {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }

      // Create Product
      const productRes = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            image: imageUrl,
          }),
        },
      );

      const productData = await productRes.json();

      if (!productRes.ok) {
        toast.error(productData.error || "Failed to create product");
        setLoading(false);
        return;
      }

      toast.success("Product Added Successfully");

      // Reset Form
      setForm({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });

      setImageFile(null);
      setPreview("");

      // Reset file input
      document.getElementById("productImage").value = "";
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow rounded-lg p-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          id="productImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full border p-3 rounded"
        />

        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="5"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
