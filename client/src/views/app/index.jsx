import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../dashboard'
import RefreshTokenService from '../wrappers/refresh-token-service'
import PrivateRoute from '../routing/private-route'

export default () => (
  <RefreshTokenService>
    <PrivateRoute
      component={() => (
        <Switch>
          <Route path="/app" render={Dashboard} />
        </Switch>
      )}
    />
  </RefreshTokenService>
)
