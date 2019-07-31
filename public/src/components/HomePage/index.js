import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => (
  <div className="page-content">
    <div> HomePage</div>
    <Link to="/signin" className="home-btn">
      {' '}
      sign in{' '}
    </Link>
    <Link to="/signup" className="home-btn">
      {' '}
      sign up{' '}
    </Link>
    <Link to="/recommendations"> RECOMMENDATIONS </Link>
  </div>
)
