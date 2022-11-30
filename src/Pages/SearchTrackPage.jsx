import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function SearchTrackPage() {
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    try {
      const apiCall = await axios.get(`	https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: { q: 'vienna', type: 'track' },
      });
      console.log(apiCall.data.tracks.items);
      setTracks(apiCall.data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className='loginBody'>
      <div className='loginPageB'>
        {tracks &&
          tracks.map((track) => {
            return (
              <span key={track.id}>
                <img src={track.album.images[0].url} style={{ width: 100 }} alt='artist pic' />
                <p>{track.artists[0].name}</p>
                <p>{track.name}</p>
              </span>
            );
          })}
      </div>
    </div>
  );
}

export default SearchTrackPage;
