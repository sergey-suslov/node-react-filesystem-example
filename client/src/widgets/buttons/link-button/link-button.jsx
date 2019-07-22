import React, { Children } from 'react'
import { Button } from 'antd'
import './link-button.less'

export default props => <Button className="link-button" type="link">
  {props.children}
</Button>