import React from 'react'

const FormBtn = ({text}) => {
  return (
    <div>
        <button type='submit' className='capitalize bg-green-500 py-1 px-4 hover:text-white'>{text}</button>
    </div>
  )
}

export default FormBtn