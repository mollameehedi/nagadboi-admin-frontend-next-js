import React from 'react'

const Input = ({type,className,name,handleChange,placeholder}) => {
  return (
    <>
    <input type={type} placeholder={placeholder} onChange={handleChange}  name={name} className={`bg:gray-100 placeholder-gray-500 border border-gray-100 form-input ${className}`}/>
    </>
  )
}

export default Input