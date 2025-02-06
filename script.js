
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
let seconds = 0;
let minutes = 0;
let hours = 0;
let milliseconds = 0; 

let isRunning = false;
let startTime = 0;
let totalElapsedTime = 0;  
let lastLapTime = 0;  
startBtn.addEventListener('click', () => {
    startTime = Date.now() - (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = "none"; 
        stopBtn.style.display = "inline-block"; 
        clearBtn.style.display = "inline-block"; 
        timerDisplay.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        stopBtn.disabled = false;
        clearBtn.disabled = false;
        timerDisplay.disabled = false;
        lapBtn.disabled = false;


        timer = setInterval(updateTime, 10);  
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        startBtn.disabled = false;
         
        stopBtn.disabled = true;
        lapBtn.disabled = true
        startBtn.style.display = "inline-block"; 
        stopBtn.style.display = "none";  
        lapBtn.style.display = "inline-block";   
        clearInterval(timer);

    }
});


    clearBtn.addEventListener('click', () => {
    isRunning = false;
    startBtn.style.display = "inline-block";  
    stopBtn.style.display = "none";           
    clearBtn.style.display = "none";          
    lapBtn.style.display = "none";            
    lapContainer.style.display = "none";
    //disable
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearBtn.disabled = true;
    lapBtn.disabled = true;
    seconds = 0;
    minutes = 0;
    hours = 0;
    milliseconds = 0;  
     totalElapsedTime = 0; 
    lastLapTime = 0; 
      // Clear lap history
      const lapList = document.getElementById('lapList');
      if (lapList) {
          while (lapList.firstChild) {
          lapList.removeChild(lapList.firstChild);  // Remove each lap entry instead of clearing all at once
          }
      }
    timerDisplay.textContent = formatTime(hours, minutes, seconds, milliseconds);
    clearInterval(timer);
});

function updateTime() {
    milliseconds++;  
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;  
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;  
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;  
    }

    timerDisplay.textContent = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(h, m, s, ms) {
    if (s < 10) s = '0' + s;
    if (m < 10) m = '0' + m;
    if (h < 10) h = '0' + h;
    if (ms < 10) ms = '0' + ms;  
    return h + ':' + m + ':' + s + '.' + ms;  
}

function formatTimeFromSeconds(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

    return `${hours}:${minutes}:${remainingSeconds}`;
}

lapBtn.addEventListener('click', () => {
    
    const currentLapTime = Math.floor((Date.now() - startTime) / 10);  
    
    
    const lapTimeInMilliseconds = currentLapTime - lastLapTime;
    const lapTimeFormatted = formatTimeFromMilliseconds(lapTimeInMilliseconds); 

    totalElapsedTime += lapTimeInMilliseconds;

    
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


    function formatTimeFromMilliseconds(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let remainingSeconds = Math.floor((milliseconds % 60000) / 1000);
    let remainingMilliseconds = milliseconds % 1000;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;
    if (remainingMilliseconds < 10) remainingMilliseconds = '00' + remainingMilliseconds;  
    else if (remainingMilliseconds < 100) remainingMilliseconds = '0' + remainingMilliseconds;

    return `${hours}:${minutes}:${remainingSeconds}.${remainingMilliseconds}`;
}


