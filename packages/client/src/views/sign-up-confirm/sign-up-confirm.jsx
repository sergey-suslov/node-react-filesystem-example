import React, { Component } from 'react'
import { Spin } from 'antd'
import './sign-up-confirm.less'

export default class SignUpConfirm extends Component {
  componentDidMount() {
    const { signUpConfirm, match: { params: { hash } } } = this.props
    signUpConfirm({ hash: decodeURIComponent(hash) })
  }

  render() {
    const { match } = this.props
    return (
      <Spin size="large" tip="Confirming..." spinning>
        <div className="sing-up-confirm-container" />
      </Spin>
    )
  }
}
