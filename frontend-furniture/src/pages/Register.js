import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role: "user" }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Register Failed");
      } else {
        toast("Register Successfully!");
        setTimeout(() => {
         
          window.location.reload();
        }, 2000);
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex justify-center mt-32">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="border-2 p-10 rounded-lg w-96 shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

      <div className="max-w-4xl mx-auto">
       
      </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold">Name:</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2"
            />
          </div>

     
          <div className="mb-5">
            <label className="block mb-2 text-sm font-semibold">Email:</label>
            <input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2"
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
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2"
            />
          </div>

          <button
            className="w-full bg-indigo-600 py-3 rounded-lg text-white hover:bg-indigo-700 transition"
            type="submit"
          >
            Register
          </button>

          <div className="mt-4 text-gray-500 text-center text-sm">
            Do you have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 border-b border-blue-500 hover:text-blue-700"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}