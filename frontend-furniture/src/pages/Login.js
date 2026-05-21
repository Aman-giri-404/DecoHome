import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      console.log("after log in my data is", data);

      if (!res.ok) {
        alert(data.message || "Login Failed");
      } else {
        toast("Login successfully")

       

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center mt-32">
      <div className="border-2 p-10 rounded-lg w-96 shadow-lg">
        <ToastContainer position="bottom-right" autoClose={2000} />
        <div className="max-w-4xl mx-auto">
      
      </div>
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

       
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Email Id:
            </label>
            <input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

       
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Password:
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            className="w-full bg-indigo-600 py-3 rounded-lg text-white hover:bg-indigo-700 transition duration-300"
            type="submit"
          >
            Login
          </button>

          <div className="mt-4 text-gray-500 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-500 border-b border-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}