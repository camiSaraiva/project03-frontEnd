import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/OnSpot_Logo.png';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/auth.context';

function NavbarPrfl() {
  const { user } = useContext(AuthContext);
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <div className='nvb-container'>
      <div className='d-img'>
        <Link to='/'>
          <img className='logo' src={Logo} alt='logo' />
        </Link>
        <Link className='pfl-nav' to='/event/create'>
          Create event
        </Link>
        {user && (
          <Link className='pfl-lo' to={`/profile/edit/${user.id}`}>
            Edit profile
          </Link>
        )}
      </div>
      <div>
        {loggedIn && (
          <Link className='pfl-lo' to='/' onClick={logout}>
            LogOut
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavbarPrfl;
