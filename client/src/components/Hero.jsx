import React from 'react'
import Masonry from './ReactBits/Masonry';

  
const data = [
  { id: 13, image: '/src/assets/images/13.png', height: 700 },
  { id: 2, image: '/src/assets/images/2.png', height: 600 },
  { id: 3, image: '/src/assets/images/3.png', height: 550 },
  { id: 4, image: '/src/assets/images/4.png', height: 600 },
  { id: 5, image: '/src/assets/images/5.png', height: 500 },
  { id: 14, image: '/src/assets/images/14.png', height: 600 },
  { id: 15, image: '/src/assets/images/15.png', height: 700 },
  { id: 8, image: '/src/assets/images/8.png', height: 450 },
  { id: 9, image: '/src/assets/images/9.png', height: 600 },
  { id: 10, image: '/src/assets/images/10.png', height: 500 },
  { id: 11, image: '/src/assets/images/11.png', height: 400 },
  { id: 12, image: '/src/assets/images/12.png', height: 450 },
  { id: 7, image: '/src/assets/images/7.png', height: 400 },
  { id: 6, image: '/src/assets/images/6.png', height: 450 },
  { id: 1, image: '/src/assets/images/1.png', height: 400 },
];

const Hero = () => {
  
  return (
    <div>
      <Masonry data={data}/>
    </div>
  )
}

export default Hero