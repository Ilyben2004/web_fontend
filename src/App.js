import './App.css';
import { BrowserRouter, Routes, Route,  useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // Import useState
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddPhone from './components/addPhone/AddPhone';
import Phones from './components/phoneList/Phones'
import MapInterface from './components/MapInterface/MapInterface';
import Notifications from './components/notifications/Notifications';
import Loading from './components/lodaing/Loading';

function App() {
  // Initialize login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    console.log("function executed hahahahahaha ");
    // Set login state to true
    setIsLoggedIn(true);
  };
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');
    if (loginStatus === '1') {

      handleLogin(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass isLoggedIn and handleLogin to Login component */}
        <Route path='login' element={<Login handleLogin={handleLogin} />} />
        {/* Other routes */}
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='addphone' element={<AddPhone isLoggedIn={isLoggedIn} />} />
        <Route path='phones' element={<Phones />} />
        <Route path='map' element={<MapInterface isLoggedIn={isLoggedIn} />} />
        <Route path='notification' element={<Notifications isLoggedIn={isLoggedIn} />} />
        <Route path='loading' element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
