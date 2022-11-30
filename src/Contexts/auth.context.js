import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setLoggedIn(true);
        setUser(response.data);
        setLoading(false);
        setEvent(response.data);
      } else {
        setLoggedIn(false);
        setUser(null);
        setLoading(false);
        setEvent(null);
      }
    } catch (error) {
      setLoggedIn(false);
      setUser(null);
      setLoading(false);
      setEvent(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, loading, event, storeToken, authenticateUser, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
