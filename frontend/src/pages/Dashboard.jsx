import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAnalytics, getLast5Results } from '../api/typingApi';
import ChartBox from '../components/ChartBox';
import ProfileCard from '../components/ProfileCard';
import { FaClock, FaTrophy, FaKeyboard, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, unit, icon, color }) => (
  <div className="glass-panel p-6 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-40 h-40 bg-${color}-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
    <div className="relative z-10">
      <div className={`p-3 bg-${color}-500/20 text-${color}-400 rounded-xl inline-flex mb-3`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${icon.props.className}` })}
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight">
          {value}
        </h3>
        {unit && <span className="text-slate-500 text-sm font-bold ml-1">{unit}</span>}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total_tests: 0,
    avg_speed: 0,
    best_speed: 0,
    avg_accuracy: 0,
    total_time: 0
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, historyRes] = await Promise.all([
          getAnalytics(user.id),
          getLast5Results(user.id)
        ]);
        setStats(analyticsRes.data);
        setHistory(historyRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Format total time (seconds to minutes/hours)
  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.floor(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12 space-y-12">
      {/* Header Segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-400">Here's a breakdown of your typing performance.</p>
        </div>
        <Link 
          to="/typing"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          <FaKeyboard /> Start Practice
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Profile & Quick Stats */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileCard user={user} stats={stats} />
          
          {stats.total_tests === 0 && (
            <div className="glass-panel p-6 text-center border-dashed">
              <p className="text-slate-400 text-sm mb-4">You haven't taken any tests yet.</p>
              <Link to="/typing" className="text-indigo-400 text-sm font-medium hover:text-indigo-300">Take your first test &rarr;</Link>
            </div>
          )}
        </div>

        {/* Right Column - Stats Grid & Charts */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* 4-Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Average Speed" 
              value={stats.avg_speed} 
              unit="WPM" 
              icon={<FaKeyboard className="text-indigo-400" />} 
              color="indigo" 
            />
            <StatCard 
              title="Best Speed" 
              value={stats.best_speed} 
              unit="WPM" 
              icon={<FaTrophy className="text-amber-400" />} 
              color="amber" 
            />
            <StatCard 
              title="Accuracy" 
              value={stats.avg_accuracy} 
              unit="%" 
              icon={<FaBullseye className="text-emerald-400" />} 
              color="emerald" 
            />
            <StatCard 
              title="Time Practicing" 
              value={formatTime(stats.total_time)} 
              icon={<FaClock className="text-sky-400" />} 
              color="sky" 
            />
          </div>

          {/* Charts Row */}
          {stats.total_tests > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-white mb-8">Recent Speeds (WPM)</h3>
                <div className="h-[360px]">
                  <ChartBox 
                    type="line" 
                    data={history.map(h => h.speed)} 
                    labels={history.map((_, i) => `Test ${i+1}`)}
                    color="rgb(99, 102, 241)" // indigo-500
                    gradientStart="rgba(99, 102, 241, 0.5)"
                  />
                </div>
              </div>

              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-white mb-8">Recent Accuracy (%)</h3>
                <div className="h-[360px]">
                  <ChartBox 
                    type="bar" 
                    data={history.map(h => h.accuracy)} 
                    labels={history.map((_, i) => `Test ${i+1}`)}
                    color="rgb(16, 185, 129)" // emerald-500
                  />
                </div>
              </div>

              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-white mb-8">Test Durations (s)</h3>
                <div className="h-[360px]">
                  <ChartBox 
                    type="bar" 
                    data={history.map(h => h.time_taken)} 
                    labels={history.map((_, i) => `Test ${i+1}`)}
                    color="rgb(245, 158, 11)" // amber-500
                    label="Duration (s)"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
