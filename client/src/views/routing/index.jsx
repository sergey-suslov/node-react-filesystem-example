import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../sign-in'

export default () => (
  <Switch>
    <Route render={SignIn} />
  </Switch>
)
