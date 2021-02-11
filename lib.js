import {timeScreen, timeList, averageS, average5, average10, bestTimeS, worstTimeS, scrambleScreen, graph, mainDisplay} from './elements';
import {getTimeString, generateScramble, getAllTime, getMaxMin} from './utils';
import {handleDeleteTime} from './handlers';
import { timesData, currentId, incrementId } from './data';

let currentTime = 0;
let currentScramble;
let intervalId;

function displayTime(time) {
    timeScreen.textContent = getTimeString(currentTime);
}

function updateTime() {
    currentTime += 10
    displayTime(currentTime);
}

export function displayStats() {
    const times = getAllTime(timesData);
    console.log(times );
    const avg = times.reduce((a,b) => a + b, 0) / times.length;
    const avg5 = times.slice(0,5).reduce((a,b) => a + b, 0) / 5;
    const avg10 = times.slice(0,10).reduce((a,b) => a + b, 0) / 10;

    averageS.textContent = times.length > 0 ? getTimeString(avg) : '00:00:00';
    average5.textContent = times.length >= 5 ? getTimeString(avg5) : '-';
    average10.textContent = times.length >= 10 ? getTimeString(avg10) : '-';

    drawGraph(times);
    setBestWorst(times);
}

function drawGraph(times) {
    const allTimes = times.reverse();
    const [min, max] = getMaxMin(allTimes);
    const height = graph.height;
    const width = graph.width;

    const yOffset = height / (max - min);
    const xOffset = width / (allTimes.length - 1);
    console.log(`max: ${max}  min: ${min}  yOffset: ${xOffset}`);
    const ctx = graph.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,(max - allTimes[0]) * yOffset);
    ctx.clearRect(0,0, width, height);
    let x = 0
    allTimes.forEach(time => {
        ctx.lineTo(x, (max - time) * yOffset);
        x += xOffset ;
    });

    ctx.stroke();
}

function setBestWorst(times) {
    if(times.length > 0){
        const [best, worst] = getMaxMin(times);
        bestTimeS.textContent = getTimeString(best);
        worstTimeS.textContent = getTimeString(worst);

        const bestEl = timeList.querySelector('.bestTime');
        bestEl && bestEl.classList.remove('bestTime');
        timeList.querySelector(`[data-time="${best}"]`).classList.add('bestTime');

        const worstEl = timeList.querySelector('.worstTime');
        worstEl && worstEl.classList.remove('worstTime');
        timeList.querySelector(`[data-time="${worst}"]`).classList.add('worstTime');

        bestTimeS.textContent = getTimeString(best);
        worstTimeS.textContent = getTimeString(worst);
    }else{
        bestTimeS.textContent = '-';
        worstTimeS.textContent = '-';
    }
}

function addTime(time) {
    const lastTimeCount = timeList.querySelector('li span.count');
    const timeCount  = `<span class="count">${lastTimeCount ? parseInt(lastTimeCount.textContent) + 1 : '1'}</span>`;
    const timeButtons = `<span class="buttons clearfix"><button class="deleteTime">X</button><button>+2</button><button>DNF</button></span>`;
    const timeHtml = `<li data-time="${currentTime}" data-id="${currentId}">${timeCount}${getTimeString(time)}${timeButtons}</li>`;
    timeList.insertAdjacentHTML('afterbegin', timeHtml);
    const timeEl = timeList.querySelector('.deleteTime');
    timeEl.addEventListener('click', handleDeleteTime);

    timesData[`${currentId}`] = {
        'time': currentTime,
        'scramble': currentScramble, 
    };
    incrementId();

    console.table(timesData);
}

export function startSolve() {
    currentTime = 0;
    intervalId = setInterval(updateTime, 10);

    mainDisplay.style.backgroundColor = 'var(--startColor)';
}

export function stopSolve() {
    clearInterval(intervalId);
    addTime(currentTime);
    displayStats();

    currentScramble = generateScramble(15);
    scrambleScreen.textContent = currentScramble;
    mainDisplay.style.backgroundColor = 'var(--defaultColor)';
}

export function init() {
    currentScramble = generateScramble(15);
    scrambleScreen.textContent = currentScramble;
}