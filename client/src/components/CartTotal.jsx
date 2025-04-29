import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext)

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm text-text'>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className='text-muted'>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p className='text-muted'>{currency} {deliveryFee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b className='text-muted'>{currency} {getCartAmount() > 0 ? getCartAmount() + deliveryFee : '0'}.00</b>
        </div>

      </div>


    </div>
  )
}

export default CartTotal