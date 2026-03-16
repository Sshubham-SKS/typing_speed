import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getResults, getAnalytics } from '../api/typingApi';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          getAnalytics(user.id),
          getResults(user.id)
        ]);
        setStats(statsRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading) return <div className="min-h-screen text-white flex justify-center mt-20">Loading profile data...</div>;

  return (
    <div className="max-w-[1500px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <ProfileCard user={user} stats={stats} />
          
          <button 
            onClick={logout}
            className="w-full py-3 px-4 glass-panel border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500 transition-colors font-bold text-base flex items-center justify-center gap-3"
          >
            <span className="text-xl">🚪</span> Sign Out
          </button>
        </div>

        {/* Detailed History */}
        <div className="md:col-span-2 space-y-6 max-w-4xl">
          <div className="glass-panel p-10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">📋</span>
              Complete Test History
            </h2>

            {history.length === 0 ? (
              <p className="text-slate-400">No tests taken yet. Head to practice area to start!</p>
            ) : (
              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-900 z-10">
                    <tr className="border-b border-slate-700/50 text-slate-400 text-base">
                      <th className="py-4 px-6 font-bold uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-wider">Speed (WPM)</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-wider">Accuracy</th>
                      <th className="py-4 px-6 font-bold uppercase tracking-wider text-right">Time (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((result) => {
                        const date = new Date(result.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        });
                        return (
                      <tr key={result.id} className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors text-lg">
                        <td className="py-4 px-6 text-slate-300">{date}</td>
                        <td className="py-4 px-6 text-white font-bold">{result.speed}</td>
                        <td className="py-4 px-6 text-emerald-400">{Math.round(result.accuracy)}%</td>
                        <td className="py-4 px-6 text-slate-400 text-right">{result.time_taken}s</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
