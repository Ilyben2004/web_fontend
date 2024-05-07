import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddPhone from './components/addPhone/AddPhone';
import ListPhone from './components/phoneList/ListPhone';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='addphone' element={<AddPhone />} />
        <Route path='listphone' element={<ListPhone />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
