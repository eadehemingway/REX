import React from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => (
  <div className="page-content">
    <div>signup</div>
    <input type="text" />
    <input type="text" />

    <p>
      {' '}
      have an account?
      <Link to="/signin"> SIGN IN </Link>
      instead
    </p>
  </div>
)
