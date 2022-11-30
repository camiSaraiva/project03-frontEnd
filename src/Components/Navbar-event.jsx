import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';

function NavbarEvent() {
  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
        </Link>
        <Link to='/profile'>All events</Link>
        <Link to='/playlist/create'>Create playlist</Link>
      </div>
    </div>
  );
}

export default NavbarEvent;
