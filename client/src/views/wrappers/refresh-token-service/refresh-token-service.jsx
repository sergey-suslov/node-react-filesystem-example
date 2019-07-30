import React, { Component, Children } from 'react'
import { Spin } from 'antd'

import config from '../../../config'
import './refresh-token-service.less'

export default class RefreshTokenService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshed: false
    }
  }

  componentDidMount() {
    const lastRefreshed = localStorage.getItem('refreshedAt')
    if (!lastRefreshed)
      return this.refreshToken()
    const refreshedAtDate = new Date(lastRefreshed)
    if (Date.now() - refreshedAtDate.getTime > config.defaultTime.maxRefreshTokenDelay)
      return this.refreshToken()
    this.setState({
      refreshed: true,
    })
  }

  refreshToken() {
    console.log('Refresh!')
  }

  render() {
    const { children } = this.props
    const { refreshed } = this.state
    return (
      refreshed ? children : <Spin spinning size="large" />
    )
  }
}
