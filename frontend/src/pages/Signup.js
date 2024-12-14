import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength < 3) {
      alert("Please create a stronger password");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data.message);
      if (res.data.message) {
        setAccountCreated(true);
      }
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-amber-100">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-amber-600 mr-2" />
          <h1 className="text-3xl font-bold text-amber-900">Secure Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-amber-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  passwordStrength === 1
                    ? "bg-red-500"
                    : passwordStrength === 2
                    ? "bg-yellow-500"
                    : passwordStrength >= 3
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
                style={{ width: `${passwordStrength * 25}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-amber-700">
              Password Strength:{" "}
              {passwordStrength === 0
                ? "Very Weak"
                : passwordStrength === 1
                ? "Weak"
                : passwordStrength === 2
                ? "Medium"
                : passwordStrength === 3
                ? "Strong"
                : "Very Strong"}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Lock className="mr-2" size={20} />
            Create Account
          </button>
        </form>

        {accountCreated && (
          <div className="mt-6 text-center">
            <p className="text-sm text-amber-800">
              Your account was created successfully.{" "}
              <button
                onClick={handleGoToLogin}
                className="text-amber-600 hover:underline"
              >
                Go to Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;