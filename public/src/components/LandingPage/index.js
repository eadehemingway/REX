import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  const user = document.cookie.split('=')[1]

  return (
    <div className="page-content">
      <div> LandingPage</div>
      <Link to="/signin" className="home-btn">
        sign in
      </Link>
      <Link to="/signup" className="home-btn">
        sign up
      </Link>
    </div>
  )
}
