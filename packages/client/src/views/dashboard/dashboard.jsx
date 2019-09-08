import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import PropTypes from 'prop-types'
import Filters from './filters'
import Files from './files'
import Location from './location'
import Create from './create'
import './dashboard.less'
import Search from './Search'

export default class Dashboard extends Component {
  static propTypes = {
    fetchFiles: PropTypes.func
  }

  state = {
    directory: null
  }

  componentDidMount() {
    this.loadMore()
  }

  loadMore = () => {
    const { directory } = this.state
    const { fetchFiles } = this.props
    fetchFiles({ parentId: directory ? directory._id : null })
  }

  openFile = (file, down = true) => () => {
    if (!file || file.type === 'directory') {
      const { fetchFiles } = this.props
      const fileId = file ? file._id : null
      this.setState({
        directory: down ? file : { ...file, parentId: { ...file.parentId, parentId: this.state.directory } }
      })
      fetchFiles({ parentId: fileId })
    }
    if (file && file.type === 'profile') {
      const { history, match: { url } } = this.props
      history.push(`${url}/profile/${file._id}`)
    }
  }

  render() {
    const { loadMore, openFile } = this
    const { directory } = this.state
    return (
      <div className='dashboard-container'>
        <Row>
          <Col xs={24} md={4}>
            <Typography.Title level={3} className='files-title'>
              Files
            </Typography.Title>
          </Col>
          <Col xs={24} md={{ span: 13, offset: 1 }}>
            <Location directory={directory} openFile={openFile} />
          </Col>
          <Col xs={24} md={{ span: 6 }} style={{ textAlign: 'right' }}>
            <Search openFile={openFile} />
            <Create />
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={4}>
            <Filters />
          </Col>
          <Col xs={24} md={{ span: 19, offset: 1 }}>
            <Files loadMore={loadMore} openFile={openFile} />
          </Col>
        </Row>
      </div>
    )
  }
}
