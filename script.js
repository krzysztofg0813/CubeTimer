import {handleClickStart, handleClickStop} from './handlers';
import {timeScreen} from './elements';
import {init} from './lib';

init();
timeScreen.addEventListener('mouseup', handleClickStart);
window.addEventListener('keyup', handleClickStart)
$('.time').mousedown(handleClickStop);
window.addEventListener('keydown', handleClickStop);