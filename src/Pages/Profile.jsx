import React from 'react';
import NavbarPrfl from '../Components/Navbar-prfl';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Contexts/auth.context';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Fazer duas páginas de profile, uma para se estiver logado e outra se não.
function Profile() {
  const [profile, setProfile] = useState({});

  const { user } = useContext(AuthContext);

  const getUser = async () => {
    try {
      console.log(user);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user.id}`);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div>
      <NavbarPrfl />
      {profile && (
        <div className='profileContainer'>
          <section className='pfl'>
            <img className='pfl-pic' src={profile.profilePic} alt='profile' />
            <h2 className='prl-grt'>Hi, {profile.username}</h2>
          </section>
          <section className='pfl-evnt'>
            <h2 className='prl-tlt'>All your events</h2>
            {profile.events &&
              profile.events.map((event) => {
                return (
                  <div key={event._id}>
                    <Link className='prf-elkn' to={`/event/${event._id}`}>
                      <p>{event.title}</p>
                    </Link>
                  </div>
                );
              })}
          </section>
        </div>
      )}
    </div>
  );
}

export default Profile;
