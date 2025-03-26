import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function UpdateBook() {
  const [data, setdata] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/get-book-by-id/${id}`)
      .then((result) => {
        result.json().then((resp) => {
          setdata(resp.data);
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : id
  };

  function change(e) {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
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
        const resp = await axios.put(
          "http://localhost:8000/api/v1/update-book",
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
        alert(resp.data.message);
        navigate("/all-books")
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };


  return (
    <div className="min-h-screen bg-zinc-900 p-6 flex justify-center items-center">
      <div className="bg-zinc-800 w-full max-w-5xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-400 opacity-10 rounded-2xl"></div>

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center relative z-10">
          ✏️ Update Book Details
        </h2>

        {/* Form Container */}
        <div className="space-y-6 relative z-10">
          {/* Book Card with Image */}
          <div className="bg-zinc-700 p-6 rounded-lg flex items-center gap-6 shadow-lg">
            {/* Book Image */}
            {data.url ? (
              <img
                src={data.url}
                alt="Book"
                className="w-24 h-32 rounded-lg object-cover border-2 border-zinc-600"
              />
            ) : (
              <div className="w-24 h-32 rounded-lg bg-zinc-600 flex items-center justify-center border-2 border-zinc-600">
                <span className="text-zinc-400">No Image</span>
              </div>
            )}

            {/* Input Fields */}
            <div className="flex-1 space-y-4">
              {/* URL */}
              <input
                type="text"
                name="url"
                value={data.url}
                onChange={change}
                placeholder="Enter image URL..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
              {/* Title */}
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={change}
                placeholder="Enter book title..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
              {/* Author */}
              <input
                type="text"
                name="author"
                value={data.author}
                onChange={change}
                placeholder="Enter author's name..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
              {/* Language */}
              <input
                type="text"
                name="language"
                value={data.language}
                onChange={change}
                placeholder="Enter language..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
              {/* Description */}
              <textarea
                name="desc"
                value={data.desc}
                onChange={change}
                rows="3"
                placeholder="Enter book description..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg resize-none outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
              {/* Price */}
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={change}
                placeholder="Enter price..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none border-2 border-zinc-600 focus:border-green-500 transition-all"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button
              onClick={submit}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all shadow-lg"
            >
              ✅ Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
