import React from 'react'

function Title({ title, description }) {
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-16">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white text-center leading-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 text-center max-w-2xl">
        {description}
      </p>

      {/* Divider / Accent line */}
      <div className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
    </div>
  )
}

export default Title
