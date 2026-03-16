import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaKeyboard, FaChartBar, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-x-0 border-t-0 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
              <FaKeyboard className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              SpeedType
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/" className={navLinkClass('/')}>
              <FaChartBar /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link to="/typing" className={navLinkClass('/typing')}>
              <FaKeyboard /> <span className="hidden sm:inline">Practice</span>
            </Link>
            <Link to="/profile" className={navLinkClass('/profile')}>
              <FaUser /> <span className="hidden sm:inline">Profile</span>
            </Link>
            
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            
            <div className="flex items-center gap-3 pl-2">
              <img 
                src={user?.profile_pic} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-slate-600 object-cover"
              />
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
