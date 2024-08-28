import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Ensure store.ts exports AppDispatch
import { loginSuccess } from '../redux/authSlice'; // Ensure authSlice exports loginSuccess

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(loginSuccess({ email, password }));
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col justify-center items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        {/* Header content if needed */}
      </header>

      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <p className="mb-6">Hey, enter your details to sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Passcode"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" className="w-full bg-[#ffd495] text-black p-2 rounded">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to='/signup' className="text-blue-600">Request Now</Link>
        </p>
      </main>

      <footer className="mt-8 text-sm text-gray-500">
        Copyright @wework 2022 | Privacy Policy
      </footer>
    </div>
  );
};

export default LoginPage;
