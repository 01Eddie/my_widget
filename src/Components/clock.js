import React, { memo, useEffect, useState } from 'react';

const Clock = () => {
  const [ time, setTime ] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setTime(now);
      }, 1000);
    
    return () => clearInterval(timer);
  }, []);

      const hours = (time.getHours() < 10) ? `0${time.getHours()}` : time.getHours();
      const minutes = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
      const seconds = (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds();

      const timeComplete = time.toDateString();

  return (
    <div>
      <h1>Clock</h1>
      <div className='clock'>
        <p><span>
              Time:
            </span>
            <span>
              {hours}:{minutes}:{seconds} PDT
            </span>
        </p>
        <p>Date: {timeComplete}</p>
      </div>
    </div>
  );
};

export default memo(Clock);
