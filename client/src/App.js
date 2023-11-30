import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from'./components/Login';
import Users from './components/Users';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Register />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/users' element={<Users />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
