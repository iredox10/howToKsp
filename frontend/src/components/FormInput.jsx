import React from 'react'

const FormInput = ({labelFor,label,type,onchange, value, placeholder}) => {
  return (
    <div className='mb-3 capitalize'>
        <label htmlFor={labelFor}>{label}</label>
        <input type={type} onChange={onchange} value={value} placeholder={placeholder} className='border w-full p-1 md:p-2 ' />
    </div>
  )
}

export default FormInput