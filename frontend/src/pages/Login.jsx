import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

function Login() {

  const[Values,setValues] = useState({username:"",password:""})
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const change = (e)=>{
      const {name,value} = e.target
      setValues({...Values,[name]:value})
    }
  
    const submit = async(e)=>{
      e.preventDefault()
      try {
        if(Values.username==="" || Values.password===""){
          alert("All fields are required")  
        }else{
          const datas = {
            username: Values.username,
            password: Values.password,
          };
          fetch("http://localhost:8000/api/v1/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
          })
            .then((res) => res.json()) 
            .then((resp) => {
              // console.log("Full Response:", resp); // Check full response
              
              dispatch(authActions.login())
              dispatch(authActions.changeRole(resp.role))

              if (resp.id && resp.token && resp.role) {
                localStorage.setItem("id", resp.id); 
                localStorage.setItem("token", resp.token);
                localStorage.setItem("role", resp.role);
                // console.log("Data stored successfully!");
                navigate("/profile")
              } else {
                alert(resp.message)
                // console.error("Incorrect response format. Check resp:", resp);
              }
          

            })
            .catch((error) => {
              // console.error("Error:", error.message);
            });
          
          }
      } catch (error) {
        alert(error.resp.datas.message);
        
        
      }
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 flex items-center justify-center px-4">
      {/* Main Container */}
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm text-zinc-200">
        <h2 className="text-2xl font-bold text-center text-white mb-5">Welcome Back!</h2>

        <form className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-zinc-400" />
            <input
              type="username"
              name="username"
              placeholder="Username"
              value={Values.username}
              onChange={change}
              autoComplete='username'
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
              autoComplete='password'
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300"
            onClick={submit}>
            Log In
          </button>
        </form>

        {/* Forgot Password and Signup Link */}
        <div className="text-center mt-4 text-sm text-zinc-400">
          <a href="/forgot-password" className="text-purple-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        
        <p className="text-center text-zinc-400 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
