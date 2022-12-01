import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';

function NavbarSp() {
  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
          <Link to='/profile' className=''>
            Profile
          </Link>
        </Link>
      </div>
    </div>
  );
}

export default NavbarSp;
