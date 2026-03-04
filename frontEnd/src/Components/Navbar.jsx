import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

function Navbar() {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rouunded-full text-sm
      cursor-pointer rounded-4xl bg-purple-950 hover:scale-102 transition-all hover:bg-purple-950/80 text-white px-10 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
}

export default Navbar;
