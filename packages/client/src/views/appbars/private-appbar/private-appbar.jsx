import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import LinkButton from '../../../widgets/buttons/link-button'
import './private-appbar.less'

export default class PublicAppbar extends Component {
  render() {
    const { history, profile } = this.props
    const goTo = path => () => {
      history.push(path)
    }
    return (
      <div>
        <Row className='public-appbar' justify='space-between'>
          <Col xs={24} md={2}>
            <Typography.Title level={3} className='app-title'>
              Senum
            </Typography.Title>
          </Col>
          <Col xs={24} md={22}>
            <Row gutter={40}>
              <Col md={{ span: 3, offset: 11 }} lg={{ span: 2, offset: 15 }}>
                <LinkButton onClick={goTo('/')}>Home</LinkButton>
              </Col>
              <Col md={3} lg={2}>
                <LinkButton>Pricing</LinkButton>
              </Col>
              <Col md={3} lg={2}>
                <LinkButton>About</LinkButton>
              </Col>
              <Col md={4} lg={3}>
                <Typography.Text style={{ height: 32, verticalAlign: 'middle', display: 'table-cell' }}>
                  {(profile && profile.email) || 'Profile'}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
