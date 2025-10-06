"use client"
import React, { useState } from 'react'
import { redirect } from 'next/navigation'

const Home = () => {
   const [isAuthenticated,setIsAuthenticated] =useState(false)

  if (!isAuthenticated) {
    return redirect('/login')
  }

  return redirect('/dashboard/cashbooks')
}

export default Home
