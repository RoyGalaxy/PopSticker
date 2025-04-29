import React, { useState } from 'react'
import Counter from '@/components/ReactBits/Counter'


const Animation = () => {
  const [count, setcount] = useState(1);

  return (
    <div  className='flex h-screen items-center justify-center' onClick={() => setcount(count + 1)}>
      <Counter
        value={count}
        places={[ 100, 10, 1]}
        fontSize={80}
        padding={5}
        gap={10}
        textColor="white"
        fontWeight={900}
        containerStyle={{background: 'transparent'}}
        counterStyle={{background: 'transparent'}}
      />
    </div>
  )
}

export default Animation