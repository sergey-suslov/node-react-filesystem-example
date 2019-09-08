import React, { Component } from 'react'
import { Typography, Row, Col } from 'antd'
import Button from '../../../widgets/buttons/link-button'
import Checkbox from '../../../widgets/checkbox'
import './filters.less'

export default class Filters extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className="filters-container">
        <Row>
          <Col xs={12}>
            <Typography.Text strong className="filter-by-title">
              Filter by:
            </Typography.Text>
          </Col>
          <Col xs={12} style={{textAlign: 'right'}}>
            <Button inline className="clear-all-button">
              Clear all
            </Button>
          </Col>
        </Row>
        <Row style={{marginTop: 12}}>
          <Col xs={12}>
            <Typography.Text>
              Folders:
            </Typography.Text>
          </Col>
          <Col xs={12} style={{textAlign: 'right'}}>
            <Checkbox />
          </Col>
        </Row>
        <Row style={{marginTop: 8}}>
          <Col xs={12}>
            <Typography.Text>
              Profiles:
            </Typography.Text>
          </Col>
          <Col xs={12} style={{textAlign: 'right'}}>
            <Checkbox />
          </Col>
        </Row>
        <Row style={{marginTop: 8}}>
          <Col xs={12}>
            <Typography.Text>
              CJMs:
            </Typography.Text>
          </Col>
          <Col xs={12} style={{textAlign: 'right'}}>
            <Checkbox />
          </Col>
        </Row>
      </div>
    )
  }
}
