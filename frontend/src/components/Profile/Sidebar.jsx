import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

function Sidebar(props) {
  
  const dispatch = useDispatch()
  const history = useNavigate()
  const role = useSelector((state)=>state.auth.role)
  return (
    <div className='bg-zinc-700 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
      {/* Profile Info */}
      <div className='flex flex-col items-center justify-center'>
        <img
          src={props.data.avatar}
          alt={props.data.username}
          className='h-[15vh] rounded-full border-4 border-zinc-500 shadow-md'
        />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{props.data.username}</p>
        <p className='mt-1 text-sm text-zinc-300'>{props.data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500'></div>
      </div>

      {/* Navigation Links - Visible on All Screen Sizes */}
      {role==="user" && <div className='w-full flex flex-col items-center justify-center mt-4'>
        <NavLink
          to="/profile"
          className="text-zinc-100 font-semibold w-full my-2 text-center py-2 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </NavLink>
        <NavLink
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full my-2 text-center py-2 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </NavLink>
        <NavLink
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full my-2 text-center py-2 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </NavLink>
      </div>}

      {role === "admin" && (
  <div
    className="w-60 bg-zinc-800 rounded-lg shadow-md mt-4 p-2 flex flex-col items-center space-y-3"
    style={{ height: "auto", maxHeight: "160px" }}
  >
    <NavLink
      to="/profile"
      className="text-zinc-100 font-semibold w-full text-center py-2 hover:bg-zinc-900 rounded transition-all duration-300"
    >
      All Orders
    </NavLink>
    <NavLink
      to="/profile/add-book"
      className="text-zinc-100 font-semibold w-full text-center py-2 hover:bg-zinc-900 rounded transition-all duration-300"
    >
      Add Books
    </NavLink>
  </div>
)}



      {/* Logout Button */}
      <button className="bg-zinc-900 w-3/5 lg:w-full mt-4 text-white font-semibold flex items-center justify-center px-4 py-2 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-600 hover:scale-105 hover:shadow-lg transition-all duration-300"
      onClick={()=>{
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"))
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("role")
        history("/")
      }}
      >
        Log Out
        <IoIosLogOut className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  )
}

export default Sidebar
