import React, { use, useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([])

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  

  const getOrders = async () => {
    try {
      if(!token) return null;
      let response = await axios.post(`${backendUrl}/api/orders/user-orders`, {}, {
        headers: {
          token,
        }
      })

      if(response.data.success) {
        let orderItems = [];
        response.data.orders.map(order => {
          order.items.map(item => {
            item.status = order.status;
            item.date = order.createdAt;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            orderItems.push(item)
          })
        })
        setOrders(orderItems)
      }
    } catch (error) {
      console.log(error)
     }
  }  

  useEffect(() => {
    getOrders()
  }, [token])


  return (
    <div className='border-t pt-16'>
      <div className="text-2xl text-gray-200">
        <Title text1='MY' text2='ORDERS' />
      </div>

      <div className="">
        {
          orders.map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-gray-300 text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img src={item.images[0]} className='w-16 sm:w-20 bg-gray-200 rounded-md' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-300'>
                    <p >{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  {/* <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.data).toDateString()}</span></p> */}
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleString('en-US', dateOptions)}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-end gap-8">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base text-gray-200'>{item.status}</p>
                </div>
                <button onClick={getOrders} className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm text-gray-200 hover:bg-gray-700 hover:text-gray-200 transition-colors'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders