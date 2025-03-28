import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import LoginBg from "../utils/LoginBg.jpg";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        BASEURL + "login",
        { emailId, password },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      console.error("Login Failed:", err);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center backdrop-blur-lg bg-opacity-80">
        <h1 className="text-4xl font-extrabold text-gray-800">Login</h1>
        <div className="mt-6">
          <div className="text-left">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              placeholder="Enter your email Id"
            />
          </div>

          <div className="mt-4 text-left">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {Error && <p className="text-red-600 mt-3 font-medium">{Error}</p>}
        </div>

        <button
          className="w-full mt-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          onClick={handleLoginSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;

