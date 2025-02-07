
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const lapBtn = document.getElementById("lapBtn");
const lapContainer = document.getElementById("lapContainer");

stopBtn.classList.add("hidden");
clearBtn.classList.add("hidden");
lapBtn.classList.add("hidden");
lapContainer.classList.add("hidden");

let isRunning = false;
let totalElapsedTime = 0;
let lastLapTime = 0;
let lastTimestamp = 0;
let animationFrameId = null;

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        
        startBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        stopBtn.textContent = "Stop";  
        clearBtn.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        stopBtn.disabled = false;
        clearBtn.disabled = false;
        lapBtn.disabled = false;

        lastTimestamp = performance.now();
        requestAnimationFrame(updateTime);  
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        
        isRunning = false;
        stopBtn.textContent = "Resume";  
        lapBtn.style.cursor = "pointer";
        cancelAnimationFrame(animationFrameId);  
        lapBtn.disabled = true;  
    } else {
        
        isRunning = true;
        stopBtn.textContent = "Stop";  
        lapBtn.style.cursor = "pointer";
        lastTimestamp = performance.now();  
        requestAnimationFrame(updateTime);  
        lapBtn.disabled = false;  
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
    lastTimestamp = 0;  // Reset the timestamp
    const lapList = document.getElementById('lapList');
    if (lapList) {
        while (lapList.firstChild) {
            lapList.removeChild(lapList.firstChild);
        }
    }
    timerDisplay.textContent = formatTimeFromMilliseconds(0);
    cancelAnimationFrame(animationFrameId);  // Stop the animation
});
function updateTime(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    const deltaTime = timestamp - lastTimestamp;
    totalElapsedTime += deltaTime;
    lastTimestamp = timestamp;

    timerDisplay.textContent = formatTimeFromMilliseconds(totalElapsedTime);

    if (isRunning) {
        animationFrameId = requestAnimationFrame(updateTime);  // Keep the timer running
    }
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

    return `${hours}:${minutes}:${remainingSeconds}:${remainingMilliseconds}`;
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

    lapContainer.style.display = 'block';
    document.getElementById('lapContainer').scrollTop = document.getElementById('lapContainer').scrollHeight;
});
