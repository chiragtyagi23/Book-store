import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Settings() {
  const [values, setvalues] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get-user-information", { headers })
      .then((res) => res.json())
      .then((resp) => {
        setProfileData(resp);
        setvalues({ address: resp.address }); 
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  // Handle address change
  function change(e) {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  }

  // Submit updated address
  function submitAddress() {
    fetch("http://localhost:8000/api/v1/update-address", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("Updated:", resp);
      })
      .catch((err) => console.log("Error updating address:", err));
  }

  return (
    <>
      {!ProfileData ? (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-zinc-900 p-6 rounded-2xl shadow-2xl text-white mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-pink-600 to-purple-600 opacity-20 rounded-2xl"></div>

          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-zinc-700"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {ProfileData.username}
              </h1>
              <p className="text-zinc-400">Welcome back, {ProfileData.username}!</p>
            </div>
          </div>

          {/* Profile Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Username */}
            <div className="bg-zinc-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-all">
              <h2 className="text-sm text-zinc-400 uppercase mb-2">Username</h2>
              <p className="text-lg font-semibold text-zinc-100">
                {ProfileData.username}
              </p>
            </div>

            {/* Email */}
            <div className="bg-zinc-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-all">
              <h2 className="text-sm text-zinc-400 uppercase mb-2">Email</h2>
              <p className="text-lg font-semibold text-zinc-100">
                {ProfileData.email}
              </p>
            </div>

            {/* Address with Textarea */}
            <div className="bg-zinc-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-all">
              <h2 className="text-sm text-zinc-400 uppercase mb-2">Address</h2>
              <textarea
                name="address"
                onChange={change}
                value={values.address}
                className="w-full bg-zinc-700 text-zinc-100 p-3 rounded-lg resize-none h-28 outline-none border-2 border-zinc-600 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-8 text-center relative z-10">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-all shadow-lg"
              onClick={submitAddress}
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
