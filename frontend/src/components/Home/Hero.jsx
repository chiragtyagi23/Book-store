import React from 'react'
import { NavLink } from 'react-router-dom'

function Hero() {
  return (
    <div className="h-auto md:h-[75vh] flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 px-6 md:px-12 lg:px-20">
  {/* Left Section: Text and Button */}
  <div className="w-full md:w-3/6 flex flex-col items-center md:items-start justify-center text-center md:text-left mb-10 md:mb-0">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-yellow-100">
      Discover Your Next Great Read
    </h1>
    <p className="mt-4 text-lg sm:text-xl text-zinc-300">
      Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
    </p>
    <NavLink to={"/all-books"} className="mt-8 sm:mt-10">
      <button className="text-yellow-100 text-lg sm:text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 sm:px-10 py-2 sm:py-3 hover:bg-zinc-800 rounded-full transition-all duration-300">
        Discover Books
      </button>
    </NavLink>
  </div>

  {/* Right Section: Image */}
  <div className="w-full md:w-3/6 flex items-center justify-center">
    <img
      className="w-60 sm:w-72 md:w-80 lg:w-96 h-60 sm:h-72 md:h-80 lg:h-96 rounded-full object-cover border-4 border-yellow-400"
      src="https://img.freepik.com/free-vector/girl-reading-books-stack-books_1308-97387.jpg?t=st=1742801712~exp=1742805312~hmac=bbcb2a56d60bca9757d96543724ee4926f2d8124ec5eaadbde8560c63b9213f0&w=740"
      alt="Book-Store"
    />
  </div>
</div>


  )
}

export default Hero
