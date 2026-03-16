import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserPlus } from 'react-icons/fa';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if(!formData.profile_pic) {
        delete formData.profile_pic; // Will use default in DB
      }
      await signup(formData);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-lg p-12 relative z-10 my-12">
        <div className="text-center mb-10">
          <div className="inline-flex bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 mb-6">
            <FaUserPlus className="text-white text-4xl" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">Create Account</h2>
          <p className="text-slate-400 text-lg">Join to test and improve your typing</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 px-6 py-4 rounded-xl text-base mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-base font-semibold text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-slate-900/50 border border-slate-700 text-white text-lg rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-slate-900/50 border border-slate-700 text-white text-lg rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              className="w-full bg-slate-900/50 border border-slate-700 text-white text-lg rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-slate-300 mb-2">Profile Image URL (Optional)</label>
            <input
              type="url"
              name="profile_pic"
              className="w-full bg-slate-900/50 border border-slate-700 text-white text-lg rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
              placeholder="https://..."
              value={formData.profile_pic}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center mt-8"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-400 text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
