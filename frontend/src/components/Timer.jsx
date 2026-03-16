import React, { useEffect } from 'react';

const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // We don't manage state here, just display to keep it perfectly synced with main parent logic
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Time</span>
      <div className={`font-mono text-2xl font-bold px-3 py-1 rounded-lg ${timeRemaining <= 10 ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-slate-800 text-white'}`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
