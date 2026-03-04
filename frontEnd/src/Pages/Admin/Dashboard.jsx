import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTable from "../../Components/Admin/BlogTable";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0, // ✅ fixed (was blog)
    comments: 0,
    drafts: 0,
    recentBlogs: [], // ✅ fixed (was recentBlog)
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-purple-50/50">
      <div className="flex flex-wrap gap-4">
        <div
          className="flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {dashboardData.blogs} {/* ✅ fixed */}
            </p>
            <p className="text-gray-900 font-light">Blogs</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {dashboardData.comments}
            </p>
            <p className="text-gray-900 font-light">Comments</p>
          </div>
        </div>

        <div
          className="flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer
        hover:scale-105 transition-all"
        >
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-900 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-900">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {dashboardData.recentBlogs?.map(
                (
                  blog,
                  index, // ✅ fixed
                ) => (
                  <BlogTable
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
