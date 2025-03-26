import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";

function Cart() {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch user cart
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get-user-cart", { headers })
      .then((res) => res.json())
      .then((resp) => {
        setCart(resp.data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // Delete item from cart
  const deleteItem = (id) => {
    fetch(`http://localhost:8000/api/v1/remove-from-cart/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        userId: localStorage.getItem("id"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        const updatedCart = Cart.filter((item) => item._id !== id);
        setCart(updatedCart);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // Calculate Grand Total
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  }, [Cart]);

  // Place order function

  const PlaceOrder = async () => {
    try {
      // Send the entire Cart array as the order
      const response = await axios.post(
        `http://localhost:8000/api/v1/place-order`,
        { order: Cart }, // Send the full Cart array
        { headers }
      );
  
      console.log("response", response);
  
      // Clear the cart after successful order placement
      setCart([]); // Empty the cart
      setTotal(0); // Reset total to 0
  
      // Navigate to order history after placing order
      navigate("/profile/orderHistory");
  
      console.log("All orders placed successfully!");
    } catch (error) {
      console.log("Error placing orders:", error);
    }
  };
  


  return (
    <>
      {/* Show Loader if Cart is Loading */}
      {!Cart && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}

      {/* Show Empty Cart Message */}
      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-zinc-900 rounded-lg shadow-lg p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="Empty Cart"
            className="w-20 h-20 mb-6 animate-bounce"
          />
          <h2 className="text-3xl text-zinc-200 font-bold mb-4">
            Your cart is empty!
          </h2>
          <p className="text-zinc-400 mb-6 text-lg">
            Looks like you haven't added anything to your cart yet. 📚
          </p>
          <NavLink
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md text-lg transition-transform duration-300 hover:scale-105"
          >
            Browse Books
          </NavLink>
        </div>
      )}

      {/* Show Cart Items */}
      {Cart && Cart.length > 0 && (
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-zinc-500 mb-6 text-center">
            🛒 Your Cart
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Cart.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {/* Book Image */}
                <img
                  src={item.url}
                  alt="cart-img"
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />

                {/* Book Details */}
                <div className="flex flex-col justify-between">
                  <h1 className="text-2xl font-semibold text-zinc-200">
                    {item.title}
                  </h1>
                  <p className="text-zinc-400 mt-2 hidden lg:block">
                    {item.desc.slice(0, 100)}...
                  </p>
                  <p className="text-zinc-400 mt-2 hidden md:block lg:hidden">
                    {item.desc.slice(0, 65)}...
                  </p>
                  <p className="text-zinc-400 mt-2 md:hidden">
                    {item.desc.slice(0, 100)}
                  </p>
                </div>

                {/* Price and Delete Button */}
                <div className="mt-4 flex justify-between items-center">
                  <h2 className="text-xl text-green-400 font-semibold">
                    ₹ {item.price}
                  </h2>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                  >
                    <AiFillDelete className="text-2xl" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total Section */}
          <div className="flex justify-center items-center mt-8">
            <div className="bg-zinc-800 text-zinc-200 p-6 rounded-lg shadow-lg text-center w-96 hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-2">💸 Grand Total</h2>
              <p className="text-3xl text-green-400 font-bold">
                ₹ {Total.toFixed(2)}
              </p>
              <p className="text-zinc-400 mt-2">
                Thank you for shopping with us! 🎉
              </p>

              {/* Place Order Button */}
              <button
                onClick={PlaceOrder}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md text-lg mt-6 transition-transform duration-300 hover:scale-105"
              >
                🚀 Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
