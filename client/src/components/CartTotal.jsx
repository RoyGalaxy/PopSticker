import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount, cartItems } = useContext(ShopContext)
  const [cartAmount, setCartAmount] = useState(0)

  useEffect(() => {
    setCartAmount(getCartAmount()) 
  }, [cartItems])

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm text-text'>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className='text-muted'>{currency} {cartAmount}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p className='text-muted'>{currency} {deliveryFee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b className='text-muted'>{currency} {cartAmount > 0 ? cartAmount + deliveryFee : '0'}.00</b>
        </div>

      </div>


    </div>
  )
}

export default CartTotal