import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Typography, Icon, Result } from 'antd'
import './sign-up-result.less'

export default class SignUpResult extends Component {
  render() {
    return (
      <Result
        title="You have been registered!"
        subTitle="Confirm your email with message we have sent to you"
        status="success"
      />
    )
  }
}
