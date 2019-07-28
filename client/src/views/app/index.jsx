import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../dashboard'

export default () => (
  <Switch>
    <Route path="/" render={Dashboard} />
  </Switch>
)
