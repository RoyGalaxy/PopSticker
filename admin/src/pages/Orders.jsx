import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };


  const getAllOrders = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/list`, {}, {
        headers: {
          token,
        }
      })

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const statusChangeHandler = async (e, orderId) => {
    const status = e.target.value
    try {
      const response = await axios.post(`${backendUrl}/api/orders/status`, {
        orderId,
        status,
      }, {
        headers: {
          token,
        }
      })
      
      if (response.data.success) {
        await getAllOrders();
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    token && getAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
              <img src={assets.parcel_icon} className='w-12' alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index} className='py-0.5]'>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      )
                    } else {
                      return (
                        <p key={index} className='py-0.5]'>{item.name} x {item.quantity} <span>{item.size}</span>, </p>
                      )
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{`${order.address.firstName} ${order.address.lastName}`}</p>
                <div>
                  <p>{`${order.address.street},`}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>items: {order.items.length}</p>
                <p className='mt-3'>method: {order.paymentMethod}</p>
                <p>payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString('en-Us', dateOptions)}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
              <select onChange={(e) => statusChangeHandler(e, order._id)} value={order.status} className='sp-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders