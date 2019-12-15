import React, { Component } from 'react'
import { List, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'

import config from '../../../config'
import File from './file'
import './files.less'


export default class Files extends Component {
  static propTypes = {
    files: PropTypes.array,
    isFetchingFiles: PropTypes.bool,
    loadMore: PropTypes.func,
    openFile: PropTypes.func
  }

  render() {
    const { files, isFetchingFiles, loadMore, hasMoreFiles, openFile, onDelete } = this.props
    return (
      <div className='files-container'>
        {files.length > 0 && (
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={loadMore}
            hasMore={!isFetchingFiles && hasMoreFiles}
            useWindow={true}
          >
            <List
              size='large'
              dataSource={files}
              renderItem={file => <File file={file} onDelete={onDelete} onClick={openFile} />}
            />
          </InfiniteScroll>
        )}
        {isFetchingFiles && (
          <List
            split
            size='small'
            dataSource={Array(config.defaultLimit).fill(0)}
            renderItem={() => (
              <List.Item key={Math.random()}>
                <Skeleton title={false} loading active />
              </List.Item>
            )}
          />
        )}
      </div>
    )
  }
}
