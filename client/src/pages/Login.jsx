import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ShopContext } from '@/context/ShopContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let response;
      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email: formData.email,
          password: formData.password
        });
      }
      
      // Store token and user data in cookies
      if(response.data.success){
        Cookies.set('token', response.data.token, { expires: 30 });
        Cookies
        .set('userData', JSON.stringify(response.data.user), { expires: 30 });

        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]); // Add navigate to the dependencie

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-6 text-gray-200 bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800'>
      <div className="inline-flex items-center gap-2 mb-4">
        <Title text1={currentState.split(' ')[0].toUpperCase()} text2={currentState.split(' ')[1].toUpperCase()} />
      </div>

      {error && (
        <div className="w-full p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-sm">
          {error}
        </div>
      )}

      {currentState === 'Sign Up' && (
        <div className='relative w-full'>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Name' 
            className='w-full px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none transition-all duration-200 bg-gray-800 text-gray-200 placeholder-gray-500'
            required 
          />
        </div>
      )}
      
      <div className='relative w-full'>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='sample@mail.com' 
          className='w-full px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none transition-all duration-200 bg-gray-800 text-gray-200 placeholder-gray-500'
          required 
        />
      </div>

      <div className='relative w-full'>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='password' 
          className='w-full px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none transition-all duration-200 bg-gray-800 text-gray-200 placeholder-gray-500'
          required 
        />
      </div>

      <div className='w-full flex justify-between text-sm text-gray-400'>
        <p className='cursor-pointer hover:text-purple-400 transition-colors duration-200'>Forgot password?</p>
        {
          currentState === 'Sign In' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-purple-400 transition-colors duration-200'>Create Account</p> :
            <p onClick={() => setCurrentState('Sign In')} className='cursor-pointer hover:text-purple-400 transition-colors duration-200'>Sign In instead</p>
        }
      </div>

      <button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg'>
        {currentState}
      </button>
    </form>
  )
}

export default Login