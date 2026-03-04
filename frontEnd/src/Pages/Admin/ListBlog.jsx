import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import BlogTable from "../../Components/Admin/BlogTable";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:pl-16 bg-purple-50/50">
      <h1>All Blogs</h1>
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-900">
          <thead className="text-xs text-gray-900 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(
              (
                blog,
                index // ✅ fixed
              ) => (
                <BlogTable
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlog}
                  index={index + 1}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;
