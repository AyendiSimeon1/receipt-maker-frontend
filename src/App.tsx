import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/login';
import Signup  from './pages/signup';
import Admin from './pages/admin';
import { store } from './store';
import './App.css'


function App() {
  

  return (
    <Provider store={store}>
    <>
    <Router>
   
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>

    </Router>


    </>
    </Provider>
  )
}

export default App
