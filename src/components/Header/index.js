import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor() {
    super()
    this.state={
      renderForm: false
    }
  }

  render() {
    let {renderForm} = this.state;
    return (
    <header>
      <section className="header__title">
        <p>ICON</p>
        <h1>Sticky Do's</h1>
      </section>
      {!renderForm && 
        <form>
          <NavLink to='/new-note'>
            Take a Note...
          </NavLink>
        </form>
      }
    </header>
  )
  }
}

export default Header;

// Todo: (Line 10) add Form container,
// which will need to be Routed as well