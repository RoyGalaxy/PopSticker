import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Counter from '@/components/ReactBits/Counter'

const Cart = () => {
  const { currency, products, cartItems, updateQuantity, navigate, getCartAmount, toast } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = [];

    for (let item in cartItems){
      for (let size in cartItems[item]){
        if (cartItems[item][size] > 0){
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1='YOUR' text2='CART'/>
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 border-t border-b border-muted text-text grid grid-cols-[4fr_0.5fr_0.25fr] sm:grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4" >
                <div className="flex items-start gap-6">
                  <img src={productData.images[0]} className='w-16 sm:w-20 bg-gray-200 rounded-md' alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-card '>{item.size}</p>
                    </div>
                  </div>
                </div>

                  <div className='flex items-center justify-center bg-card py-2 border border-border'>
                    <button className='text-2xl font-semibold px-4' onClick={event => event.target === '' || item.quantity === 0 ? null : updateQuantity(item._id, item.size, item.quantity+1)}>+</button>
                    <Counter
                      value={item.quantity}
                      places={[100, 10, 1]}
                      fontSize={18}
                      padding={5}
                      gap={1}
                      textColor="white"
                      fontWeight={600}
                    />
                    <button className='text-2xl font-semibold -mt-1 px-4' onClick={event => event.target === '' || item.quantity === 0 ? null : updateQuantity(item._id, item.size, item.quantity-1)}> -</button>
                  </div>
                  {/* <input type="number" min={1} defaultValue={item.quantity} onChange={event => event.target === '' || event.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(event.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-foreground' /> */}
                  <img src={assets.bin_icon} onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 aspect-square cursor-pointer object-contain invert' alt="" />
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()  => getCartAmount() > 0 ? navigate('/place-order') : toast.error("Cart is Empty") } className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart