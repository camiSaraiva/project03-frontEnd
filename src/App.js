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

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/event/create' element={<CreateEvent />} />
        <Route path='/playlist/create' element={<CreatePlaylist />} />
        <Route path='*' element={<CreateEvent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
