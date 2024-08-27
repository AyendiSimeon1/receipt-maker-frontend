import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Signup  from './pages/signup';
import Admin from './pages/admin';

import './App.css'


function App() {
  

  return (
    <>
    <Router>
    <Link to="/">Home</Link>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>

    </Router>


    </>
  )
}

export default App
