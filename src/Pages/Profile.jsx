import React from 'react';
import NavbarPrfl from '../Components/Navbar-prfl';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${id}`);

      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <NavbarPrfl />
      <div>
        <img src={user.profilePic} alt='profile' />
        <h3>Hi {user.usename}</h3>
      </div>
    </div>
  );
}

export default Profile;
