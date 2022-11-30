import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../service/service';
import NavbarSp from '../Components/Navbar-SP';

function EditEvent() {
  const [title, setTitle] = useState(`{title}`);
  const [description, setDescription] = useState('');
  const [eventPic, setEventPic] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const getEvent = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/${id}`);

      setTitle(response.data.title);
      setDescription(response.data.description);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('eventPic', e.target.files[0]);
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
      await axios.put(`${process.env.REACT_APP_API_URL}/event/${id}`, {
        title,
        description,
        eventPic,
      });

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
      await axios.delete(`${process.env.REACT_APP_API_URL}/event/${id}`);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
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
          <input className='ipt-em' type='text' name='title' onChange={handleTitle} />
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

export default EditEvent;
