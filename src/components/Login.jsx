import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import LoginBg from "../utils/LoginBg.jpg";
import { FaArrowRight } from "react-icons/fa6";
import Header from "../components/Header";
import AboutSec from "./AboutSec";
import Footer from "./Footer";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [signup, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        BASEURL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  const handleSignUpSubmit = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Signup failed.");
    }
  };

  const toggleAuthMode = () => {
    setSignUp((prev) => !prev);
    setError("");
  };

  return (
    <>
      <Header />

      {/* Login Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${LoginBg})` }}
      >
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl backdrop-blur-md bg-white/30 text-black shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {signup ? "Sign Up" : "Login"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signup ? handleSignUpSubmit() : handleLoginSubmit();
            }}
            className="space-y-5"
          >
            {signup && (
              <>
                <Input label="First Name" value={firstName} setValue={setFirstName} />
                <Input label="Last Name" value={lastName} setValue={setLastName} />
              </>
            )}

            <Input label="Email" type="email" value={emailId} setValue={setEmailId} />
            <Input label="Password" type="password" value={password} setValue={setPassword} />

            {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition flex justify-center items-center gap-2 text-lg font-semibold"
            >
              Submit <FaArrowRight />
            </button>
          </form>

          <p
            className="mt-4 text-center text-sm text-purple-900 font-semibold cursor-pointer hover:underline"
            onClick={toggleAuthMode}
          >
            {signup ? "Already have an account? Login" : "New user? Create account"}
          </p>
        </div>
      </section>

      {/* About Section */}
      <AboutSec />
      <Footer/>
    </>
  );
};

// Reusable Input Component
const Input = ({ label, value, setValue, type = "text" }) => (
  <div>
    <label className="block text-black font-semibold mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-2 border border-black/20 bg-white/50 text-black placeholder-black/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default Login;

