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
  const [ firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[signup, setsignUp] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        BASEURL + "/login",
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

  const HandleSignUpSubmit = async()=>{

    try{

  
    const res = await axios.post(BASEURL + "/signup", {firstName, lastName, emailId, password,}, {
      withCredentials : true,
    });

    console.log(res.data);

    dispatch(addUser(res.data));

    navigate("/profile");

  }

  catch(err){
    console.error(err.message);
  }



  }

  const SignUpHandle = ()=>{
   setsignUp(signup => !signup);
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center backdrop-blur-lg bg-opacity-80">
        {signup ? (<h1 className="text-4xl font-extrabold text-gray-800">Sign Up</h1>) : (
          <h1 className="text-4xl font-extrabold text-gray-800">Login</h1>
        )}
        <div className="mt-6">

         { signup && (<div className="text-left my-2">
            <label className="block text-gray-700 font-semibold">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              placeholder="Enter your FirstName"
            />
          </div>)}


          { signup && (<div className="text-left my-3">
            <label className="block text-gray-700 font-semibold">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              placeholder="Enter your LastName"
            />
          </div>)}


          
          <div className="text-left my-3">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="text"
              placeholder="Enter your email Id"
            />
          </div>

          <div className="mt-4 text-left my-2">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p onClick={SignUpHandle} className="mt-3 mr-30 hover:font-bold font-sans text-md w-full">
  {!signup ? "New User? Register Now" : "Already registered? Sign In Now"}
</p>


          {Error && <p className="text-red-600 mt-3 font-medium">{Error}</p>}
        </div>

        <button
          className="w-full mt-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          onClick={signup ? HandleSignUpSubmit : handleLoginSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;

