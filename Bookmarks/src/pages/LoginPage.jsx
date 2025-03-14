import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
        <div className='flex flex-col items-center bg-gray-800 p-4 rounded-xl h-[50vh] min-h-120 w-[60vw] lg:w-[40vw] gap-4 shadow-lg'>
            <h1 className='text-4xl font-bold p-10 text-white'>Login</h1>
            <form className='flex flex-col'>
                <input type='text' placeholder='Username' className='border-2 border-gray-600 rounded-3xl p-2 pl-3 m-1 w-[40vw] lg:w-[30vw] text-white' />
                <input type='password' placeholder='Password' className='border-2 border-gray-600 rounded-3xl p-2 pl-3 mt-6 m-1 w-[40vw] lg:w-[30vw] text-white' />
                <div className='flex justify-end'>
                    <a href='/forgot-password' className='text-blue-600 text-sm mt-2'>Forgot Password?</a>
                </div>
                <button className='bg-blue-600 text-white p-2 m-1 rounded-3xl mt-4 w-[40vw] lg:w-[30vw]'>Login</button>
            </form>
            <p className='text-md text-white'>Don't have an account? <a href='/register' className='text-blue-600'>Register</a></p>
        </div>
    </div>
  )
}

export default LoginPage