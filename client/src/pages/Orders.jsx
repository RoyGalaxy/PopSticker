import React, { useContext, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
  const { currency, products } = useContext(ShopContext);


  return (
    <div className='border-t pt-16'>
      <div className="text-2xl text-gray-200">
        <Title text1='MY' text2='ORDERS' />
      </div>

      <div className="">
        {
          products.slice(28,32).map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img src={item.images[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-300'>
                    <p className='text-lg'>{currency} {item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p>Date: <span className='text-gray-400'>25, July 2024</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-end gap-8">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base text-gray-200'>Ready to Ship</p>
                </div>
                <button className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm text-gray-200 hover:bg-gray-700 hover:text-gray-200 transition-colors'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders