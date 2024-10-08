import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/login';
import Signup  from './pages/signup';
import CreateProduct from './pages/createProduct';
import Transactions from './pages/transactions';
import Admin from './pages/admin';
import { store } from './store';
import ProtectedRoute from './components/protectedRoute';
import './App.css'


function App() {
  

  return (
    <Provider store={store}>
    <>
    <Router>
   
        <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Admin />} />
          <Route path='/transactions' element={<Transactions />} />
          {/* <ProtectedRoute exact path="/" component={Admin} /> */}
          <Route path='/create' element={<CreateProduct />} />
        </Routes>

    </Router>


    </>
    </Provider>
  )
}

export default App
