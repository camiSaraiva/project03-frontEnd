/* import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchTrackPage() {
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tracks`);

      setTracks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div>
      <form>
        <input type='text' onChange={(e) => e.target.value}></input>
        <button type={'submit'}>Search</button>
      </form>
      <h3>List of apartments</h3>

      {tracks.map((tracks) => (
    
      ))}
    </div>
  );
} */
