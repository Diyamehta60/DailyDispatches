import React from 'react'
import loading from './spinner.gif'

function Spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt=''/>
    </div>
  )
}

export default Spinner
