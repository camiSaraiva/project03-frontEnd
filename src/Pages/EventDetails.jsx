import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Contexts/auth.context';

function EventDetails() {
  const [eventDets, setEventDets] = useState(null);

  const { event } = useContext(AuthContext);

  const getEvent = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/${event.id}`);

      setEventDets(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className='EventDetails'>
      {eventDets && (
        <>
          <h1>{eventDets.title}</h1>
          <img src={eventDets.eventPic} alt='event illustration' />
          <p>{eventDets.description}</p>
        </>
      )}

      {eventDets &&
        eventDets.playlist.map((playlist) => {
          return (
            <li className='eventCard' key={playlist.id}>
              <h3>{playlist.title}</h3>
              <h4>Description:</h4>
              <p>{playlist.description}</p>
            </li>
          );
        })}

      <Link to={`/event/edit/${event.id}`}>Edit Event</Link>
    </div>
  );
}

export default EventDetails;
