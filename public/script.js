const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetButton = document.getElementById('reset-timer');
const lapButton = document.getElementById('lap');
const clearButton = document.getElementById('clear-lap-button');
const laps = document.getElementsByClassName('laps')[0];

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector('.timer-display');
let int = null;
let lapCount = 1;

startButton.addEventListener('click', () => {
    if(int !== null) {
        clearInterval(int);
    }

    int = setInterval(displayTimer, 10);

    document.querySelector('#lap').style.display = 'block';
});

pauseButton.addEventListener('click', () => {
    clearInterval(int);
});

resetButton.addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = '00 : 00 : 00 : 000';

    while (laps.firstChild) {
        laps.removeChild(laps.firstChild);
    }

    document.querySelector('.laps').style.height = 'auto';
    document.querySelector('#lap').style.display = 'none';

    clearButton.style.display = 'none';

    lapCount = 1;
});

lapButton.addEventListener('click', () => {
    document.querySelector('.laps').style.height = '155px';

    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp = document.createElement('span');

    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'number');
    timeStamp.setAttribute('class', 'time-stamp');

    let h = hours < 10 ? '0' + hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    
    number.textContent = lapCount + '. ';
    timeStamp.innerHTML = `${h} : ${m} : ${s} : ${ms}`;

    li.append(number, timeStamp);
    laps.append(li);

    lapCount++;

    clearButton.style.display = 'block';
});

clearButton.addEventListener('click', () => {
    while (laps.firstChild) {
        laps.removeChild(laps.firstChild);
    }

    document.querySelector('.laps').style.height = 'auto';

    clearButton.style.display = 'none';

    lapCount = 1;
});

const displayTimer = () => {
    milliseconds += 10;
    if(milliseconds === 1000) {
        milliseconds = 0;
        seconds++;

        if(seconds === 60) {
            seconds = 0;
            minutes++;

            if(minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? '0' + hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}