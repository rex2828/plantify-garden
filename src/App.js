import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route, useNavigate } from "react-router-dom";
import { app } from './firebase-config';


function App() {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/')
    }
  }, [navigate])
  
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path='/'
            element={
              <Home />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={
              <Register />}
          />
        </Routes>
      </>
    </div>
  );
}

export default App;
