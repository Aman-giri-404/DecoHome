import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function Adminpanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login/admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login Failed");
      } else {
        localStorage.setItem("admin", JSON.stringify(data.user));
        toast("Admin Login Successful");
        console.log(data);
        
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
          <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>

         
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Email Id:
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2 
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="w-full px-4 py-3 rounded-lg bg-white/80 border-2 
            focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            className="w-full bg-indigo-600 py-3 rounded-lg text-white 
          hover:bg-indigo-700 transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}