import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");

  const { axios, setToken } = useAppContext();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/admin/login", {
  //       email,
  //       password,
  //     });

  //     if (data.success) {
  //       setToken(data.token);
  //       localStorage.setItem("token", data.token);
  //       axios.defaults.headers.common["Authorization"] = data.token; // ✅ also fix .common
  //       toast.success("Login successful");
  //     } else {
  //       toast.error(data.message || "Login failed"); // ✅ use backend message
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/admin/login", {
        // ✅ Removed /api
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className=" flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-purple-950">Admin</span>Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => SetEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="your email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-purple-950 text-white rounded-full cursor-pointer hover:bg-purple-950/90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
