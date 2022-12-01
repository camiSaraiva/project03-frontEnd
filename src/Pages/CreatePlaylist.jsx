import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar-SP';

function CreatePlaylist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlistImg, setPlaylistImg] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const getToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    try {
      setLoading(true);

      const uploadData = new FormData();

      uploadData.append('image', e.target.files[0]);

      //send the file to our api
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      console.log(response.data.fileUrl);
      setPlaylistImg(response.data.fileUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/playlist`,
        { title, description, playlistImg },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      console.log(response.data);
     navigate(`/playlist/${response.data._id}`);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='CreatePlaylistPage'>
        <form className='CE-frm' onSubmit={handleSubmit}>
          <label className='CE-tlt'>Title:</label>
          <input className='int-CE' type='text' name='title' value={title} onChange={handleTitle} />

          <label>Description:</label>
          <input
            className='int-CE'
            type='text'
            name='description'
            value={description}
            onChange={handleDescription}
          />

          <label htmlFor='image'>Playlist Image</label>
          <input className='int-CE' type='file' name='image' onChange={handleUpload} />

          <button className='btt-CE' type='submit'>
            Create playlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaylist;
