import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

function AllOrders() {
  const [AllOrders, setAllOrders] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get-all-orders", { headers })
      .then((res) => res.json())
      .then((resp) => {
        // console.log("user", resp.data);
        setAllOrders(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const toggleDropdown = (orderId) => {
    setDropdownOpen(dropdownOpen === orderId ? null : orderId);
  };

  const toggleUserDetails = (orderId) => {
    setShowUserDetails(showUserDetails === orderId ? null : orderId);
  };

  const updateOrderStatus = async (orderId) => {
    if (!selectedStatus[orderId]) {
      alert("Please select a status before submitting!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/update-status/${orderId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ status: selectedStatus[orderId] }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("✅ Status updated successfully!");
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: selectedStatus[orderId] }
              : order
          )
        );
      } else {
        alert(`Failed to update status: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Internal server error.");
    } finally {
      setLoading(false);
      setDropdownOpen(null);
    }
  };

  return (
    <>
      {!AllOrders && (
        <div>
          <Loader />
        </div>
      )}

      {AllOrders && (
        <div className="min-h-screen bg-zinc-900 p-4 sm:p-6 flex justify-center items-center">
          <div className="bg-zinc-800 w-full max-w-5xl p-4 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-400 opacity-10 rounded-2xl"></div>

            <h2 className="text-3xl font-bold text-white mb-6 text-center relative z-10">
              📦 All Orders
            </h2>

            <div className="space-y-6 relative z-10">
              {AllOrders.length > 0 ? (
                AllOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-zinc-700 p-4 sm:p-6 rounded-lg flex flex-col gap-4 shadow-lg hover:scale-105 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <img
                        src={
                          order.book?.url ||
                          "https://via.placeholder.com/150"
                        }
                        alt={order.book?.title || "No Title"}
                        className="w-24 h-32 rounded-lg object-cover border-2 border-zinc-600"
                      />

                      <div className="flex flex-col justify-between flex-1 w-full">
                        <h3 className="text-xl font-semibold text-white text-center sm:text-left">
                          {order.book?.title || "Book Title"}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-1 text-center sm:text-left">
                          by {order.book?.author || "Author Name"}
                        </p>
                        <p className="text-lg text-green-400 font-bold text-center sm:text-left">
                          ₹{order.book?.price || "0"}
                        </p>

                        <div className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                          <p className="text-sm text-zinc-400 text-center sm:text-left">
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>

                          <div className="relative w-full sm:w-auto">
                            <button
                              onClick={() => toggleDropdown(order._id)}
                              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold text-center ${
                                selectedStatus[order._id] === "Delivered"
                                  ? "bg-green-700 text-green-300"
                                  : selectedStatus[order._id] === "Cancelled"
                                  ? "bg-red-700 text-red-300"
                                  : selectedStatus[order._id] ===
                                    "Out for Delivery"
                                  ? "bg-yellow-700 text-yellow-300"
                                  : "bg-blue-700 text-blue-300"
                              }`}
                            >
                              {selectedStatus[order._id] ||
                                order.status ||
                                "Order Placed"}
                            </button>

                            {dropdownOpen === order._id && (
                              <div className="absolute w-full sm:w-48 mt-2 bg-zinc-800 shadow-lg rounded-lg z-20">
                                {[
                                  "Order Placed",
                                  "Out for Delivery",
                                  "Delivered",
                                  "Cancelled",
                                ].map((status) => (
                                  <button
                                    key={status}
                                    onClick={() =>
                                      handleStatusChange(order._id, status)
                                    }
                                    className={`block w-full text-left px-4 py-2 text-sm ${
                                      selectedStatus[order._id] === status
                                        ? "bg-zinc-700 text-green-400"
                                        : "text-zinc-300 hover:bg-zinc-700"
                                    }`}
                                  >
                                    {status}
                                  </button>
                                ))}

                                <button
                                  onClick={() => updateOrderStatus(order._id)}
                                  className="block w-full text-center px-4 py-2 text-sm bg-green-700 text-white hover:bg-green-600 mt-1"
                                  disabled={loading}
                                >
                                  {loading ? "Updating..." : "✅ Submit"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleUserDetails(order._id)}
                      className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-purple-400 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                    >
                      {showUserDetails === order._id ? (
                        <span>🔽 Hide Details</span>
                      ) : (
                        <span>👁️ View Details</span>
                      )}
                    </button>

                    {showUserDetails === order._id && (
                      <div className="mt-4 bg-zinc-800 p-4 rounded-lg shadow-lg w-full">
                        <h4 className="text-lg font-bold text-green-400 mb-2">
                          👤 User Details
                        </h4>
                        <p className="text-zinc-300">
                          📛 <strong>Name:</strong>{" "}
                          {order.user?.username || "N/A"}
                        </p>
                        <p className="text-zinc-300">
                          📧 <strong>Email:</strong>{" "}
                          {order.user?.email || "N/A"}
                        </p>
                        <p className="text-zinc-300">
                          📍 <strong>Address:</strong>{" "}
                          {order.user?.address || "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-zinc-400 mt-8">
                  You have no orders yet. Start purchasing your favorite books! 📚
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllOrders;
