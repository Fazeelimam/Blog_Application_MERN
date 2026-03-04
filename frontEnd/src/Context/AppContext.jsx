// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { meta } from "@eslint/js";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [token, setToken] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [input, setInput] = useState("");

//   const fetchBlog = async () => {
//     try {
//       const { data } = await axios.get("/api/blog/all");
//       data.success ? setBlogs(data.blogs) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchBlog();
//     const token = localStorage.getItem("token");
//     if (token) {
//       setToken(token);
//       axios.defaults.headers.common["Authorization"] = `${token}`;
//     }
//   }, []);

//   const value = {
//     axios,
//     navigate,
//     token,
//     setToken,
//     blogs,
//     setBlogs,
//     input,
//     setInput,
//   };
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "./lib/axios"; // ✅ Import your configured instance
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlog = async () => {
    try {
      const { data } = await axiosInstance.get("/blog/all"); // ✅ No /api prefix
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axiosInstance.defaults.headers.common["Authorization"] = token; // ✅ Set token on instance
    }
  }, []);

  const value = {
    axios: axiosInstance, // ✅ Pass the configured instance
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
