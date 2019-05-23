import React from 'react';

const Header = () => {
  return (
    <header>
      <section className="header__title">
        <p>ICON</p>
        <h1>Sticky Do's</h1>
      </section>
      <form>
        <input 
        type="text"
        placeholder="Take a Note..." />
      </form>
      
    </header>
  )
}

export default Header;

// Todo: (Line 10) add Form container,
// which will need to be Routed as well