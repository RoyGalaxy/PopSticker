import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if(location.pathname.includes('collection')){
      setVisible(true)
    }else {
      setVisible(false)
    }
  }, [location])


  return showSearch && visible ? (
    <div className='border-t border-b bg- text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search' className='flex-1 outline-none bg-inherit text-sm text-text placeholder:text-text'/>
        <img src={assets.search_icon} onClick={() => {}} className='w-4 invert' alt="" />
      </div>
      <img src={assets.cross_icon} onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer invert brightness-75' alt="" />
    </div>
  ) : null
}

export default SearchBar