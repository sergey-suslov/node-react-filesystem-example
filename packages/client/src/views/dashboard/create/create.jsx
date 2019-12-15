import React, { useState, Fragment } from 'react'
import { Icon, Popover, Input, Button } from 'antd'
import nanoid from 'nanoid'

import DefaultButton from '../../../widgets/buttons/default-button'
import './create.less'

function CreateForm(props) {
  const { create, close } = props
  const [name, setName] = useState('')
  const add = type => () => {
    setName('')
    create(type)(name)()
    close()
  }
  return (
    <Fragment>
      <Input autoFocus placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button disabled={name === ''} type='link' shape='circle' icon='folder-add' size="large" onClick={add('directory')} />
        <Button disabled type='link' shape='circle' icon='user-add' size="large" onClick={add('profile')} />
      </div>
    </Fragment>
  )
}

export default function(props) {
  const { create } = props
  const [open, setOpen] = useState(false)
  return (
    <Popover
      content={<CreateForm close={() => setOpen(false)} create={type => name => () => create({ type, name, id: nanoid() })} />}
      title='Create'
      trigger='click'
      placement='leftTop'
      visible={open}
      onVisibleChange={setOpen}
    >
      <DefaultButton shape='circle'>
        <Icon type='plus' />
      </DefaultButton>
    </Popover>
  )
}
