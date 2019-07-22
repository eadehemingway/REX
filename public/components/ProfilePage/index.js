import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export const ProfilePage = () => {
  return (
    <div className="page-content">
      <h1> profile page</h1>

      <div className="link-container">
        <Link to="/signup"> SIGN UP</Link>
        <Link to="/signin"> SIGN IN </Link>

        <Link to="/recommendations"> RECOMMENDATIONS </Link>
        <Link to="/user/:id"> EXTERNAL PROF </Link>
      </div>
    </div>
  );
};
