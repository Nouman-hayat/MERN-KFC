import React from 'react'
import './SkeletonCard.css'

export default function SkeletonCard() {
  return (
    <div className='skeleton-card'>
        <div className="skeleton-img skeleton-loading">
            
        </div>
        <div className="skeleton-desc ">
            <p className='skeleton-loading'></p>
            <p className='skeleton-loading'></p>
            <div className='skeleton-loading'></div>
        </div>
    </div>
  )
}
