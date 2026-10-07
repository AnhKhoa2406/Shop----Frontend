import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col gap-2 mb-1">
      <p className="font-extrabold tracking-tight">
        <span className="text-gray-900">{text1}</span>
        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ml-1">
          {text2}
        </span>
      </p>

      <span className="w-10 sm:w-14 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></span>
    </div>
  )
}

export default Title