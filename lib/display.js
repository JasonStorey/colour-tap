let domUtils = require('./dom-utils');

let displayElem;
let score = 0;
let displayContent = 'Score : #' + (score + 1);

let displayInstance = {
    init: () => {
        displayElem = domUtils.createElement('div');
        domUtils.addClass(displayElem, 'display');
        domUtils.html(displayElem, displayContent);
        return displayInstance;
    },
    draw: container => {
        domUtils.appendChild(container, displayElem);
        return displayInstance;
    },
    setScore: newScore => {
        score = newScore;
        displayContent = 'Score : #' + (score + 1);
        return displayInstance;
    },
    win: () => {
        displayContent = 'Score : #' + (score + 1) + ' - Nize.';
        return displayInstance
    },
    lose: () => {
        displayContent = 'Score : #' + (score + 1) + ' - You screwed up, buddy.';
        return displayInstance;
    },
    update: () => {
        domUtils.html(displayElem, displayContent);
        return displayInstance;
    }
};

module.exports = displayInstance;
