import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/products');
      console.log(res.data)
      if(res.data.success){
        setList(res.data.products);
      } else {
        toast.error(res.data.message) 
      }
    } catch  (err) {
      toast.error('Some error occured')
      console.log(err)
    }
  }

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/products/${id}`, { 
        headers: {
          token
        }
      })

      if (res.data.success){
        toast.success(res.data.message)
        await fetchList()
      }
    } catch (error) {
      console.log(error)
      toast.error('Some error occured!!')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-2'>
        {/* --------------------List Table TItle---------------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 bg-gray-100 text-sm rounded-md'>
          <b className='w-1/6'>Imagee</b>
          <b className='w-1/6'>Name</b>
          <b className='w-1/6'>Category</b>
          <b className='w-1/6'>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------------ Product List -------------- */}

        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 bg-gray-100 text-sm rounded-md'>
              
              <img src={list[index].images[0]} alt={item.name} className='w-16 h-16 object-cover' />
              
              <p className=''>{item.name}</p>
              <p className=''>{item.category}</p>
              <p className=''>{currency}{item.price}</p>
              <div className=' text-center'>
                <button onClick={() => removeProduct(item._id)} className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
              </div>
            </div>
          ))
        }

        
      </div>

    </>
  )
}

export default List