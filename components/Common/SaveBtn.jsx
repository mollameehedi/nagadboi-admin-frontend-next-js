import React from 'react'
import { IoCloseCircleOutline, IoSaveOutline } from 'react-icons/io5'

const Btn = ({handlClick,isTriger,isCancel = false}) => {
    let classes = isCancel? 'flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 transition-colors shadow-sm disabled:bg-red-400': 'flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-sm hover:bg-indigo-700 transition-colors shadow-sm disabled:bg-indigo-400'
  return (
     <button
          onClick={handlClick}
          disabled={isTriger}
          className={classes}
        >
            {isCancel? (
                <>
                <IoCloseCircleOutline className="w-5 h-5" />
          <span>{isTriger ? 'Cancel...' : 'Cancel'}</span>
                </>
            ): (
                <>
                <IoSaveOutline className="w-5 h-5" />
          <span>{isTriger ? 'Saving...' : 'Save'}</span>
                </>
        )}
          
        </button>
  )
}

export default Btn