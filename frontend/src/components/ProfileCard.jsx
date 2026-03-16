import React from 'react';

const ProfileCard = ({ user, stats }) => {
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="glass-panel p-6 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-60"></div>
      
      <div className="relative mt-8 mb-4">
        <div className="w-24 h-24 rounded-full p-1 bg-slate-800 border-4 border-slate-600 shadow-2xl">
          <img 
            src={user.profile_pic} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {stats?.best_speed > 80 && (
           <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-900 p-1.5 rounded-full ring-4 ring-slate-800 text-xl" title="Pro Typist">
             👑
           </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
      <p className="text-slate-400 text-base mb-4">{user.email}</p>
      
      <div className="w-full h-px bg-slate-700/50 my-4"></div>
      
      <div className="w-full flex justify-between text-base">
        <span className="text-slate-400 font-medium">Total Tests</span>
        <span className="text-white font-bold">{stats?.total_tests || 0}</span>
      </div>
      <div className="w-full flex justify-between text-base mt-2">
        <span className="text-slate-400 font-medium">Member Since</span>
        <span className="text-white font-bold">{memberSince}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
