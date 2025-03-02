let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function updateTimeDisplay() {
    const ms = elapsedTime % 1000;
    const s = Math.floor((elapsedTime / 1000) % 60);
    const m = Math.floor((elapsedTime / 60000) % 60);

    const formattedTime = 
        `${String(m).padStart(2, '0')}:` +
        `${String(s).padStart(2, '0')}:` +
        `${String(Math.floor(ms / 10)).padStart(2, '0')}`;

    display.textContent = formattedTime;
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
    } else {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimeDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateTimeDisplay();
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (!isRunning) return;
    const lapItem = document.createElement('li');
    lapItem.textContent = display.textContent;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
