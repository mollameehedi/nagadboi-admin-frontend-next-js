"use client"
import React from 'react'

const Card = ({children,className}) => {
  return (
    <div className={`bg-white border border-gray-200 p-4 ${className}`}>
           {children}
    </div>
  )
}

export default Card
