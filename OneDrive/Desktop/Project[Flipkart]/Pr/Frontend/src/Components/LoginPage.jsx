import { useState } from "react";
import img from "../assets/loginlogo.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Bottom from "./Bottom";
import Footer from "./Footer";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/getUsers`, {
        params: { email, password },
      });

      if (response.data.success) {
        alert("Login successful!");
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const goToSignup = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <Bottom />
      <div className="flex p-5 gap-3 justify-center">
        <div className="bg-blue-500 p-5 w-100">
          <p className="text-4xl pt-5 font-semibold">Login</p>
          <p className="text-black-300 pt-3">
            Get access to your Orders, <br /> Wishlist and Recommendations.
          </p>
          <img src={img} alt="Login" className="pt-50 pl-17 pb-2" />
        </div>
        <div className="bg-gray-200 p-3">
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-100 border-b-2 m-2 p-1 focus-visible:outline-none focus:ring-0 cursor-pointer"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              className="bg-orange-400 p-2 w-75 font-semibold mt-2"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-white p-2 w-75 font-semibold mt-2 border-b-2"
              onClick={goToSignup}
            >
              New User? Register
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
