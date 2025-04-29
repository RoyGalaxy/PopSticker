import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Product from './Product'


const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [BestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(item => (item.bestSeller));
    setBestSeller(bestProducts);
  }, [products])


  return (
    <div className='my-10'>
      <div className="text-center py-8 mb-8 text-3xl bg-foreground rounded-xl">
        <Title text1='BEST' text2='SELLERS' />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {
          BestSeller.map((item, index) => (
            <Product key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller