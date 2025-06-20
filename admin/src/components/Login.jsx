import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${backendUrl}/api/user/admin/`, {
                email,
                password
            })
            if(response.data.success){
                setToken(response.data.token)
            } else{
                toast.error(response.data.message)
            }

        } catch(err){
            toast.error(err.response.data.message)
            console.log(err.response.data.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <div className='mb-2 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-2 py-2 border border-gray-300 outline-none' type="email" name="email" required placeholder='e.g. your@email.com' />
                </div>
                <div className='mb-2 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-2 py-2 border border-gray-300 outline-none' type="password" name="email" required placeholder='Enter your password' />
                </div>
                <button type='submit' className='mt-2 w-full px-4 py-2 rounded-md text-white bg-black'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login