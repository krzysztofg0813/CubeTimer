import {handleClickStart, handleClickStop} from './handlers.js';
import {timeScreen} from './elements.js';
import {init} from './lib.js';

init();
timeScreen.addEventListener('mouseup', handleClickStart);
window.addEventListener('keyup', handleClickStart)
$('.time').mousedown(handleClickStop);
window.addEventListener('keydown', handleClickStop);