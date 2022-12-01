import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Contexts/auth.context';
import NavbarSpPfl from '../Components/Navbar-sp-pfl';

function EventDetails() {
  const [eventDets, setEventDets] = useState({});
  const getToken = localStorage.getItem('authToken');
  const { id } = useParams();
  const navigate = useNavigate();

  const getEvent = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      setEventDets(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    getEvent();
  }, [eventDets.playlists]);

  const deleteEvent = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const removeSong = async (track) => {
    const apiCall = await axios.put(
      `${process.env.REACT_APP_API_URL}/removeSong/${id}`,
      { track },
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    );

    console.log(apiCall.data);
  };

  return (
    <div className='EventDetails'>
      {eventDets && (
        <>
          <NavbarSpPfl />
          <h1 className='ev-tlt'>{eventDets.title}</h1>
          <p className='ed-dcp'>{eventDets.description}</p>
        </>
      )}
      <section className='ed-container'>
        <h3 className='evD-tlt'>Tracks</h3>
        {eventDets.playlists &&
          eventDets.playlists.map((song) => {
            return (
              <Link onClick={() => removeSong(song.track)}>
                <span key={song.track} className='ed-sp'>
                  <img src={song.image} style={{ width: 50 }} alt='artist pic' />
                  <p>{song.artist}</p>
                  <p>{song.track}</p>
                </span>
              </Link>
            );
          })}

        {eventDets && (
          <>
            {' '}
            <Link to={`/event/edit/${eventDets._id}`} className='ev-lnk'>
              Edit Event
            </Link>
            <Link onClick={() => deleteEvent()} className='ev-lnk'>
              Delete Event
            </Link>{' '}
          </>
        )}
      </section>
    </div>
  );
}

export default EventDetails;
