import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route, useNavigate } from "react-router-dom";
import { app } from './firebase-config';
import { getAuth } from 'firebase/auth';
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  let navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    auth.signOut()
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }
  
  return (
    <div className="App">
      <>
      <Header handleLogout={handleLogout} />
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
        <Footer />
      </>
    </div>
  );
}

export default App;
