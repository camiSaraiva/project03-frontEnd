import './App.css';
import { Routes, Route } from 'react-router-dom';
import Search from './Pages/SearchTrackPage';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup';
import CreateEvent from './Pages/CreateEvent';
import Footer from './Components/Footer';
import Profile from './Pages/Profile';
import CreatePlaylist from './Pages/CreatePlaylist';
import EventDetails from './Pages/EventDetails';
import EditEvent from './Pages/EditEvent';
import Error from './Pages/Error';
import Events from './Pages/Events';
import EditPlaylist from './Pages/EditPlaylist';
import EditProfile from './Pages/EditProfile';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit/:id' element={<EditProfile />} />
        <Route path='/event/create' element={<CreateEvent />} />
        <Route path='/events' element={<Events />} />
        <Route path='/event/:id' element={<EventDetails />} />
        <Route path='/event/edit/:id' element={<EditEvent />} />
        <Route path='/playlist/create' element={<CreatePlaylist />} />
        <Route path='/playlist/:id' element={<EditPlaylist />} />
        <Route path='/playlist/edit/:id' element={<EditPlaylist />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
