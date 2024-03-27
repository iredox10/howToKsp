import React from 'react'
import {FaExclamation, FaExclamationCircle} from 'react-icons/fa'

const ErrMsg = ({err}) => {
  return (
    <div className='text-white bg-red-500 flex items-center gap-2 capitalize w-3/4 p-1 my-4'><FaExclamationCircle /> {err}</div>
  )
}

export default ErrMsg