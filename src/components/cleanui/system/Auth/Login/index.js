import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Radio, Form, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
})

const Login = ({ dispatch, user }) => {
  const onFinish = values => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }


  return (
    <div>
      <div className={`card ${style.container}`}>
        <div className="text-center mb-3">
          <h2 className="mb-4 px-3">
            <strong>Bienvenido a Back-Office</strong>
          </h2>
        </div>
        <div className="text-dark text-center font-size-24 mb-4">
          <strong>Iniciar sesión</strong>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese Usuario' }]}
          >
            <Input size="large" autoComplete='off' placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese Password' }]}
          >
            <Input size="large" autoComplete='off' type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="text-center w-100"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Ingresar</strong>
          </Button>
        </Form>
        {/*<Link to="/auth/forgot-password" className="kit__utils__link font-size-16">
          Forgot Password?
        </Link>*/}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
