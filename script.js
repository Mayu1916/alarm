const activeTimersDisplay = document.getElementById('activeTimersDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const noTimersMessage = document.getElementById('noTimersMessage');

let timers = [];

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateTimersDisplay() {
  activeTimersDisplay.innerHTML = '';
  if (timers.length === 0) {
    noTimersMessage.style.display = 'block';
  } else {
    noTimersMessage.style.display = 'none';
  }

  timers.forEach(timer => {
    const { hours, minutes, seconds, totalSeconds } = timer;
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');

    if (totalSeconds > 0) {
      const timeRemaining = document.createElement('span');
      timeRemaining.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
      timerDisplay.appendChild(timeRemaining);
    } else {
      const timerUpMessage = document.createElement('div');
      timerUpMessage.classList.add('timer-up-message');
      timerUpMessage.innerText = 'Timer is up!';
      timerDisplay.appendChild(timerUpMessage);
    }

    const stopTimerBtn = document.createElement('button');
    stopTimerBtn.innerText = 'Stop Timer';
    stopTimerBtn.addEventListener('click', () => {
      clearInterval(timer.intervalId);
      timers = timers.filter(t => t !== timer);
      updateTimersDisplay();
    });
    timerDisplay.appendChild(stopTimerBtn);

    activeTimersDisplay.appendChild(timerDisplay);
  });
}

function startNewTimer(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) {
    return;
  }

  const newTimer = {
    hours,
    minutes,
    seconds,
    totalSeconds,
    intervalId: null,
  };

  timers.push(newTimer);
  updateTimersDisplay();

  newTimer.intervalId = setInterval(() => {
    newTimer.totalSeconds--;

    newTimer.hours = Math.floor(newTimer.totalSeconds / 3600);
    newTimer.minutes = Math.floor((newTimer.totalSeconds % 3600) / 60);
    newTimer.seconds = newTimer.totalSeconds % 60;

    updateTimersDisplay();

    if (newTimer.totalSeconds <= 0) {
      clearInterval(newTimer.intervalId);
      newTimer.intervalId = null;
      newTimer.totalSeconds = 0;
      updateTimersDisplay();
    }
  }, 1000);
}

startTimerBtn.addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value, 10) || 0;
  const minutes = parseInt(document.getElementById('minutes').value, 10) || 0;
  const seconds = parseInt(document.getElementById('seconds').value, 10) || 0;

  startNewTimer(hours, minutes, seconds);
});
