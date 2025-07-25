import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Product from './Product';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  return (
    <div className='my-10'>
      <div className="text-center py-8 mb-8 text-3xl bg-foreground rounded-xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
      </div>
      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <Product key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection