let domUtils = require('./dom-utils');
let utils = require('./utils');

function Timer() {
    let timerInstance;
    let timerElem;
    let fillerElem;

    let ms = 1000;
    let started = false;
    let startTime = null;

    timerInstance = {
        init: () => {
            timerElem = domUtils.createElement('div');
            fillerElem = domUtils.createElement('div');
            domUtils.addClass(timerElem, 'timer');
            domUtils.addClass(fillerElem, 'filler');

            return timerInstance;
        },
        draw: container => {
            domUtils.appendChild(container, timerElem);
            domUtils.appendChild(timerElem, fillerElem);
            return timerInstance;
        },
        setTimer: msToSet => {
            ms = msToSet;
            return timerInstance;
        },
        start: () => {
            started = true;
            utils.requestAnimFrame(timerInstance.animate);
            return timerInstance;
        },
        stop: () => {
            started = false;
            return timerInstance;
        },
        animate: timestamp => {
            let progress;

            if(!started) {
                startTime = null;
                return;
            }

            if (!startTime) {
                startTime = timestamp;
            }

            progress = timestamp - startTime;

            domUtils.css(fillerElem, {'width': Math.min(Math.floor((progress / ms) * 100), 100) + '%'});

            if(progress <= ms) {
                utils.requestAnimFrame(timerInstance.animate);
            } else {
                timerInstance.stop();
            }

            return timerInstance;
        }
    };

    return timerInstance;
}

module.exports = {
    create: () => Timer().init()
};
