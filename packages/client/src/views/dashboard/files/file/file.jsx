import React, { useState } from 'react'
import { List, Typography, Menu, Dropdown, Modal, Popover, Input, Spin } from 'antd'
import { useDrag, useDrop } from 'react-dnd'
import moment from 'moment'

import config from '../../../../config'
import './file.less'

const fileTypeLocs = config.fileTypeLocs

const showDeleteConfirm = (onDelete, file) => () => {
  Modal.confirm({
    autoFocusButton: null,
    title: 'Are you sure delete this file?',
    content: `Delete ${file.name}`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => {
      onDelete(file._id)
    },
    onCancel() {}
  })
}

function RenameComponent({ name, rename }) {
  const [value, setValue] = useState(name)
  return (
    <Input
      autoFocus
      onPressEnter={() => value.trim() && rename(value)}
      placeholder='Enter new name'
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

export default function(props) {
  const { onClick, file, moveFile, deleteFile, renameFile } = props
  const [{ opacity, isDragging }, dragRef] = useDrag({
    item: { type: config.DNDTypes.FILE, id: file._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
      isDragging: monitor.isDragging()
    })
  })
  const [{ isOver }, drop] = useDrop({
    accept: config.DNDTypes.FILE,
    drop: item => {
      moveFile({ sourceId: item.id, targetId: file._id })
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const [renameOpen, setRenameOpen] = useState(false)

  const menu = (
    <Menu>
      <Menu.Item key='rename' onClick={() => setRenameOpen(true)}>
        Rename
      </Menu.Item>
      <Menu.Item key='delete' onClick={showDeleteConfirm(deleteFile, file)}>
        Delete
      </Menu.Item>
    </Menu>
  )
  console.log('is open', renameOpen)
  return !file.temporary ? (
    <div
      ref={dragRef}
      style={{
        opacity,
        transition: 'all .2s'
      }}
    >
      {!isDragging ? (
        <div ref={drop}>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <Popover
              content={
                <RenameComponent
                  name={file.name}
                  rename={name => {
                    setRenameOpen(false)
                    renameFile({ file, name })
                  }}
                />
              }
              title='Rename'
              // trigger=''
              placement='topLeft'
              visible={renameOpen}
              onVisibleChange={visible => {
                if (!visible) {
                  setRenameOpen(false)
                }
              }}
            >
              <List.Item key={file._id} onClick={onClick(file)} className='file-list-item-meta'>
                <List.Item.Meta
                  title={
                    <span className={`file-list-item-title${isOver ? ' file-title-primary-color' : ''}`}>
                      {isOver ? 'Move in ' : null}
                      {file.name}
                    </span>
                  }
                  description={<Typography.Text className='caption-text'>{fileTypeLocs[file.type]}</Typography.Text>}
                />
                <Typography.Text className='caption-text'>
                  updated at {moment(file.date).format('D MMM YYYY')}
                </Typography.Text>
              </List.Item>
            </Popover>
          </Dropdown>
        </div>
      ) : (
        <List.Item className='file-list-item' key={file._id} onClick={onClick(file)}>
          <List.Item.Meta
            title={<span className='file-list-item-title'>{file.name}</span>}
            description={<Typography.Text className='caption-text'>{fileTypeLocs[file.type]}</Typography.Text>}
          />
          <Typography.Text className='caption-text'>updated at {moment(file.date).format('D MMM YYYY')}</Typography.Text>
        </List.Item>
      )}
    </div>
  ) : (
    <Spin spinning>
      <List.Item className='file-list-item' key={file._id} onClick={onClick(file)}>
        <List.Item.Meta
          title={<span className='file-list-item-title'>{file.name}</span>}
          description={<Typography.Text className='caption-text'>{fileTypeLocs[file.type]}</Typography.Text>}
        />
        <Typography.Text className='caption-text'>updated at {moment(file.date).format('D MMM YYYY')}</Typography.Text>
      </List.Item>
    </Spin>
  )
}

