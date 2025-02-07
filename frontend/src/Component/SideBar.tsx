import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/code", label: "Code" },
  { path: "/draw", label: "Draw" },
  { path: "/type", label: "Type" },
];

interface SideBarProps {
  setHelper: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({setHelper}) => {
  const location = useLocation();



  // Hide sidebar on the homepage
  if (location.pathname === "/") return null;

  return (
    <div className="side_bar">
      <Toaster/>
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <button onClick={()=>toast("changed to " + link.label + " mode")}>{link.label}</button>
        </NavLink>
      ))}
      <button onClick={()=>setHelper((prev: any)=>!prev)}>
        <img src="https://img.icons8.com/?size=100&id=dCPtu3qMsOzv&format=png&color=000000" className="_sideBarIcon" alt="" />
      </button>
    </div>
  );
};

export default SideBar;
