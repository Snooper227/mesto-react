import React from 'react';
import Logo from '../images/vector.svg';

function Header() {
  return (
    <>
      <header className="header">
        <img src={Logo} className="header__logo" alt="Лого" />
      </header>
    </>
  )
}

export default Header
