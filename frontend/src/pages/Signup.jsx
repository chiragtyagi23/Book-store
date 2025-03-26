import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const[Values,setValues] = useState({username:"",email:"",password:"",address:""})
  
  const navigate = useNavigate()

  const change = (e)=>{
    const {name,value} = e.target
    setValues({...Values,[name]:value})
  }

  const submit = async(e)=>{
    e.preventDefault()
    try {
      if(Values.username==="" || Values.email==="" || Values.password==="" || Values.address===""){
        alert("All fields are required")  
      }else{
        const datas = {
          username: Values.username,
          email: Values.email,
          password: Values.password,
          address: Values.address,
        };
        fetch("http://localhost:8000/api/v1/sign-up",{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
          },
          body: JSON.stringify(datas)
        }).then((res)=>{
          res.json().then((resp)=>{
            console.log("signup",resp.message);
            navigate("/Login")
          })
        })
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center px-4">
      {/* Main Container */}
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm text-zinc-200">
        <h2 className="text-2xl font-bold text-center text-white mb-5">Create an Account</h2>
        
        <form className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-zinc-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={Values.username}
              onChange={change}
              autoComplete="username"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={Values.email}
              onChange={change}
              autoComplete="email"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-zinc-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={Values.password}
              onChange={change}
              autoComplete="password"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
              required
            />
          </div>

          {/* Address Input */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-4 text-zinc-400" />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={Values.address}
              onChange={change}
              autoComplete="address"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 " 
            onClick={submit}  >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
