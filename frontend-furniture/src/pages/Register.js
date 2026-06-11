import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "user",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.message ||
            "Registration Failed"
        );
      } else {
        toast.success(
          "Registration Successful!"
        );

        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      toast.error(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-4 py-10">

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
      />

      <div className="w-full max-w-md bg-[#FCFBF8] rounded-3xl shadow-2xl border border-stone-200 p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-stone-800">
            Create Account
          </h1>

          <p className="text-stone-500 mt-2">
            Join us and discover beautiful furniture.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="text-sm font-medium text-stone-700">
              Full Name
            </label>

            <div className="relative mt-2">

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 outline-none transition"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="text-sm font-medium text-stone-700">
              Email
            </label>

            <div className="relative mt-2">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 outline-none transition"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-sm font-medium text-stone-700">
              Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 outline-none transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <div className="text-center text-sm text-stone-500">

            Already have an account?{" "}

            <Link
              to="/sign-in"
              className="text-amber-700 font-semibold hover:underline"
            >
              Sign In
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}