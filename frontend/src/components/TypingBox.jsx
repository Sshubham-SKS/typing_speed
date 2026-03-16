import React, { useRef, useEffect } from 'react';

const TypingBox = ({ text, userInput, onInputChange, isTestActive, isFinished }) => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  // Keep input focused automatically
  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFinished, text]);

  // Cinematic Scrolling (translateY)
  useEffect(() => {
    const currentChar = document.querySelector('.current-char');
    if (currentChar && wrapperRef.current) {
      const charTop = currentChar.offsetTop;
      const initialPadding = 48; // Matches p-12
      
      // We want the current character's line to be at the top.
      const shift = charTop - initialPadding;
      
      if (shift > 0) {
        wrapperRef.current.style.transform = `translateY(-${shift}px)`;
      } else {
        wrapperRef.current.style.transform = `translateY(0px)`;
      }
    }
  }, [userInput]);

  useEffect(() => {
    // Reset position on new text
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateY(0px)`;
    }
  }, [text]);

  const handleContainerClick = () => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getCharClass = (char, index, inputLength) => {
    if (index < inputLength) {
      return char === userInput[index] ? 'correct-char text-emerald-400' : 'incorrect-char text-rose-500 bg-rose-500/20';
    }
    if (index === inputLength && !isFinished) {
      return 'current-char border-l-2 border-indigo-400 animate-pulse bg-slate-700/50';
    }
    return 'untyped-char text-slate-500';
  };

  return (
    <div 
      ref={containerRef}
      className="glass-panel p-12 md:p-16 text-3xl md:text-4xl leading-relaxed font-mono cursor-text relative h-[400px] overflow-hidden transition-all"
      onClick={handleContainerClick}
    >
      
      {/* Hidden input field to capture typing */}
      <input
        type="text"
        ref={inputRef}
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        disabled={isFinished || !text}
        className="opacity-0 absolute top-0 left-0"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Render Text overlay with sliding transition */}
      {!text && <div className="text-slate-600 animate-pulse text-center w-full mt-10 text-xl font-sans">Generating paragraph...</div>}
      
      <div 
        ref={wrapperRef}
        className="select-none relative transition-transform duration-300 ease-out will-change-transform"
      >
        {text && text.split('').map((char, index) => (
          <span 
            key={index} 
            className={`transition-colors duration-100 px-[1px] ${getCharClass(char, index, userInput.length)}`}
          >
            {char}
          </span>
        ))}
      </div>

    </div>
  );
};

export default TypingBox;
