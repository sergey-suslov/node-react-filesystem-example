import React, { Component } from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

import BackButton from '../../../widgets/buttons/back-button'
import config from '../../../config'
import './location.less'

export default function(props) {
  const { openFile, directory, parent, isFetching, moveFile } = props
  const isParentObject = directory && isFetching ? typeof directory.parent === 'object' : true
  const [{ isOver }, drop] = useDrop({
    accept: config.DNDTypes.FILE,
    drop: item => {
      console.log('dir to mov', directory)
      moveFile({ sourceId: item.id, targetId: (directory.parentId && directory.parentId._id) })
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })
  return (
    <div className={`location-container${isOver ? ' directory-title-move-in' : null}`} ref={directory ? drop : () => {}}>
      <Spin style={{ marginLeft: '-36px', marginRight: 4 }} spinning={!isParentObject && isFetching}>
        <Typography.Title level={4}>
          {directory ? (
            <BackButton style={{ marginLeft: '-32px' }} inline onClick={openFile(parent || directory.parentId)} />
          ) : null}
          {isOver ? `Move in ${(directory.parent && directory.parent.name) || 'Root'}` : null}
          {!isOver ? (directory ? directory.name : 'Root') : null}
        </Typography.Title>
      </Spin>
    </div>
  )
}
