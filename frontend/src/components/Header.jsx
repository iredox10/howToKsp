import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#045C0D] p-4 flex justify-between">
      <NavLink to={"/"}>Home</NavLink>
      <div>
        <NavLink to={"/login"}>login</NavLink>
      </div>
    </div>
  );
};

export default Header;
