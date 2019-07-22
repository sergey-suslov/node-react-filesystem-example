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
          <Col span={2}>
            <Typography.Title level={3}>
              Senum
            </Typography.Title>
          </Col>
          <Col span={22}>
            <Row gutter={40} justify="end" type="flex">
              <Col>
                <LinkButton>
                  Home
                </LinkButton>
              </Col>
              <Col>
                <LinkButton>
                  Pricing
                </LinkButton>
              </Col>
              <Col>
                <LinkButton>
                  About
                </LinkButton>
              </Col>
              <Col>
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
