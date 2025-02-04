import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const SideBar = () => {
    const location = useLocation();
  
    // Hide sidebar only on the homepage
    if (location.pathname === "/") return null;

  return (
    <div className='side_bar'>
    <NavLink
      to="/code"
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <button>Code</button>
    </NavLink>
    <NavLink
      to="/draw"
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <button>Draw</button>
    </NavLink>
    <NavLink
      to="/type"
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <button>Type</button>
    </NavLink>
</div>
  )
}

export default SideBar
