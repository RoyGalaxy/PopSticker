import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Orders'
import Login from './components/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token == '' ?
        <Login setToken={setToken} />
        : <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 tex-gray text-base'>
              <Routes>
                {/* <Route path='/' element={<Home />} /> */}
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App