import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Typography, Form } from 'antd'
import DefaultInput from '../../../widgets/inputs/default-input'
import PasswordInput from '../../../widgets/inputs/password-input'
import DefaultButton from '../../../widgets/buttons/default-button'
import './sign-up-form.less'


class SignUpForm extends Component {

  state = {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('submit', err)
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSubmit, confirmPasswordValidator } = this;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item>
        {getFieldDecorator('email', {
            rules: [{ 
              required: true,
              message: 'Please input your email',
              whitespace: true,
            }, { 
              message: 'Enter valid email',
              type: 'email'
            }],
          })(
            <DefaultInput placeholder="Email" />,
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password', whitespace: true }],
          })(
            <PasswordInput placeholder="Password" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: 'Please confirm your password', whitespace: true },
            { validator: confirmPasswordValidator, message: 'Passwords must match' }],
          })(
            <PasswordInput placeholder="Confirm Password" />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <DefaultButton type="primary" htmlType="submit">
            Sign Up
          </DefaultButton>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedSignUpForm = Form.create({ name: 'sign_up'})(SignUpForm);

export default WrappedSignUpForm
