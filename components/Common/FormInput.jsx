import React from 'react'

const FormInput = ({type,className,name,handleChange,placeholder,label,isRequired}) => {
  return (
    <>
    <label className="text-sm text-gray-600 font-medium mb-1 mt-4">{label} {isRequired? <span className='text-red-900 text-sm'>*</span>:''}</label>
    <input type={type} placeholder={placeholder} onChange={handleChange}  name={name} className={ ` rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500bg:gray-100 placeholder-gray-500 border border-gray-100 form-input ${className}`}/>
    </>
  )
}

export default FormInput