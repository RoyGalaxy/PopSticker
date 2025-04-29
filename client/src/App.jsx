import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from "./pages/About"
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from "./pages/Cart"
import Login from './pages/Login'
import Profile from './pages/Profile'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Aurora from './components/ReactBits/Aurora';
import Animation from './pages/Animation';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Aurora
        colorStops={["#03DAC6", "#BB86FC"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className='px-2 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer
          position='top-right'
          closeOnClick={true}
          pauseOnFocusLoss
          pauseOnHover={false}
          draggable
          theme='dark'
        />
        <Navbar />
        <SearchBar />
        <Routes>
          {/* <Route path='/' element={<>Home</>} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/animation' element={<Animation />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />

          
        </Routes>
        <Footer />
      </div>
    </div>

  )
}

export default App