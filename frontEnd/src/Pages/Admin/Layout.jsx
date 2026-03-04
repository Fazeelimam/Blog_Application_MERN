import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../Components/Admin/SideBar";
import { useAppContext } from "../../Context/AppContext";

function Layout() {
  const { axios, setToken, navigate } = useAppContext();
  const Logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b  border-gray-200">
        <img
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={Logout}
          className="text-sm px-8 py-2 bg-purple-950 text-white hover:scale-105 transition-all hover:bg-purple-950/80
        rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
