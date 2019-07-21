import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignIn extends Component {
  static propTypes = {
    signIn: PropTypes
  }

  render() {
    return (
      <div className="test">
        <p>Sign in component</p>
      </div>
    )
  }
}
