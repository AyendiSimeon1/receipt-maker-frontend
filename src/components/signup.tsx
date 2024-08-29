import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  // Initialize formData with default values to avoid null or undefined
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    try {
      const url = '127.0.0.1:3004/auth/signup'; 
      const response = await axios.post('http://127.0.0.1:3004/auth/signup', formData);

      if (response.status === 201) { 
        console.log('Signup successful');
        navigate('/login'); 
      }

    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col justify-center items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        
      </header>

      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Signup</h2>
        <p className="mb-6">Create your account to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Create Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="w-full bg-[#ffd495] text-black p-2 rounded">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account? <a href="#" className="text-blue-600">Login</a>
        </p>
      </main>

      <footer className="mt-8 text-sm text-gray-500">
        Copyright @wework 2022 | Privacy Policy
      </footer>
    </div>
  );
};

export default SignupPage;
