import React, { Component, Children } from 'react'
import { Route, Redirect } from 'react-router-dom'


export default ({ component: Component, ...rest }) => {
  console.log('shit', rest)
  return (
    <Route
      {...rest}
      render={props =>
        rest.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}