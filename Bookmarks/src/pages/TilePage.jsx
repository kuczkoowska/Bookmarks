import React from 'react'
import Navbar from '../components/Navbar'
import Tiles from '../components/Tiles'

const TilePage = () => {

  const onClick = () => {
    console.log('Hello')
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col'> 
        <Navbar />
        <Tiles onClick={onClick}/>
      </div>
  )
}

export default TilePage