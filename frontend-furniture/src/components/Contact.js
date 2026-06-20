import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to submit enquiry");
        return;
      }

      toast.success("Enquiry submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-12 min-h-screen">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Have questions about our designs, orders, or customizable options? Get in touch with our design consultants.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex gap-4">
              <div className="p-3 bg-pink-50 text-pink-500 rounded-xl h-fit">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                <p className="text-gray-500 mt-1 text-sm">Mon-Fri from 9am to 6pm</p>
                <p className="text-pink-600 font-semibold mt-2 text-sm">
                  +1 (555) 019-2834
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex gap-4">
              <div className="p-3 bg-pink-50 text-pink-500 rounded-xl h-fit">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Email Support</h3>
                <p className="text-gray-500 mt-1 text-sm">Our support team is online 24/7</p>
                <p className="text-pink-600 font-semibold mt-2 text-sm">
                  support@decohome.com
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex gap-4">
              <div className="p-3 bg-pink-50 text-pink-500 rounded-xl h-fit">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Design Studio</h3>
                <p className="text-gray-500 mt-1 text-sm">Visit our experience center</p>
                <p className="text-gray-700 font-semibold mt-2 text-sm leading-relaxed">
                  100 Furniture Row, Suite A<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Product Query, Shipping, Custom order"
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us details about your request..."
                  className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full md:w-fit bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-bold px-8 py-3.5 rounded-xl transition"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
