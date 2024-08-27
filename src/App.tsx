import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
        </Routes>

    </Router>


    </>
  )
}

export default App
