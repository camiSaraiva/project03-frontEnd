import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../service/service';
import NavbarSp from '../Components/Navbar-SP';

function EditPlaylist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [playlistImg, setPlaylistImg] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const getPlaylist = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/edit/${id}`);

      setTitle(response.data.title);
      setDescription(response.data.description);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('eventPic', e.target.files[0]);
    service
      .uploadImage(uploadData)
      .then((response) => {
        setPlaylistImg(response.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        title,
        description,
        playlistImg,
      });

      //clear the inputs
      setTitle('');
      setDescription('');
      setPlaylistImg('');

      //redirect to the details view
      navigate(`/event/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/event/${id}`);
      //after we delete we redirect back to the project list
      navigate('/event');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='EditEventPage'>
      <NavbarSp />
      <section className='EditPlaylistPage'>
        <h3 className='ev-tlt'>Edit Playlist</h3>
        <form onSubmit={handleSubmit} className='ev-frm'>
          <label htmlFor='title' className='tlt-LG'>
            Title
          </label>
          <input type='text' name='title' value={title} onChange={handleTitle} className='ipt-em' />
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
          <input className='int-CE' type='file' name='eventPic' onChange={handleFileUpload} />

          <button className='btt-CE' type='submit'>
            Save
          </button>
        </form>

        {/* Delete the project */}
        <button onClick={deleteEvent}>Delete</button>
      </section>
    </div>
  );
}

export default EditPlaylist;
