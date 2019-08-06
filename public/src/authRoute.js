import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ component: Component, path }) => {
  const authenticated = useSelector(state => state.signedIn)
  return (
    <Route
      exact
      path={path}
      component={() =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/signin'
            }}
          />
        )
      }
    />
  )
}
