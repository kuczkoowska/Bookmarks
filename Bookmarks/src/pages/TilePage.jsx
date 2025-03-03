import React from 'react'
import Navbar from '../components/Navbar'
import Tiles from '../components/Tiles'

const TilePage = () => {
  const [background, setBackground] = React.useState('')
  const [numberColumns, setNumberColumns] = React.useState(7)

  const onClick = () => {
    console.log('Hello')
  }

  return (
    <div 
      className='flex justify-center items-center h-screen flex-col' 
      style={{ 
        background: background ? `url(${background}) no-repeat center center/cover` : 'none' 
      }}
    > 
      <Navbar setBackgroundImage={setBackground} setNumberColumns={setNumberColumns}/>
      <Tiles onClick={onClick} columns={numberColumns}/>
    </div>
  )
}

export default TilePage