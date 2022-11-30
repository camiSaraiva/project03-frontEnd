import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/auth.context.js';
import NavbarSp from '../Components/Navbar-SP';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      storeToken(response.data.authToken);

      authenticateUser();

      navigate('/profile');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='bd-lg'>
      <NavbarSp />
      <div className='LoginPage'>
        <div className='form-container'>
          <form className='form-LG' onSubmit={handleLoginSubmit}>
            <label className='tlt-LG'>Email:</label>
            <input
              className='ipt-em'
              type='email'
              name='email'
              value={email}
              onChange={handleEmail}
            />

            <label>Password:</label>
            <input
              className='int-SU'
              type='password'
              name='password'
              value={password}
              onChange={handlePassword}
            />

            <button className='btt-LG' type='submit'>
              Login
            </button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}

            <p class='sp-LG'>Don't have an account yet?</p>
            <Link className='LG-su' to={'/signup'}>
              {' '}
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
