import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginSuccess } from '../redux/authSlice';
import axios from 'axios';

interface FormData {
  email: string;
  password: string;
}

const Spinner: React.FC = () => (
  <div className="spinner"></div>
);

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://receipt-maker.onrender.com/auth/login', formData);
      if (response.status === 200) {
        console.log('Login Successful');
        dispatch(loginSuccess(response.data));
        console.log(response.data);
        navigate('/');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error('An unknown error occurred:', error);
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col justify-center items-center p-4">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border-left-color: #000;
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </header>
      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <p className="mb-6">Hey, enter your details to sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Passcode"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="mb-4 text-sm text-blue-600">
            <a href="#">Having trouble signing in?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#ffd495] text-black p-2 rounded flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                <span className="ml-2">Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to='/signup' className="text-blue-600">Request Now</Link>
        </p>
      </main>
      <footer className="mt-8 text-sm text-gray-500">
        Copyright @Double Glory Stores 2024 | Privacy Policy
      </footer>
    </div>
  );
};

export default LoginPage;