import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('razorpay')
  const {navigate, backendUrl, token, cartItems, getCartAmount, deliveryFee, products} = useContext(ShopContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Handle form submission logic here
    try{
      let orderItems = [];
      for (let items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            let product = structuredClone(products.find((product) => product._id === items))
            if(product){
              // product = product.variants.find((variant) => variant.size === cartItems[items][item].size)
              product.size = item;
              product.quantity = cartItems[items][item];
              orderItems.push(product) 
            }
          }
        }
      }
      
      let orderData = {
        items: orderItems,
        address: formData,
        paymentMethod: method,
        totalAmount: getCartAmount() + deliveryFee,
      }

      const response = await axios.post(`${backendUrl}/api/orders/place`, orderData, {
        headers: {
          token,
        }
      } )

      console.log(response.data)
    } catch (error){
      console.log(error) 
    }
  };


  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------ Left Side ------- */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px] p-6 rounded-lg shadow-xl">
        <div className='text-xl sm:text-2xl my-3 text-white'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder='First Name'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Last Name'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='example@mail.com'
          required
          className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder='Street'
          required
          className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder='City'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder='State'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder='Zip Code'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder='Country'
            required
            className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
          />
        </div>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone'
          required
          className='bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 w-full text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200'
        />
      </div>

      {/* ------- Right Side ----------- */}
      {/* w-full grid justify-center */}
      <div className="mt-2.5">
        <div className="min-w-80">
          {<CartTotal />}
        </div>

        <div className='mt-16'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />
          {/* --------- Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${method === 'stripe' ? 'border-green-500' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div> */}
            <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-200 rounded-md  ${method === 'razorpay' ? 'border-green-500' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            {/* <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer  ${method === 'cod' ? 'border-green-500' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div> */}
          </div>

          <div className="w-full flex text-end mt-8 justify-start">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm sm:text-base w-full border border-gray-600 sm:w-auto">PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder