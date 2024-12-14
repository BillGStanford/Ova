import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Lock, ShieldCheck, AlertTriangle } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      localStorage.setItem("token", res.data.token);
      
      const welcomeMessage = `Welcome back, ${formData.username}! 
      Your reading adventure continues.`;
      
      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-amber-100">
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-amber-600 mr-2" />
          <h1 className="text-3xl font-bold text-amber-900">Secure Login</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4 flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4 group">
            <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username or email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-6 group">
            <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <div className="mt-2 text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-amber-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-lg transition duration-300 flex items-center justify-center ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin mr-2">🔄</div>
            ) : (
              <Lock className="mr-2" />
            )}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-amber-800">
            New to Mova? {" "}
            <Link to="/signup" className="text-amber-600 hover:underline">
              Create an Account
            </Link>
          </p>
          <Link to="/" className="text-amber-600 hover:underline">
            Back to Main Page
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-amber-700">
          <p>Your privacy and security are our top priorities.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;