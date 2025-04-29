import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[400px]' alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-text'>Our Store</p>
          <p className='text-text brightness-75'>54789 Williams Station <br /> Suite 350, Washington, USA</p>
          <p className='font-semibold text-text brightness-75'>Tel: +91 8824707969 <br /> Email: work.abhijeetroy@gmail.com</p>
          <p className='font-semibold text-text text-xl'>Careers at Forever</p>
          <p className='text-text brightness-75'>Learn more about our teams and job openings.</p>
          
          <button className='border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS</button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact