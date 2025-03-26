import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

function Profile() {

  const [Profile, setProfile] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get-user-information", { headers }).then((res) => {
      res.json().then((resp) => {
        setProfile(resp)
      })
    })
  }, [])

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white'>
      {/* Show Loader if Profile is Not Loaded */}
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {/* Main Content */}
      {Profile && (
        <>
          {/* Sidebar with Reduced Height */}
          <div className='w-full md:w-1/6'>
            <div className='h-auto md:h-[80vh] flex items-start md:items-center justify-center'>
              <Sidebar data={Profile} />
            </div>
          </div>

          {/* Outlet Section */}
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
