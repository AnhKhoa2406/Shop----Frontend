import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center mb-3">
      <p className="text-gray-500">
        <span>{text1}</span>
        <span className="text-gray-800 font-medium ml-1">
          {text2}
        </span>
      </p>

      <span className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></span>
    </div>
  )
}

export default Title