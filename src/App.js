import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddPhone from './components/addPhone/AddPhone';
import Phones from './components/phoneList/Phones'
import MapInterface from './components/MapInterface/MapInterface';
import Notifications from './components/notifications/Notifications';
import Loading from './components/lodaing/Loading';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='addphone' element={<AddPhone />} />
        <Route path='phones' element={<Phones />} />
        <Route path='map' element={<MapInterface />} />
        <Route path='notification' element={<Notifications />} />
        <Route path='loading' element={<Loading />} />







      </Routes>
    </BrowserRouter>
  );
}

export default App;
