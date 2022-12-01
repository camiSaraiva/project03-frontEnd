import axios from 'axios';
const getToken = localStorage.getItem('authToken');
const api = axios.create(
  {
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: `${process.env.REACT_APP_API_URL}`,
    // withCredentials: true // => you might need this option if using cookies and sessions
  },
  {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  }
);

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api
    .post('/upload', file)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default { uploadImage, errorHandler };
