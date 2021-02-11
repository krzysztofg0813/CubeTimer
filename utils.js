import { timeList } from "elements.js";

export function getTimeString(time){
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000 - (minutes * 60));
    const miliseconds = Math.floor(time % 1000 / 10);

    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}:${miliseconds > 9 ? miliseconds : `0${miliseconds}`}`;
}

export function generateScramble(length) {
    const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    let lastMove = "";
    let scramble = "";

    for(let _=0; _<length; _++){
        const move = moves[Math.floor(Math.random() * moves.length)];
        if(move === lastMove) {
            _--;
            continue;
        }
        lastMove = move;
        move += Math.floor(Math.random() * 2) === 1 ? `2 ` : Math.floor(Math.random() * 2) === 1 ? `' ` : ' ';

        scramble += move
    }

    return scramble;
}

export function getAllTime(timeList) {
    // const times = Array.from(timeList.querySelectorAll('li')).map( el => parseInt(el.dataset.time));
    const times = Object.values(timeList).map(ob => ob.time).reverse();
    console.log(times);

    return times;
}

export function getMaxMin(times) {
    let min = Math.min(...times);
    let max = Math.max(...times);

    return [min, max];
}

export function reCount(){
    const timesEl = Array.from(timeList.querySelectorAll('li span.count')).reverse();

    for(let i = 0; i< timesEl.length; i++){
        timesEl[i].textContent = `${i + 1}`;
    }
}