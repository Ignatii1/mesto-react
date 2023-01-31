import React from 'react'
import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__logo">
        <picture>
          <source srcSet="./images/logo-mini.svg" media="(max-width: 321px)" />
          <img src={logo} alt="Логотип Место" className="header__logo-img" />
        </picture>
      </a>
      <a href="#XJKDHSTQ" style={{display: 'none'}}></a>
    </header>
  )
}

export default Header
