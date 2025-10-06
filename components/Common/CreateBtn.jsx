import React from 'react'
import Button from './Button'
import { AiOutlinePlus } from 'react-icons/ai'

const CreateBtn = ({ handleClick ,text}) => {
  return (
     <Button type='button' handleClick={handleClick}
                                className="flex items-center space-x-2 px-4 py-2 text-base  text-primary font-medium hover:bg-gray-50 transition-colors"
                            >
                                <AiOutlinePlus className="w-4 h-4" />
                                <span>{ text }</span>
                            </Button>
  )
}

export default CreateBtn