import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';

function NavbarPrfl() {
  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
        </Link>
        <Link to='/event/create' >Create event</Link>
      </div>
    </div>
  );
}

export default NavbarPrfl;
