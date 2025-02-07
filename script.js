
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const lapBtn = document.getElementById("lapBtn");
const lapContainer = document.getElementById("lapContainer");
stopBtn.style.display = 'none';
clearBtn.style.display = "none";
lapBtn.style.display = "none";
lapContainer.style.display = "none";

let timer;
let timeString = '00:00:00.00';  // Initial time in string format

let isRunning = false;
let startTime = 0;
let totalElapsedTime = 0;
let lastLapTime = 0;

startBtn.addEventListener('click', () => {
    startTime = Date.now() - totalElapsedTime;

    if (!isRunning) {
        isRunning = true;
        hasStarted = true;  // Flag set when Start is clicked
        startBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        clearBtn.style.display = "inline-block";
        timerDisplay.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        stopBtn.disabled = false;
        clearBtn.disabled = false;
        lapBtn.disabled = false;

        timer = setInterval(updateTime, 10);
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
        startBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
        lapBtn.style.display = "none";
        lapContainer.style.display = "none";
        clearInterval(timer);
        stopTimer(); 
    }
});
clearBtn.addEventListener('click', () => {
    isRunning = false;
    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
    clearBtn.style.display = "none";
    lapBtn.style.display = "none";
    lapContainer.style.display = "none";
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearBtn.disabled = true;
    lapBtn.disabled = true;
    totalElapsedTime = 0;
    lastLapTime = 0;
    const lapList = document.getElementById('lapList');
    if (lapList) {
        while (lapList.firstChild) {
            lapList.removeChild(lapList.firstChild);
        }
    }
    timerDisplay.textContent = formatTime(0, 0, 0, 0);
    clearInterval(timer);
});

function updateTime() {
    totalElapsedTime += 10;
    timerDisplay.textContent = formatTimeFromMilliseconds(totalElapsedTime);
}
function formatTime(h, m, s, ms) {
    if (s < 10) s = '0' + s;
    if (m < 10) m = '0' + m;
    if (h < 10) h = '0' + h;
    if (ms < 10) ms = '0' + ms;
    return h + ':' + m + ':' + s + '.' + ms;  // No spaces around colons
}
function formatTimeFromMilliseconds(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let remainingSeconds = Math.floor((milliseconds % 60000) / 1000);
    let remainingMilliseconds = milliseconds % 1000;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    remainingMilliseconds = Math.floor(remainingMilliseconds / 10);
    remainingMilliseconds = remainingMilliseconds.toString().padStart(2, '0');

    return `${hours}:${minutes}:${remainingSeconds}.${remainingMilliseconds}`;
}

lapBtn.addEventListener('click', () => {
    const currentLapTime = totalElapsedTime;
    const lapTimeInMilliseconds = currentLapTime - lastLapTime;
    const lapTimeFormatted = formatTimeFromMilliseconds(lapTimeInMilliseconds);

    totalElapsedTime = Math.floor(totalElapsedTime / 10) * 10;
    const totalTimeFormatted = formatTimeFromMilliseconds(totalElapsedTime);

    lastLapTime = currentLapTime;

    const newLapRow = document.createElement('tr');
    newLapRow.innerHTML = `
        <td>Lap ${document.getElementById('lapList').children.length + 1}</td>
        <td>${lapTimeFormatted}</td>
        <td>${totalTimeFormatted}</td>
    `;

    document.getElementById('lapList').appendChild(newLapRow);

    const lapContainer = document.getElementById('lapContainer');
    if (lapContainer.style.display === 'none') {
        lapContainer.style.display = 'block';
    }
    document.getElementById('lapContainer').scrollTop = document.getElementById('lapContainer').scrollHeight;
});

let hasStarted = false;  

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTimer();
    } else {
        if (hasStarted) {
            resumeTimer();
       }
    }
});
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
        startBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
        lapBtn.style.display = "none";
        clearInterval(timer);
    }
}
function resumeTimer() {
    if (!isRunning && hasStarted) {
        isRunning = true;
        startBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        clearBtn.style.display = "inline-block";
        timerDisplay.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        stopBtn.disabled = false;
        clearBtn.disabled = false;
        lapBtn.disabled = false;
        startTime = Date.now() - totalElapsedTime;
        timer = setInterval(updateTime, 10);
    }
}

startBtn.addEventListener('click', () => {
    startTime = Date.now() - totalElapsedTime;
    if (!isRunning) {
        isRunning = true;
        hasStarted = true; 
        startBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        clearBtn.style.display = "inline-block";
        timerDisplay.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        stopBtn.disabled = false;
        clearBtn.disabled = false;
        lapBtn.disabled = false;
        timer = setInterval(updateTime, 10);
    }
});
