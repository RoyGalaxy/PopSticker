import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Cookies from 'js-cookie'

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  const [visible, setVisible] = useState(false);

  const logout = () => {
    Cookies.remove('token');
    setToken('');
    setCartItems([]);
    navigate('/');
  }

  return (
    <div className='flex items-center justify-between px-5 py-5 font-medium sticky top-0 left-0 bg-foreground z-10 text-text rounded-lg shadow-2xl'>
      <Link to='/'>
        {/* <img src={assets.logo} className='w-36' alt="" /> */}
        PopSticker
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-text'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-secondary hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-secondary hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-secondary hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-secondary hidden' />
        </NavLink>
        {/* <NavLink to='/animation' className='flex flex-col items-center gap-1'>
          <p>Animation</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-secondary hidden' />
        </NavLink> */}
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} onClick={() => { setShowSearch(true); navigate('/collection') }} className='w-5 cursor-pointer invert' alt="" />
        <div className='relative group'>
          <Link to={!token && '/login'}>
            <img src={assets.profile_icon} className='w-5 cursor-pointer invert' alt="" />
          </Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            {/* --------------DROPDOWN----------- */}
            { token && <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-card border border-border text-muted rounded'>
              <Link to='/profile'>
                <p className='cursor-pointer hover:text-text'>My Profile</p>
              </Link>
              <Link to='/orders'>
                <p className='cursor-pointer hover:text-text'>Orders</p>
              </Link>
              <Link to='/login' onClick={logout}>
                <p className='cursor-pointer hover:text-text'>Logout</p>
              </Link>


            </div>}
          </div>
        </div>

        <Link to='/cart' className="relative">
          <img src={assets.cart_icon} className='w-5 min-2-5 invert' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden invert' onClick={() => setVisible(true)} alt="" />
      </div>

      {/* Sidebar menu for small devices */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-foreground transition-all h-screen ${visible ? 'w-screen' : 'w-0'}`}>
        <div className='flex flex-col text-text '>
          <div onClick={() => { setVisible(false) }} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className='h-4 rotate-180 invert brightness-0' alt="" />
            <p className='text-muted'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-text' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-text' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-text' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-text' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar