import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Blog from "./Pages/Blog.jsx";
import Layout from "./Pages/Admin/Layout.jsx";
import Dashboard from "./Pages/Admin/Dashboard";
import AddBlog from "./Pages/Admin/AddBlog.jsx";
import ListBlog from "./Pages/Admin/ListBlog.jsx";
import Comments from "./Pages/Admin/Comments.jsx";
import Login from "./Components/Admin/Login.jsx";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./Context/AppContext.jsx";

function App() {
  const { token } = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="listblog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
