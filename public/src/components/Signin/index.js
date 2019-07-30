import React from 'react'
import { Link } from 'react-router-dom'

export const Signin = () => (
  <div className="page-content">
    <div>signin</div>
    <input type="text" />
    <input type="text" />
    <button> sign in </button>
    <p>
      {' '}
      dont have an account?
      <Link to="/signup"> SIGN UP</Link> instead
    </p>
  </div>
)
