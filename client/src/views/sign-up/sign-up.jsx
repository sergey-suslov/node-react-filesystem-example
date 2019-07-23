import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Typography } from 'antd'
import SignUpForm from './sign-up-form'
import './sign-up.less'

export default class SignUp extends Component {

  render() {
    return (
      <div className="sign-up-container">
        <Row justify="center" align="middle">
          <Col xs={{span: 22, offset: 1}} md={{span: 12, offset: 6}} lg={{span: 8, offset: 8}}>
            <Typography.Title className="sign-up-title" level={1}>
              Sign Up
            </Typography.Title>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col xs={{span: 22, offset: 1}} md={{span: 12, offset: 6}} lg={{span: 8, offset: 8}}>
            <SignUpForm />
          </Col>
        </Row>
      </div>
    )
  }
}
