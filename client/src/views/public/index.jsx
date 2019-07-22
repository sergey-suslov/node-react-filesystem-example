import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from '../sign-up'
import Landing from '../landing'
import PublicAppbar from '../appbars/public-appbar'

export default () => (
  <Fragment>
    <PublicAppbar />
    <Switch>
      <Route path="/sign-up" render={SignUp} />
      <Route render={Landing} />
    </Switch>
  </Fragment>
)
