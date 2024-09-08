import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://job-seeking-backend-deployment-cep2.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg">
          <div className="text-center mb-6">
            {/* <img src="/JobZeelogo.png" alt="logo" className="mx-auto h-12 w-auto" /> */}
            <div className="flex justify-center items-center h-full">
  <span className="text-4xl font-extrabold text-gray-700 hover:text-gray-900">
    AutoApply <span className="text-blue-500">Careers</span>
  </span>
</div>

            
            <h3 className="mt-4 text-xl font-semibold">Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
            <label className="block text-gray-500 font-bold">Login As</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-2 p-2 border rounded focus:ring focus:ring-indigo-200"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-500">Email Address</label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-2 border rounded focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-6">
  <label className="block text-gray-500 font-bold">Password</label>
  <input
    type="password"
    placeholder="Your Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full mt-2 p-2 border-2 border-gray-200 rounded focus:border-green-500 focus:ring-2 focus:ring-green-200"
  />
</div>


            <button type="submit" className="w-full py-3 px-5 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200 transition duration-200">Sign in</button>

            <div className="flex items-center justify-center mt-4 space-x-2">
  <p className="text-gray-500 text-sm">Don't have an account?</p>
  <Link to="/register" className="text-green-400 hover:underline">Sign up</Link>
</div>

          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2">
  <p className="text-5xl font-extrabold text-gray-600 transition duration-300 ease-in-out">
    Jobs find you when you let
    <span className="font-black text-gray-800 hover:text-green-500"> AutoApply </span>
    <span className="text-blue-500 hover:text-blue-700">Careers</span> take the lead.
  </p>
</div>


      </section>
    </>
  );
};

export default Login;
