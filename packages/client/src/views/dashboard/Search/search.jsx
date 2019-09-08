import React, { useState } from 'react'
import { Button, AutoComplete, Spin } from 'antd'
import TweenOne from 'rc-tween-one'

const renderOption = item => {
  return (
    <AutoComplete.Option key={item._id} file={item}>
      <div>{item.name}</div>
    </AutoComplete.Option>
  )
}

const search = findFile => setSearchValue => value => {
  setSearchValue(value)
  if (value) {
    findFile(value)
  }
}

const onSelect = setSearchValue => setFocused => openFile => clearFiles => (value, { props: { file } }) => {
  setFocused(false)
  setSearchValue('')
  openFile(file)()
  clearFiles()
}

export default props => {
  const { files, findFile, isSearchingFiles, openFile, clearFiles } = props
  const [isSearchVisible, setSearchVisibility] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState('')
  return (
    <div style={{ display: 'inline' }}>
      <Spin spinning={isSearchingFiles} size="small" />
      {isSearchVisible ? (
        <TweenOne
          animation={[
            {
              opacity: 0,
              duration: 0
            },
            {
              opacity: 1,
              duration: 200
            }
          ]}
          component={() => (
            <AutoComplete
              value={searchValue}
              open={focused}
              onBlur={() => {
                setFocused(false)
                setSearchVisibility(false)
              }}
              onFocus={() => setFocused(true)}
              onSelect={onSelect(setSearchValue)(setFocused)(openFile)(clearFiles)}
              onSearch={search(findFile)(setSearchValue)}
              dataSource={files.map(renderOption)}
              placeholder='Start typing'
            />
          )}
        />
      ) : null}
      {!isSearchVisible ? (
        <Button type='link' icon='search' style={{ marginRight: 8 }} onClick={() => setSearchVisibility(true)} />
      ) : null}
      {isSearchVisible ? (
        <Button type='link' icon='close' style={{ marginRight: 8 }} onClick={() => setSearchVisibility(false)} />
      ) : null}
    </div>
  )
}
