
import SingleHeader from '@/components/layout/SingleHeader'
import React from 'react'

const layout = ({children}) => {
  return (
       <>
       <SingleHeader/>
        {children}
       </>
  )
}

export default layout