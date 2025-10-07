import React from 'react'

const FormInput = ({type,className,name,handleChange,placeholder,label,isRequired}) => {
  return (
    <div className='w-full'>
    <label className="text-sm text-gray-600 font-medium mb-1 mt-4">{label} {isRequired? <span className='text-red-900 text-sm'>*</span>:''}</label>
    <input type={type} placeholder={placeholder} onChange={handleChange}  name={name} className={ ` mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}/>
    </div>
  )
}

export default FormInput