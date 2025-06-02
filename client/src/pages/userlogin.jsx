import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const navigate = useNavigate();

  // User-specific styles
  const primaryColor = "bg-blue-500";
  const primaryHover = "hover:bg-blue-600";
  const primaryFocus = "focus:ring-blue-300";
  const iconColor = "text-blue-500";
  const roleName = "User";
  const roleDescription = "Access your personal dashboard";
  const gradient = "from-blue-100 to-indigo-100";
  const Icon = User;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFocus = (field) => () => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => () => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login/user",
        { ...formData, role: "user" }
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful! Redirecting...", {
          autoClose: 1000,
          onClose: () => navigate("/profile"),
        });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Please try again.",
        { autoClose: 3000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-grow flex items-center justify-center p-4 relative">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0"
          aria-hidden="true"
        ></div>
        <ToastContainer position="top-center" />
        <div className="w-full max-w-md rounded-2xl overflow-hidden relative z-10">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-md"></div>
          {/* Main card */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
            {/* Role indicator bar */}
            <div className={`h-2 ${primaryColor}`}></div>
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div
                    className={`absolute -inset-2 rounded-full bg-gradient-to-br ${gradient} opacity-60 blur`}
                  ></div>
                  <div
                    className={`relative w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className={`h-8 w-8 ${iconColor}`} strokeWidth={1.5} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800">
                  Welcome back
                </h2>
                <p className={`text-sm font-semibold ${iconColor} mt-2`}>
                  {roleName}
                </p>
                <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
                  {roleDescription}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* --- EMAIL FIELD --- */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${
                        isFocused.email
                          ? "ring-2 ring-opacity-30 " +
                            primaryColor.replace("bg-", "ring-")
                          : ""
                      }`}
                    ></div>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus("email")}
                      onBlur={handleBlur("email")}
                      required
                      className="block w-full px-4 py-3 pl-10 text-gray-700 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:bg-white transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail
                        className={`h-5 w-5 ${
                          isFocused.email ? iconColor : "text-gray-400"
                        } transition-colors duration-200`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
                {/* --- PASSWORD FIELD --- */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    {/* Forgot Password Link */}
                    <Link
                      to="/reset-password"
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${
                        isFocused.password
                          ? "ring-2 ring-opacity-30 " +
                            primaryColor.replace("bg-", "ring-")
                          : ""
                      }`}
                    ></div>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={handleFocus("password")}
                      onBlur={handleBlur("password")}
                      required
                      className="block w-full px-4 py-3 pl-10 text-gray-700 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:bg-white transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        className={`h-5 w-5 ${
                          isFocused.password ? iconColor : "text-gray-400"
                        } transition-colors duration-200`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
                {/* --- SUBMIT BUTTON --- */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${primaryColor} ${primaryHover} text-white py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${primaryFocus} focus:ring-offset-2 flex items-center justify-center ${
                    isLoading
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:shadow-md transform hover:-translate-y-0.5"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
              {/* New User Registration Link */}
              <div className="mt-6 text-center">
                <span className="text-gray-600">New user?</span>{" "}
                <Link
                  to="/userregister"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin;