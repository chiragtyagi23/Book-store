import React from 'react'
import { NavLink } from 'react-router-dom'

function Hero() {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16'>
  <div className='w-full mb:12 md:mb-0 lg:w-3/6 flex flex-col items-left lg:items-start justify-center'>
    <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-left lg:text-left'>
      Discover Your Next Great Read
    </h1>
    <p className='mt-4 text-xl text-zinc-300 text-left lg:text-left'>
      Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
    </p>
    <NavLink to={"/all-books"} className='mt-10'>
      <button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
        Discover Books
      </button>
    </NavLink>
  </div>
  <div className='w-3/6 lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
    <img
      className='w-80 h-80 rounded-full object-cover border-4 border-yellow-400'
      src='https://img.freepik.com/free-vector/girl-reading-books-stack-books_1308-97387.jpg?t=st=1742801712~exp=1742805312~hmac=bbcb2a56d60bca9757d96543724ee4926f2d8124ec5eaadbde8560c63b9213f0&w=740'
      alt='Book-Store'
    />
  </div>
</div>

  )
}

export default Hero
