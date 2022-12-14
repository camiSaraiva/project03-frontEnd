import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';

function Navbar() {
  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
        </Link>
      </div>
      <div>
        <Link className='d-lSp' to='/signup'>
          Sign Up
        </Link>
      </div>
      <div>
        <Link className='d-lLg' to='/login'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
