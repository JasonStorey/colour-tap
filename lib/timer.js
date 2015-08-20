let domUtils = require('./dom-utils');

function Timer() {
    let timerInstance;
    let timerElem;

    let ms = 1000;

    timerInstance = {
        init: () => {
            timerElem = domUtils.createElement('div');
            domUtils.addClass(timerElem, 'timer');

            return timerInstance;
        },
        draw: container => {
            domUtils.appendChild(container, timerElem);
            return timerInstance;
        },
        setTimer: msToSet => {
            ms = msToSet;
            return timerInstance;
        },
        start: () => {
            return timerInstance;
        }


    };

    return timerInstance;
}

module.exports = {
    create: () => Timer().init()
};
