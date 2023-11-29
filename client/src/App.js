import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
