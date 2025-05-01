import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map(item => {
      if(item._id == productId){
        setProductData(item)
        setImage(item.images[0]);
        return null;
      }
    })
  } 

  useEffect(() => {
    fetchProductData(productId)
  }, [productId, products]) 

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img src={item} onClick={() => setImage(item)} key={index} className='w-[24%] sm:w-full sm:mb-[6px] md:mb-3 flex-shrink-0 cursor-pointer border border-gray-50 bg-gray-200' alt="" />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className='w-full h-auto border border-gray-200 bg-gray-100' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2 text-text'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3 " />
            <p className="pl-2 text-muted">(144)</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-primary">{currency}{productData.price}</p>
          <p className='mt-5 text-muted md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className='text-text'>Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button key={index} onClick={() => setSize(item)} className={`border py-2 px-4 text-text bg-foreground ${size === item ? 'border-primary' : ''}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => {addToCart(productData._id, size)}} className='bg-primary text-white text-sm px-8 py-3 active:bg-gray-700'>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-muted mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange ploicy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review secion  */}
      <div className='mt-20'>
        <div className="flex text-text">
          <p className="border px-5 py-3 text-sm">Descriptiton</p>
          <p className="border px-5 py-3 text-sm">Reviews (144)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-muted">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ab cum. Possimus esse molestiae, hic aperiam vel, repudiandae nihil sed maiores reiciendis voluptates excepturi facere. Mollitia quia itaque beatae quibusdam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur libero non placeat modi aliquid? Commodi quae corrupti repellat! Soluta possimus deserunt eius officiis itaque dolorem, odio eos ad temporibus beatae.</p>
        </div>
      </div>

      {/* Display related Products */}
      <RelatedProducts id={productId} category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product