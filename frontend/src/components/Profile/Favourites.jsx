import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

function Favourites() {

  const [Favourites,setFavourites] = useState([])

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };


  useEffect(() => {
    fetch('http://localhost:8000/api/v1/get-favourite-books', { headers })
      .then((res) => res.json())
      .then((resp) => {
        setFavourites(resp.data );
        
      });
  }, [Favourites]);
  
  
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-zinc-900 rounded-lg shadow-lg">
  {Favourites.length > 0 ? (
    Favourites.map((items, i) => (
      <div
        key={i}
        className="bg-zinc-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      >
        <BookCard data={items} favourite={true} />
      </div>
    ))
  ) : (
    <p className="col-span-full text-zinc-300 text-center mt-12 text-xl">
      No favourites found! 📚
    </p>
  )}
</div>

  );
  
}

export default Favourites
