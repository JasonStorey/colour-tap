let utils = require('./utils');
let levels = require('./levels');
let Target = require('./target');
let Tapper = require('./tapper');
let Timer = require('./timer');

let timer;
let target;
let tapper;

let targetColour;
let startColour;
let startColourDiff;

let startTapsUntilTarget;
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
    alert('congrats, buddy');
    reset();
}

function lose() {
    alert('You failed, buddy');
    reset();
}

function onTapped(tapper) {
    let newColour = utils.shadeBlend((tapsUntilTarget / startTapsUntilTarget) * startColourDiff, targetColour, startColour);
    tapper.setColour(newColour);
    tapsUntilTarget--;
}

function onTimerComplete(timer) {
    if(tapper.getColour() === targetColour) {
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
    targetColour = levelConfig.targetColour;
    startColour = levelConfig.startColour;
    startTapsUntilTarget = levelConfig.tapsUtilsTarget;
    tapsUntilTarget = startTapsUntilTarget - 1;
    startColourDiff = startTapsUntilTarget * 0.12;

    target.setColour(targetColour);
    tapper.setColour(utils.shadeBlend(startColourDiff, targetColour, startColour));

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

        startLevel(levels.getLevel(0));
    }
};
