import React from 'react';
import {NavLink} from 'react-router-dom';
import ICON from '../../imgs/Sticky-Note.svg';

const Header = () => {

  return (
    <header>
      <section className="header__title">
         <NavLink to={'/'} > 
            <img src={ICON} alt="Sticky Do's Logo" /> 
          </NavLink>
        <h1>Sticky Do's</h1>
      </section>
        <section className="Nav-to-Form">
          <NavLink to='/new-note'>
            Take a Note...
          </NavLink>
        </section>
    </header>
  )
}

export default Header;