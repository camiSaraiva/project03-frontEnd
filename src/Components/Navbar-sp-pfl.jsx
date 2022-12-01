import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';

function NavbarSpPfl() {
  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
        </Link>
        <Link to='/profile' className='pfl-nav-lnk'>
          Profile
        </Link>
      </div>
    </div>
  );
}

export default NavbarSpPfl;
