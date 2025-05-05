import React from 'react';
import { NavLink } from 'react-router-dom';

function BookCard(prop) {
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : prop.data._id
  }

  const handleRemoveBook = () => {
    fetch("http://localhost:8000/api/v1/remove-book-from-favourite", {
      method: "PUT",
      headers: headers,
    })
      .then((res) => res.json())
      .then((resp) => {
        alert(resp.message);
      })
      .catch((error) => {
        alert("Error deleting book:", error);
      });
  };
  

  return (
    <div>
      <NavLink to={`/view-book-details/${prop.data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col items-center justify-center">
          <div className="bg-zinc-900 rounded w-full flex items-center justify-center">
            <img
              src={prop.data.url}
              alt="/"
              className="h-[40vh] w-full object-cover rounded"
            />
          </div>
          <h2 className="mt-4 text-xl text-zinc-200 font-semibold text-center">
            {prop.data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">BY-{prop.data.author}</p>
          <p className="mt-2 text-zinc-400 font-semibold text-xl">
            ₹ {prop.data.price}
          </p>
        </div>
      </NavLink>

      {/* Show button only in Favourites */}
      {prop.favourite && (
        <button
          className="bg-yellow-100 text-xl px-4 py-2 mt-4 rounded border border-yellow-500 text-orange-500"
          onClick={handleRemoveBook}
        >
          Remove From Favourites
        </button>
      )}
    </div>
  );
}

export default BookCard;
