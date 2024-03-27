import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return <div className="bg-[#045C0D;] p-4">
    <NavLink to={'/'}>Home</NavLink>
  </div>;
};

export default Header;
