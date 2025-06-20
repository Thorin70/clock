
import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get time zone once on mount
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);

    return () => clearInterval(timerId);
  }, []);

  const formattedDigitalTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black antialiased text-gray-200 p-4">
      <Clock currentTime={currentTime} />
      <div className="mt-10 text-center">
        <div className="text-5xl font-extralight text-gray-100 tracking-wider mb-3 tabular-nums" aria-label="Current digital time">
          {formattedDigitalTime}
        </div>
        <div className="text-xl font-medium text-gray-400 mb-1.5" aria-label="Current date">
          {formattedDate}
        </div>
        <div className="text-sm text-gray-500" aria-label="Current time zone">
          {timeZone}
        </div>
      </div>
    </div>
  );
}

export default App;
