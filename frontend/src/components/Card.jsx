import React from 'react'

const Card = ({category}) => {
  return (
    <div>
        <div>
            <span>for</span>
            <p>{category.name}</p>
        </div>
    </div>
  )
}

export default Card