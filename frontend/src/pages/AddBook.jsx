import axios from 'axios'
import React, { lazy, useState } from 'react'

function AddBook() {

    const[data,setdata] = useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:""
    })

    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`
    }

    function change(e){
        const {name,value} = e.target 
        setdata({...data,[name]:value})
    }

    const submit = async () => {
        try {
          if (
            data.url === "" ||
            data.title === "" ||
            data.author === "" ||
            data.price === "" ||
            data.desc === "" ||
            data.language === ""
          ) {
            alert("All fields are required");
          } else {
            const resp = await axios.post(
              "http://localhost:8000/api/v1/add-book",
              data,
              { headers }
            );
            setdata({
              url: "",
              title: "",
              author: "",
              price: "",
              desc: "",
              language: ""
            });
            alert(resp.data.message); // Corrected alert
          }
        } catch (error) {
          alert(error.response?.data?.message || "An error occurred");
        }
      };
      

    

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden">
        {/* Subtle Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-700 via-sky-500 to-sky-300 opacity-10 rounded-2xl"></div>

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center relative z-10">
          📚 Add New Book
        </h2>

        {/* Form Container */}
        <div className="space-y-4 relative z-10">
          {/* Book Image URL */}
          <div>
            <label className="text-zinc-300 block mb-2">Book Image URL</label>
            <input
              type="text"
              name='url'
              required
              value={data.url}
              onChange={change}
              placeholder="Enter image URL..."
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Book Title */}
          <div>
            <label className="text-zinc-300 block mb-2">Book Title</label>
            <input
              type="text"
              name='title'
              required
              value={data.title}
              onChange={change}
              placeholder="Enter book title..."
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="text-zinc-300 block mb-2">Author</label>
            <input
              type="text"
              name='author'
              required
              value={data.author}
              onChange={change}
              placeholder="Enter author's name..."
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-zinc-300 block mb-2">Language</label>
            <input
              type="text"
              name='language'
              required
              value={data.language}
              onChange={change}
              placeholder="Enter language..."
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-zinc-300 block mb-2">Description</label>
            <textarea
              placeholder="Enter book description..."
              name='desc'
              required
              value={data.desc}
              onChange={change}
              rows="4"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg resize-none outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-zinc-300 block mb-2">Price (₹)</label>
            <input
              type="number"
              name='price'
              required
              value={data.price}
              onChange={change}
              placeholder="Enter price..."
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Add Book Button */}
          <div className="mt-6 text-center" onClick={submit}>
            <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all shadow-lg">
              📚 Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBook
