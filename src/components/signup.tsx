import React, { useState, FormEvent } from 'react';
//import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store'; // Assume you have a store.ts file
// import { signup } from '../redux/actions'; // Assume this action exists

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  //const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    //dispatch(signup(name, email, password));
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col justify-center items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Razor</h1>
        <div>
          <button className="mr-4">Login</button>
          <button className="bg-[#ffd495] text-black px-4 py-2 rounded-md">Request Demo</button>
        </div>
      </header>
      
      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Agent Signup</h2>
        <p className="mb-6">Create your account to get started</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Create Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="absolute right-2 top-2 text-gray-500">Hide</button>
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" className="absolute right-2 top-2 text-gray-500">Hide</button>
          </div>
          <button type="submit" className="w-full bg-[#ffd495] text-black p-2 rounded">
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-4">— Or Sign up with —</p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 border rounded">Google</button>
            <button className="p-2 border rounded">Apple ID</button>
            <button className="p-2 border rounded">Facebook</button>
          </div>
        </div>
        
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