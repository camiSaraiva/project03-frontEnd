import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import service from '../service/service';
import NavbarSp from '../Components/Navbar-SP';

function EditEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventPic, setEventPic] = useState('');

  const getToken = localStorage.getItem('authToken');

  const { id } = useParams();
  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const getEvent = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      console.log(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);
    service
      .uploadImage(uploadData)
      .then((response) => {
        setEventPic(response.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/event/${id}`,
        {
          title,
          description,
          eventPic,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      //clear the inputs
      setTitle('');
      setDescription('');
      setEventPic('');

      //redirect to the details view
      navigate(`/event/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState('');

  const getTracks = async () => {
    try {
      const apiCall = await axios.get(`	https://api.spotify.com/v1/search`, {
        headers: {
          Authorization:
            'Bearer BQB71sQiXJBn0BX2-2MitZCt5fAOpeiBQ7H-ZNq_o3l3PSeBD7q8-HJ01tTQfSdlYCoJqJVKf5Ag_NACxSYzVTXZwPnughMQoKj8a0CY6kt6ffOYHFW38708Fe6j75IdGDoZ0LwTYPYdKgt8H-kyVB-kBU_NDz3ImGfyLx2_OE_pvTGLZcGSIbz65A1cinRBrZiNK6X24JjKX2qwiK6vpQtwppMlcGDK15AAlD9-WdUdn2MfamcZef-nsBgtke48KhsbIdQ0xQQJU1Tm3_gZZi_-UCALCctOaIOlo2LLd-nyyeZlnwCUlsA',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: { q: `${search}`, type: 'track' },
      });
      console.log(apiCall.data.tracks.items);
      setTracks(apiCall.data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTracks();
  }, [search]);

  const addSong = async (image, artist, track) => {
    const song = {
      image: image,
      artist: artist,
      track: track,
    };

    const apiCall = await axios.put(`${process.env.REACT_APP_API_URL}/addSong/${id}`, song, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });

    console.log(apiCall.data);
  };

  return (
    <div>
      <NavbarSp />
      <section className='EditEventPage'>
        <h3 className='ev-tlt'>Edit Event</h3>
        <form onSubmit={handleSubmit} className='ev-frm'>
          <label htmlFor='title' className='tlt-LG'>
            Title
          </label>
          <input value={title} className='ipt-em' type='text' name='title' onChange={handleTitle} />
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            value={description}
            cols='20'
            rows='3'
            onChange={handleDescription}
            className='int-SU'
          ></textarea>

          <label htmlFor='eventPic'>Event Image</label>
          <input className='int-CE' type='file' name='image' onChange={handleFileUpload} />


          <label htmlFor='search' className='tlt-LG'>
            Search
          </label>
          <input
            value={search}
            className='ipt-em'
            type='text'
            name='title'
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className='searchResult' style={{ height: 300, 'overflow-y': 'scroll' }}>
            <button className='btt-CE' type='submit'>
              Save
            </button>
            {tracks &&
              tracks.map((track) => {
                return (
                  <Link
                    onClick={() =>
                      addSong(track.album.images[0].url, track.artists[0].name, track.name)
                    }
                  >
                    <span key={track.id}>
                      <img src={track.album.images[0].url} style={{ width: 50 }} alt='artist pic' />
                      <p>{track.artists[0].name}</p>
                      <p>{track.name}</p>
                    </span>
                  </Link>
                );
              })}
          </div>
        </form>
        {/* Delete the project */}
        <button onClick={deleteEvent}>Delete</button>
      </section>
    </div>
  );
}

export default EditEvent;
