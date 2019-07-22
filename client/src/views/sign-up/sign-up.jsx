import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignUp extends Component {
  static propTypes = {
    signIn: PropTypes
  }

  render() {
    return (
      <div className="test">
        <p>Sign up component</p>
      </div>
    )
  }
}
