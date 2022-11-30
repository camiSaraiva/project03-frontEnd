import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarSp from '../Components/Navbar-SP';

//ESSA PÁGINA PRECISA SER PÚBLICA?
function Events() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/event`);
      //const eventsFromAPI = response.data;

      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='EventsListPage'>
      <NavbarSp />
      <h1>All your events:</h1>

      {events.map((event) => {
        return (
          <div key={event.id} className='Eventcard'>
            <h1>All events page</h1>
            <Link to={`/XXXXX/${event._id}`}>
              {/* AJUSTAR LINK*/}
              <h3>{event.title}</h3>
              <h3>{event.description}</h3>
              <h3>{event.rate}</h3>
              <h3>{event.collaboraters}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Events;
