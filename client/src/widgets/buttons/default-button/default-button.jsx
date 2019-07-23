import React, { Children } from 'react'
import { Button } from 'antd'
import './default-button.less'

export default props => <Button className="default-button" { ...props } shape="round" type="primary">
  {props.children}
</Button>