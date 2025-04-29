import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div className=''>
          {/* <img src={assets.logo} className='invert mb-5 w-32' alt="" /> */}
          <Link to='/'>
            {/* <img src={assets.logo} className='w-36' alt="" /> */}
            <h2 className='text-white my-2 text-xl font-semibold tracking-tight'>PopSticker</h2>
          </Link>
          <p className='w-full md:w-2/3 text-text brightness-75'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sapiente sequi
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-text'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-text brightness-75'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-text'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-muted'>
            <li>+91 8824707969</li>
            <li>+91 8503002265</li>
            <li>work.abhijeetroy@gmail.com</li>

          </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2024@forever.com - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer