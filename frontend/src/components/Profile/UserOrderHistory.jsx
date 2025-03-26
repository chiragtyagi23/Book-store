import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";

function UserOrderHistory() {
  const [OrderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get-order-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setOrderHistory(resp.data || []);
      })
      .catch((err) => console.error("Error fetching order history:", err));
  }, []);

  return (
    <>
  {!OrderHistory && <div><Loader /></div>}
  {OrderHistory && OrderHistory.length === 0 && (
    <div className="h-[80] p-4 text-zinc-100">
      <div className="h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No order history</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/128/9961/9961218"
          alt=""
          className="h-[20vh] mb-8"
        />
      </div>
    </div>
  )}
  {OrderHistory && OrderHistory.length > 0 && (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
      
      {/* Table Header */}
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 grid grid-cols-12 gap-4">
        <div className="col-span-1 text-center">
          <h1 className="font-semibold">Sr.</h1>
        </div>
        <div className="col-span-3">
          <h1 className="font-semibold">Books</h1>
        </div>
        <div className="col-span-4">
          <h1 className="font-semibold">Description</h1>
        </div>
        <div className="col-span-1">
          <h1 className="font-semibold">Price</h1>
        </div>
        <div className="col-span-2">
          <h1 className="font-semibold">Status</h1>
        </div>
        <div className="hidden md:block col-span-1">
          <h1 className="font-semibold">Model</h1>
        </div>
      </div>

      {/* Order History List */}
      {OrderHistory.map((items, i) => (
        <div
          key={items._id}
          className="bg-zinc-800 w-full rounded py-2 px-4 grid grid-cols-12 gap-4 hover:bg-zinc-900 hover:cursor-pointer"
        >
          <div className="col-span-1 text-center">
            <h1>{i + 1}</h1>
          </div>
          <div className="col-span-3">
            <NavLink to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
              {items.book.title}
            </NavLink>
          </div>
          <div className="col-span-4">
            <h1>{items.book.desc.slice(0, 50)}...</h1>
          </div>
          <div className="col-span-1">
            <h1>{items.book.price}</h1>
          </div>
          <div className="col-span-2">
            <h1 className="font-semibold">
              {items.status === "order placed" ? (
                <div className="text-green-600">{items.status}</div>
              ) : items.status === "cancelled" ? (
                <div className="text-red-500">{items.status}</div>
              ) : (
                <div className="text-green-500">{items.status}</div>
              )}
            </h1>
          </div>
          <div className="hidden md:block col-span-1">
            <h1 className="text-sm text-zinc-400">COD</h1>
          </div>
        </div>
      ))}
    </div>
  )}
</>

  );
}

export default UserOrderHistory;
