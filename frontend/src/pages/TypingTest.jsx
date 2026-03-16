import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { generateText, saveResult, getLast5Results } from '../api/typingApi';
import Timer from '../components/Timer';
import TypingBox from '../components/TypingBox';
import ResultPopup from '../components/ResultPopup';


const TypingTest = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [testDuration, setTestDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Results
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Stats
  const [liveWPM, setLiveWPM] = useState(0);

  // Fetch more text for infinite typing
  const getMoreText = async () => {
    if (window._fetchingMore) return;
    window._fetchingMore = true;
    try {
      const res = await generateText();
      const newText = res.data.text.trim();
      setText(prev => prev + " " + newText); // Space ensures words don't merge
    } catch (error) {
      console.error("Error fetching more text", error);
    } finally {
      window._fetchingMore = false;
    }
  };

  // Initial fetch and Reset
  const initTest = useCallback(async () => {
    // Force stop everything
    setIsTestActive(false);
    setIsFinished(false);
    setUserInput('');
    setLiveWPM(0);
    setCurrentResult(null);
    setTimeLeft(testDuration);
    
    try {
      setText(''); // Show loading
      const res = await generateText();
      const newText = res.data.text.trim();
      setText(newText);
      
      if (user) {
        const histRes = await getLast5Results(user.id);
        setHistory(histRes.data);
      }
    } catch (error) {
      console.error("Error fetching text", error);
      setText("Could not load text. Please check your connection.");
    }
  }, [user, testDuration]);

  useEffect(() => {
    initTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Only on user change, duration change is handled inside changeDuration or if we want it auto-reset

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft]);

  // Handle typing inputs
  const handleInputChange = (value) => {
    if (timeLeft <= 0 || isFinished || !text) return;

    if (!isTestActive && value.length > 0) {
      setIsTestActive(true);
    }

    // Process input
    if (value.length <= text.length) {
      setUserInput(value);
      
      // Calculate WPM based on standard 5 chars per word
      const secondsElapsed = testDuration - timeLeft;
      if (secondsElapsed > 0) {
        const words = value.length / 5;
        const minutes = secondsElapsed / 60;
        setLiveWPM(Math.round(words / minutes));
      }

      // INFINITE TEXT LOGIC: Fetch more when ~2-3 lines left (150 chars)
      // This ensures 2 lines of buffer as requested
      if (text.length - value.length < 150) {
        getMoreText();
      }
    }
  };

  const finishTest = async () => {
    setIsTestActive(false);
    setIsFinished(true);
    
    // Use latest state values for final calculation
    // Note: Since this is called from an interval or input handler, 
    // we should rely on the state captured at that moment or use functional updates.
    // However, since we stop inputs, the current states are final.
    
    const timeTaken = testDuration; // It's a timed test
    
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
       if (userInput[i] === text[i]) correctChars++;
    }
    const accuracy = userInput.length === 0 ? 0 : (correctChars / userInput.length) * 100;
    const finalSpeed = Math.round((userInput.length / 5) / (testDuration / 60));
    
    const resultData = {
      words_typed: Math.round(userInput.length / 5),
      time_taken: testDuration,
      speed: finalSpeed,
      accuracy: accuracy
    };

    setCurrentResult(resultData);

    try {
      await saveResult(resultData);
    } catch (err) {
      console.error("Failed to save result", err);
    }
  };

  const handleNext = () => {
    initTest();
  };

  const changeDuration = (val) => {
    if (isTestActive) return;
    const num = parseInt(val);
    if (!isNaN(num) && num > 0) {
      setTestDuration(num);
      setTimeLeft(num);
      setUserInput('');
      setLiveWPM(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative">
      
      {/* Settings Row */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
          <span className="text-slate-400 text-xs font-bold uppercase ml-2">Time</span>
          {[15, 30, 60].map(d => (
            <button
              key={d}
              onClick={() => changeDuration(d)}
              disabled={isTestActive}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${testDuration === d ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {d}s
            </button>
          ))}
          <div className="flex items-center gap-1 bg-slate-700 rounded-lg px-2">
            <input 
              type="number" 
              placeholder="Custom"
              disabled={isTestActive}
              onChange={(e) => changeDuration(e.target.value)}
              className="w-12 bg-transparent text-sm font-bold text-white outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-slate-500 text-xs font-bold ring-0">s</span>
          </div>
        </div>

        <button 
          onClick={initTest}
          disabled={isTestActive}
          className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-slate-700/50 transition-all font-medium text-sm group"
        >
          <svg className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ${!text ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh Text
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-700/50">
        <div className="scale-110 origin-left">
          <Timer timeRemaining={timeLeft} />
        </div>
        
        <div className="flex items-center gap-12">
            <div className="text-center">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Words</p>
                <p className="text-3xl font-bold font-mono text-white">{userInput.trim().length > 0 ? userInput.trim().split(/\s+/).length : 0}</p>
            </div>
            
            <div className="h-12 w-px bg-slate-700"></div>
            
            <div className="text-center">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Live Speed</p>
                <div className="flex items-baseline gap-2 justify-center">
                    <p className="text-4xl font-bold font-mono text-indigo-400">{liveWPM}</p>
                    <span className="text-slate-600 text-lg font-medium">WPM</span>
                </div>
            </div>
        </div>
      </div>

      <TypingBox 
        text={text} 
        userInput={userInput} 
        onInputChange={handleInputChange} 
        isTestActive={isTestActive}
        isFinished={isFinished}
      />

      {!isTestActive && !isFinished && text && (
        <div className="text-center mt-8 text-slate-500 font-medium animate-pulse">
          Start typing to begin the {testDuration}s test...
        </div>
      )}

      {isFinished && currentResult && (
        <ResultPopup 
          result={currentResult} 
          previousResults={history} 
          onNext={handleNext} 
        />
      )}

    </div>
  );
};

export default TypingTest;
