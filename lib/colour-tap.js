let utils = require('./utils');
let Target = require('./target');
let Tapper = require('./tapper');
let Timer = require('./timer');

let timer;
let target;
let tapper;

let targetColour;
let startColour;
let startColourDiff;

let startStepsUntilTarget;
let stepsUntilTarget;

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
    let newColour = utils.shadeBlend((stepsUntilTarget / startStepsUntilTarget) * startColourDiff, targetColour, startColour);
    tapper.setColour(newColour);
    stepsUntilTarget--;
}

function onTimerComplete(timer) {
    if(tapper.getColour() === targetColour) {
        win();
    } else {
        lose();
    }
}

function onColourUpdate(colour) {
    if(stepsUntilTarget < 0) {
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

function startRound() {
    targetColour = utils.getRandomHex();
    startColour = utils.getRandomHex();
    startStepsUntilTarget = utils.randomFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
    stepsUntilTarget = startStepsUntilTarget - 1;
    startColourDiff = startStepsUntilTarget * 0.12;

    target.setColour(targetColour);
    tapper.setColour(utils.shadeBlend(startColourDiff, targetColour, startColour));

    timer
        .setTimer(5000)
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

        startRound();
    }
};
