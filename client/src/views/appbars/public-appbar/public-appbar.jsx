import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Typography, Button } from 'antd'
import DefaultButton from '../../../widgets/buttons/default-button'
import LinkButton from '../../../widgets/buttons/link-button'
import './public-appbar.less'

export default class PublicAppbar extends Component {
  static propTypes = {
    signIn: PropTypes
  }

  render() {
    return (
      <div>
        <Row className="public-appbar" justify="space-between">
          <Col xs={24} md={2}>
            <Typography.Title level={3}>
              Senum
            </Typography.Title>
          </Col>
          <Col xs={24} md={22}>
            <Row gutter={40}>
              <Col md={{span: 3, offset: 12}} lg={{span: 2, offset: 16}}>
                <LinkButton>
                  Home
                </LinkButton>
              </Col>
              <Col md={3} lg={2}>
                <LinkButton>
                  Pricing
                </LinkButton>
              </Col>
              <Col md={3} lg={2}>
                <LinkButton>
                  About
                </LinkButton>
              </Col>
              <Col md={3} lg={2}>
                <DefaultButton>
                  Sign in
                </DefaultButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
