import React from 'react'

const RegisterPage = () => {
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <div className='flex flex-col items-center bg-gray-800 p-4 rounded-xl h-[70vh] min-h-132 w-[60vw] lg:w-[40vw] gap-4 shadow-lg'>
                <h1 className='text-4xl font-bold p-10 text-white'>Register</h1>
                <form className='flex flex-col'>
                    <input type='text' placeholder='Username' className='border-2 border-gray-600 rounded-3xl p-2 pl-3 m-1 w-[40vw] lg:w-[30vw] text-white' />
                    <input type='email' placeholder='Email' className='border-2 border-gray-600 rounded-3xl p-2 pl-3 mt-6 m-1 w-[40vw] lg:w-[30vw] text-white' />
                    <input type='password' placeholder='Password' className='border-2 border-gray-600 rounded-3xl p-2 pl-3 mt-6 m-1 w-[40vw] lg:w-[30vw] text-white' />
                    <button className='bg-blue-600 text-white p-2 m-1 rounded-3xl mt-6 w-[40vw] lg:w-[30vw]'>Register</button>
                </form>
                <p className='text-sm text-white'>Already have an account? <a href='/login' className='text-blue-600'>Login</a></p>
            </div>
        </div>
      )
}

export default RegisterPage