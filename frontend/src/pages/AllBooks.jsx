import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader/Loader"
import BookCard from '../components/BookCard/BookCard'

function AllBooks() {
  const[Data,setData] = useState([])
      useEffect(()=>{
          fetch("http://localhost:8000/api/v1/get-all-books").then((result)=>{
              result.json().then((resp)=>{
                  // console.log("recent books",resp.data);
                  setData(resp.data)
              })
          })
      },[])

  return (
    <div className='bg-zinc-900 px-4 h-auto px-12 py-12 '>
      <h1 className='text-3xl text-yellow-100 text-center'> All Books</h1>
     {!Data && <div className='flex items-center justify-center my-8'><Loader/></div>  }
     <div className='my-4 grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 gap-4'> 
        {Data && Data.map((items,i)=>
            <div key={i}><BookCard data = {items} />{" "}</div>
        )}
     </div>
    </div>
  )
}

export default AllBooks
