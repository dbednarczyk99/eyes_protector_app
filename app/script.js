import React from 'react';
import { render } from 'react-dom';
import { useState, useMemo } from 'react';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(1200);
  const [timer, setTimer] = useState(null);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const mm = minutes < 10 ? `0${minutes}` : minutes;
    const ss = seconds < 10 ? `0${seconds}` : seconds;

    return `${mm}:${ss}`;
  }

  const formattedTime = React.useMemo(() => formatTime(time), [time]);

  const startTimer = e => {
    e.preventDefault();
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(prevTime => {
        if(prevTime > 0){
          return prevTime - 1;
        } else {
          setStatus(prevStatus => {
            if(prevStatus === 'work') {
              setTime(20);
              playBell();
              return 'rest';
            } else if(prevStatus === 'rest') {
              setTime(1200);
              playBell();
              return 'work'
            }
          });
          return prevTime;
        }
      })
    }, 1000));
  }

  const stopTimer = e => {
    e.preventDefault();
    setStatus('off');
    clearInterval(timer);
    setTimer(null);
    setTime(1200);
  }

  const closeApp = e => {
    e.preventDefault();
    window.close();
  }

  const playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }
  
  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && <img src="./images/work.png" /> }
      { status === 'rest' && <img src="./images/rest.png" /> }
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      { status === 'off' && <button className="btn" onClick={startTimer}>Start</button> }
      { status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button> }
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
