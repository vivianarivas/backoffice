import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Avatar, Badge,Switch  } from 'antd'
import styles from './style.module.scss'
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

const mapStateToProps = ({ user ,settings,dispatch}) => ({ 
  user,
  settings,
  flag: settings.flag, 
  dispatch
})

const ProfileMenu = ({  user ,settings,flag,dispatch}) => {

  const logout = e => {
    e.preventDefault()
    dispatch({
      type: 'client/LOGOUT',
    })
    dispatch({
      type: 'user/LOGOUT',
    })
    dispatch({
      type: 'notification/LOGOUT',
    })

  }
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    dispatch({
      type: 'settings/SETTING',
      payload: {
        checked
      },
    })
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          <FormattedMessage id="topBar.profileMenu.hello" />, {user.name || 'Anonymous'}
        </strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <strong>
            <FormattedMessage id="topBar.profileMenu.email" />:{' '}
          </strong>
          {user.email || '—'}
          <br />
        </div>
      </Menu.Item>
      <Menu.Divider />
        <Menu.Item>
            <strong>
              <FormattedMessage id="topBar.profileMenu.setting" />:{' '}
            </strong>
            <Switch
            checkedChildren={<SettingOutlined/>}
            unCheckedChildren={<CloseOutlined />}
            checked={flag}
            onChange={onChange}
            />
        </Menu.Item>
      <Menu.Divider />

      <Menu.Item>
        <a href="#" onClick={logout}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} >
      <div className={styles.dropdown}>
        <Badge >
          <Avatar className={styles.avatar} shape="square" size="large" icon={<UserOutlined />} 
            src={`data:image/jpeg;base64,${user.avatar}`}
          />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
