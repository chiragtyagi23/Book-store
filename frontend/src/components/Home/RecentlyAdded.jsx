import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

function RecentlyAdded() {

    const[Data,setData] = useState([])
    useEffect(()=>{
        fetch("http://localhost:8000/api/v1/get-recent-books").then((result)=>{
            result.json().then((resp)=>{
                // console.log("recent books",resp.data);
                setData(resp.data)
            })
        })
    },[])


  return (
    <div className='mt-8 px-4'>
     <h3 className='text-3xl text-yellow-100'> Recently Added Books</h3>
     {!Data && <div className='flex items-center justify-center my-8'><Loader/></div>  }
     <div className='my-4 grid grid-cols-1 sm-grid-cols-3 md:grid-cols-4 gap-4'> 
        {Data && Data.map((items,i)=>
            <div key={i}><BookCard data = {items} />{" "}</div>
        )}
     </div>
    </div>
  )
}

export default RecentlyAdded
