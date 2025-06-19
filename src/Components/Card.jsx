import React from 'react'

const Card = ({icon, title, value}) => {
  return (
    <div className='bg-white text-dark p-4 rounded-lg shadow-md flex items-center space-x-6
    dark:bg-gray-800 dark:text-white'>
        <div className='text-3xl text-gray-100'>{icon}</div>
        <div>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <p className='text-4xl font-bold'>{value}</p>
        </div>
    </div>
  )
}

export default Card