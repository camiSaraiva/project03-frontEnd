import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarEvent from '../Components/Navbar-event';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleEventCode = (e) => setEventCode(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem('authToken');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/event`,
        { title, description, eventCode },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      navigate('/profile');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <NavbarEvent />
      <div className='CreateEventPage'>
      <form className='CE-frm' onSubmit={handleSubmit}>
        <label className='CE-tlt'>Title:</label>
        <input className='int-CE' type='text' name='title' value={title} onChange={handleTitle} />

        <label>Description:</label>
        <input className='int-CE' type='text' name='description' value={description} onChange={handleDescription} />

        <label>Code:</label>
        <input className='int-CE' type='text' name='password' value={eventCode} onChange={handleEventCode} />

        <button className='btt-CE' type='submit'>Create event</button>
      </form>
      </div>
    </div>
  );
}

export default CreateEvent;
