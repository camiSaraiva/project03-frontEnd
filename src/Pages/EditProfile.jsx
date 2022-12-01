import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import service from '../service/service';
import NavbarSpPfl from '../Components/Navbar-sp-pfl';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const getToken = localStorage.getItem('authToken');

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      console.log(response.data);
      setUsername(response.data.title);
      setEmail(response.data.description);
      setProfilePic(response.data.profilePic);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);
    service
      .uploadImage(uploadData)
      .then((response) => {
        setProfilePic(response.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/edit/${id}`,
        {
          email,
          username,
          profilePic,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      //clear the inputs
      setEmail('');
      setUsername('');
      setProfilePic('');

      //redirect to the details view
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  return (
    <div>
      <NavbarSpPfl />
      <section className='EditEventPage'>
        <h3 className='ev-tlt'>Edit Profile</h3>
        <form onSubmit={handleSubmit} className='ev-frm'>
          <label htmlFor='title' className='tlt-LG'>
            Email
          </label>
          <input value={email} className='ipt-em' type='text' name='email' onChange={handleEmail} />
          <label htmlFor='tile'>username</label>
          <input
            value={username}
            className='ipt-em'
            type='text'
            name='title'
            onChange={handleUsername}
          />

          <label htmlFor='profilePic'>Profile picture</label>
          <input className='int-CE' type='file' name='image' onChange={handleFileUpload} />
          <button className='btt-CE' type='submit'>
            Save
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditProfile;
