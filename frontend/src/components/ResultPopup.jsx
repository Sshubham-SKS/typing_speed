import React from 'react';

const ResultPopup = ({ result, previousResults, onNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm shadow-2xl"></div>

      {/* Modal */}
      <div className="glass-panel w-full max-w-2xl relative z-10 overflow-hidden transform transition-all shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500"></div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Test Complete! 🏁</h2>
            <p className="text-slate-400">Here's how you did on this run.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Speed</p>
              <p className="text-3xl font-bold text-indigo-400">{result.speed} <span className="text-sm font-medium text-slate-500">WPM</span></p>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Accuracy</p>
              <p className="text-3xl font-bold text-emerald-400">{Math.round(result.accuracy)}<span className="text-sm font-medium text-emerald-500/50">%</span></p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Words</p>
              <p className="text-3xl font-bold text-slate-200">{result.words_typed}</p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Time</p>
              <p className="text-3xl font-bold text-slate-200">{result.time_taken}<span className="text-sm font-medium text-slate-500">s</span></p>
            </div>
          </div>

          <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Recent History Comparison</h3>
            <div className="flex gap-2">
              {previousResults.length === 0 ? (
                <p className="text-slate-500 italic text-sm">This is your first test! Keep going to see your history.</p>
              ) : (
                previousResults.slice(0, 4).map((res, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-lg p-2 text-center text-sm border-t-2 border-slate-700">
                    <p className="text-slate-500 mb-1 text-xs">Test {i+1}</p>
                    <p className="text-white font-medium">{res.speed}</p>
                  </div>
                ))
              )}
              {/* Current */}
              <div className="flex-1 bg-indigo-500/20 rounded-lg p-2 text-center text-sm border-t-2 border-indigo-500 ring-1 ring-indigo-500/30">
                <p className="text-indigo-300 mb-1 text-xs font-medium">Now</p>
                <p className="text-white font-bold">{result.speed}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2 group text-lg"
          >
            Next Test
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
