import React from 'react'
import Hero from '../components/Hero'

import WideVariety from '../components/WideVariety'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import NewsLetterBox from '../components/NewsLetterBox'
import Title from '@/components/Title'
import LatestCollection from '@/components/LatestCollection'

const Home = () => {
  return (
    <div className='pt-10'>
      <Hero />
      <WideVariety />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewsLetterBox />
    </div>
  )
}

export default Home