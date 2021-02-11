import {startSolve, stopSolve, displayStats} from './lib.js';
import {mainDisplay} from './elements.js';
import {reCount} from './utils.js';
import {timesData} from './data.js';

let isStart = false;
let isPossiblyNextSolve = true;
const timeOffset = 400;
let timeOffsetHandler = false;
let isTimeOffset = false;

function prepareToSolve() {
    isTimeOffset = true;
    mainDisplay.style.backgroundColor='var(--readyColor)';
}

export function handleClickStart(e) {
    e.preventDefault();
    if(e.code =='Space' || e.type == 'mouseup') {
        if(!isStart && isTimeOffset && isPossiblyNextSolve){
            isStart = true;
            startSolve();
        }
        if(!isTimeOffset){
            clearTimeout(timeOffsetHandler);
            mainDisplay.style.backgroundColor='var(--defaultColor)';
            isTimeOffset = false
        }
        isPossiblyNextSolve = true;
    }
}

export function handleClickStop(e) {
    e.preventDefault();
    if(isStart && (e.code =='Space' || e.type == 'mousedown')){ 
        stopSolve();

        isStart = false;
        isPossiblyNextSolve = false;
        isTimeOffset = false;
    }
    else if(!isTimeOffset && isPossiblyNextSolve && (e.code =='Space' || e.type == 'mousedown')){
        mainDisplay.style.backgroundColor='var(--waitColor)';
        timeOffsetHandler = setTimeout(prepareToSolve, timeOffset);
    }
}

export function handleDeleteTime(e) {
    const el = e.currentTarget.closest('li');
    delete timesData[el.dataset.id];
    el.remove();
    reCount();
    displayStats();
}