import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-muted'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In cum illo temporibus hic. Optio dolorem non odio nisi, quibusdam molestiae quae adipisci deserunt et quos facere repudiandae, neque, fuga ratione.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ipsum quia ea reprehenderit est quidem doloremque voluptates in corporis, illum, quasi delectus, eligendi impedit. Expedita accusamus voluptatibus architecto quidem deleniti.
          Eveniet perspiciatis, eaque, odio asperiores perferendis, sequi aut quisquam aliquid corporis nemo ipsa nam ipsam blanditiis rerum odit assumenda quasi eligendi cupiditate harum corrupti? Rem obcaecati vel at asperiores! Optio!</p>
          <b className='text-text'>Our Mission</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit perspiciatis quae repudiandae iusto praesentium ducimus adipisci culpa reiciendis est delectus dignissimos doloribus ad perferendis provident cumque labore omnis, autem neque.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className='text-text'>Quality Assurance: </b>
          <p className='text-text brightness-75'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo pariatur libero dolor eum. A doloribus quae sunt nihil unde. Debitis possimus maiores tempora ducimus delectus quod accusantium voluptas, aspernatur accusamus.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className='text-text'>Convenience: </b>
          <p className='text-text brightness-75'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo pariatur libero dolor eum. A doloribus quae sunt nihil unde. Debitis possimus maiores tempora ducimus delectus quod accusantium voluptas, aspernatur accusamus.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className='text-text'>Exceptional Customer Service: </b>
          <p className='text-text brightness-75'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo pariatur libero dolor eum. A doloribus quae sunt nihil unde. Debitis possimus maiores tempora ducimus delectus quod accusantium voluptas, aspernatur accusamus.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About