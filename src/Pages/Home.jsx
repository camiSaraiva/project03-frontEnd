import React from 'react';
import Navbar from '../Components/Navbar';
import ImageHome from '../assets/image/Image_home.png';

function Home() {
  return (
    <div>
      <Navbar />
      <div className='hm-container'>
        <h1 className='hm-tlt'>OnSpot</h1>
        <h3 className='hm-sbtlt'>
          Create collaborative playlists for you next event with <i>OnSpot!</i>
        </h3>
        <p className='hm-prg'>
          OnSpot app allows the user to create, edit and delete events and the playlists that will
          play in them. Each event is assigned a code, which allows guests to create their own
          playlists or contribute to playlists created by other event participants.
        </p>
        <img className='hm-img' src={ImageHome} alt='PeopleDancing' />
      </div>
    </div>
  );
}

export default Home;
