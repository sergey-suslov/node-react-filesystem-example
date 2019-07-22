import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Public from '../public'
import App from '../app'

export default () => (
  <Switch>
    <Route path="/" render={Public} />
    <Route path="/app" render={App} />
  </Switch>
)
