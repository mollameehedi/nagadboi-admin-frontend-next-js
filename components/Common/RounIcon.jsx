import React from 'react'

const RounIcon = ({className,children}) => {
  return (
    <div className= {`inline-block text-lg w-[45px] leading-[45px] text-center rounded-full bg-primary/10 ${className}`}>
        {children}
    </div>
  )
}

export default RounIcon