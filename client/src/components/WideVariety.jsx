import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import CircularGallery from './ReactBits/CircularGallery';

const WideVariety = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [])

  return (
    <div className='my-10 border border-border rounded-xl'>
      <div className="text-center py-8 text-3xl bg-foreground rounded-xl">
        <Title text1={'Wide Variety'} text2={'of Stickers'} />
      </div>
      {/* Rendering Products */}
      {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <Product key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div> */}
      <div style={{ height: '500px', position: 'relative' }} className='-my-4'> 
        <CircularGallery bend={2} textColor="#ffffff" borderRadius={0.05} className="bg-black" />
      </div>

    </div>
  )
}

export default WideVariety