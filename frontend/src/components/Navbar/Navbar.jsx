import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/io5";
import {useSelector} from "react-redux"

function Navbar() {
    const links = [
        {
            title:"Home",
            link:"/"
        },
        {
            title:"About Us",
            link:"/about-us"
        },
        {
            title:"All Books",
            link:"/all-books"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
          title:"Admin Profile",
          link:"/profile"
      },

    ]

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const role = useSelector((state)=>state.auth.role)

    if(isLoggedIn===false){
      links.splice(3,3)
    }

    if(isLoggedIn===true && role === "user"){
      links.splice(5,1)
    }
    
    if(isLoggedIn===true && role === "admin"){
      links.splice(4,1)
    }

    const[mobilenav,setmobilenav] = useState("hidden")

  return (
    <>
  <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
    {/* Logo */}
    <NavLink to={"/"} className="flex justify-center items-center">
      <img
        className="h-10 me-4"
        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
        alt="logo-book"
      />
      <h1 className="text-2xl font-semibold">BookHeaven</h1>
    </NavLink>

    {/* Desktop Nav Links */}
    <div className="nav-links-bookheaven hidden md:flex items-center gap-4">
      {links.map((items, i) => (
        <NavLink
          to={items.link}
          className="hover:text-blue-500 transition-all duration-250"
          key={i}
        >
          {items.title}
        </NavLink>
      ))}

      {/* Login/Signup Links (Desktop) */}
      {isLoggedIn === false && (
        <>
          <NavLink
            to={"/Login"}
            className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Login
          </NavLink>
          <NavLink
            to={"/Signup"}
            className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign-Up
          </NavLink>
        </>
      )}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden block text-white text-2xl hover:text-blue-600"
      onClick={() =>
        mobilenav === "hidden"
          ? setmobilenav("block")
          : setmobilenav("hidden")
      }
    >
      <IoMenuSharp />
    </button>
  </nav>

  {/* Mobile Navigation Menu */}
  <div
    className={`${mobilenav} bg-zinc-800 fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 overflow-y-auto`}
  >
    {links.map((items, i) => (
      <NavLink
        to={items.link}
        className="text-white text-2xl font-semibold hover:text-blue-500 transition-all duration-250"
        key={i}
        onClick={() => setmobilenav("hidden")} // Close menu after clicking
      >
        {items.title}
      </NavLink>
    ))}

    {/* Login/Signup Links (Mobile) */}
    {isLoggedIn === false && (
      <>
        <NavLink
          to={"/Login"}
          className="px-4 py-2 text-2xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={() => setmobilenav("hidden")}
        >
          Login
        </NavLink>
        <NavLink
          to={"/Signup"}
          className="px-4 py-2 text-2xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={() => setmobilenav("hidden")}
        >
          Sign-Up
        </NavLink>
      </>
    )}
  </div>
</>

  )
}

export default Navbar
