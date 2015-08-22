let levels = require('./levels');
let Target = require('./target');
let Tapper = require('./tapper');
let Timer = require('./timer');

let timer;
let target;
let tapper;

let currentLevel = 0;

let colourRangeArray;
let tapsUntilTarget;

function drawTarget(container) {
    return Target
        .create()
        .draw(container);
}

function drawTapper(container) {
    return Tapper
        .create()
        .draw(container);
}

function drawTimer(container) {
    return Timer
        .create()
        .draw(container);
}

function win() {
    console.log('Round ' + currentLevel + ' completed, buddy');
    currentLevel++;
    reset();
    startLevel(levels.getLevel(currentLevel));
}

function lose() {
    alert('You scored #' + currentLevel + ', buddy');
    reset();
}

function onTapped(tapper) {
    let newColour = colourRangeArray[colourRangeArray.length - tapsUntilTarget] || '#000000';
    tapsUntilTarget--;
    tapper.setColour(newColour);
}

function onTimerComplete(timer) {
    if(tapsUntilTarget === 0) {
        win();
    } else {
        lose();
    }
}

function onColourUpdate(colour) {
    if(tapsUntilTarget < 0) {
        lose();
    }
}

function reset() {
    timer
        .reset()
        .getEmitter()
        .removeListener('complete', onTimerComplete);

    tapper
        .getEmitter()
        .removeListener('tapped', onTapped)
        .removeListener('colour-update', onColourUpdate);
}

function startLevel(levelConfig) {
    colourRangeArray = levelConfig.colourRangeArray;
    tapsUntilTarget = levelConfig.colourRangeArray.length - 1;

    target.setColour(colourRangeArray[colourRangeArray.length - 1]);
    tapper.setColour(colourRangeArray[0]);

    timer
        .setTimer(levelConfig.timer)
        .getEmitter()
        .on('complete', onTimerComplete);

    tapper
        .getEmitter()
        .on('tapped', onTapped)
        .on('colour-update', onColourUpdate);

    timer.start();
}

module.exports = {
    init: config => {
        timer = drawTimer(config.container);
        target = drawTarget(config.container);
        tapper = drawTapper(config.container);

        startLevel(levels.getLevel(currentLevel));
    }
};
