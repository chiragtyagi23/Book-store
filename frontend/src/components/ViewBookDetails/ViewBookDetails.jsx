import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaCartArrowDown } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';

function ViewBookDetails() {

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const role = useSelector((state)=>state.auth.role)
    const navigate = useNavigate()
    

  const { id } = useParams();


  const [Data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/get-book-by-id/${id}`)
      .then((result) => {
        result.json().then((resp) => {
          setData(resp.data);
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  function handleFavourite() {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
      bookid: id,
    };
  
    const datas = {};
  
    fetch('http://localhost:8000/api/v1/add-book-to-favourite', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json()) 
      .then((resp) => {
        if (resp.message === 'book is already in favourites') {
          alert('Book is already in favourites');
        } else {
          alert('Book added to favourites successfully!');
        }
      })
      .catch((error) => {
        console.error('Error adding book to favourites:', error);
        alert('Error adding book to favourites. Please try again later.');
      });
  }

  function handleCart() {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
      bookid: id,
    };
  
    const datas = {};
  
    fetch('http://localhost:8000/api/v1/add-to-cart', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json()) 
      .then((resp) => {
        if (resp.message === 'book is aleady present in cart') {
          alert('Book is already in cart')
          
        } else {
          alert('Book added to cart successfully!')
        }
      })
      .catch((error) => {
        console.error('Error adding book to favourites:', error);
        alert('Error adding book to favourites. Please try again later.');
      });
  }
  
  function deleteBook() {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
      bookid:id
    };
  
    fetch(`http://localhost:8000/api/v1/delete-book`, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .then((resp) => {
        alert(resp.message);
        navigate("/all-books")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  

  return (
    <>
      {/* Show Loader Until Data Loads */}
      {!Data ? (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          {/* Left Section - Book Image and Actions */}
          <div className="bg-zinc-800 rounded-lg p-4 h-auto lg:h-[88vh] w-full lg:w-3/6 flex flex-col items-center justify-between shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src={Data.url}
              alt="Book Cover"
              className="h-[50vh] lg:h-[70vh] rounded-lg shadow-md object-contain"
            />
            {isLoggedIn === true && role ==="user" && (
                <div className="flex gap-4 mt-6">
              {/* Add to Favourites Button */}
              <button className="bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 shadow-md transition-all duration-300"
              onClick={handleFavourite}
              >
                <FaHeart className="text-xl" />
                Add to Favourites
              </button>

              {/* Add to Cart Button */}
              <button className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 shadow-md transition-all duration-300"
              onClick={handleCart}
              >
                <FaCartArrowDown className="text-xl" />
                Add to Cart
              </button>
            </div>
            )}

            {isLoggedIn === true && role ==="admin" && (
                <div className="flex gap-4 mt-6">
              {/* edit Button */}
              <button className="bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 shadow-md transition-all duration-300">
              <FaEdit className="text-xl" />
                <NavLink to={`/updateBook/${id}`}>Edit Books</NavLink>
              </button>

              {/* Delete Button */}
              <button className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 shadow-md transition-all duration-300"
              onClick={deleteBook}
              >
                <MdDelete  className="text-xl" />
                Delete Books
              </button>
            </div>
            )}

          </div>

          {/* Right Section - Book Details */}
          <div className="py-4 w-full lg:w-3/6 space-y-6">
            {/* Book Title */}
            <h1 className="text-4xl text-zinc-300 font-bold leading-snug">{Data.title}</h1>

            {/* Author */}
            <p className="text-zinc-400 text-lg">
              By{' '}
              <span className="font-medium text-zinc-200">{Data.author}</span>
            </p>

            {/* Description */}
            <p className="text-zinc-500 mt-4 text-lg leading-relaxed">
              {Data.desc}
            </p>

            {/* Language */}
            <p className="flex items-center gap-2 text-zinc-400 mt-4">
              <GrLanguage className="text-xl text-zinc-400" />
              <span className="text-zinc-300">{Data.language}</span>
            </p>

            {/* Price Section */}
            <p className="mt-6 text-3xl font-semibold text-zinc-100">
              Price:{' '}
              <span className="text-green-400">₹{Data.price}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBookDetails;
