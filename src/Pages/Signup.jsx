import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarSp from '../Components/Navbar-SP';

function Signup(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { email, username, password });
      navigate('/login');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='bd-sp'>
      <NavbarSp />
      <div className='SignupPage'>
        <div className='form-container'>
          <form className='form-SU' onSubmit={handleSignupSubmit}>
            <label className='lbl-em'>Email:</label>
            <input className='int-SU' type='email' name='email' value={email} onChange={handleEmail} />

            <label>Username:</label>
            <input className='int-SU'type='username' name='username' value={username} onChange={handleUsername} />

            <label>Password:</label>
            <input className='int-SU' type='password' name='password' value={password} onChange={handlePassword} />

            <button className='btt-SU' type='submit'>Sign Up</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <p class='lg-SP'>Already have an account?</p>
            <Link className='SU-lg' to='/login'> Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
