import React from 'react'
import Pages from './Pages'

const Tiles = ( params ) => {
  return (
    <>
        <div className='grid grid-cols-4 grid-rows-4 gap-5'><Pages onClick={params.onClick}/></div>
    </>
  )
}

export default Tiles