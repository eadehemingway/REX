import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/rex.svg'

export const LandingPage = () => {
  return (
    <div className="page-content">
      <img src={Logo} />
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
