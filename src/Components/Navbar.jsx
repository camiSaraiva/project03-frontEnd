import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  return (
    <div>
    
      <button onClick={handleToggle}>{navbarOpen ? 'Close' : 'Open'}</button>
      <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
