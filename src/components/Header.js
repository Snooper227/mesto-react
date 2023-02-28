import React from 'react';
import Logo from '../images/vector.svg';

function Header() {
  return (
    <>
      <header className="header">
        <img src={Logo} class="header__logo" alt="Лого" />
      </header>
    </>
  )
}

export default Header
