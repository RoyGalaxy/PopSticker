import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const Product = ({id, image, name, price}) => {
  const {currency} = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-text cursor-pointer z-0 transition ease-in-out hover:scale-110'>
      <div className="overflow-hidden">
        <img src={`/src/assets/images/${Math.ceil(Math.random() * 15)}.png`} className='rounded-xl aspect-square bg-card object-contain' alt="" />
      </div>
      <p className='pt-3 mb-2 pb-1 text-sm text-text'>{''}</p>
      <p className='text-sm mb-2 font-medium text-muted'>{''}</p>
    </Link>
  )
}

export default Product