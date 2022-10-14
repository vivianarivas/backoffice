import React from 'react'
import style from './style.module.scss'

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerInner}>
        <p className="mb-0">
          Copyright © 2020 
          <a href="https://censys.com.ar/" target="_blank" rel="noopener noreferrer">
          &nbsp;Censys
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
