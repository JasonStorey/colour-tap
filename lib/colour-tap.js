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

function drawTarget(container, colour) {
    return Target
        .create()
        .setColour(colour)
        .draw(container);
}

function drawTapper(container, colour) {
    return Tapper
        .create()
        .setColour(colour)
        .draw(container);
}

function drawTimer(container) {
    return Timer
        .create()
        .setTimer(5000)
        .draw(container)
        .start();
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

module.exports = {
    init: config => {
        targetColour = utils.getRandomHex();
        startColour = utils.getRandomHex();
        startStepsUntilTarget = utils.randomFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
        stepsUntilTarget = startStepsUntilTarget - 1;
        startColourDiff = startStepsUntilTarget * 0.12;

        timer = drawTimer(config.container);
        target = drawTarget(config.container, targetColour);
        tapper = drawTapper(config.container, utils.shadeBlend(startColourDiff, targetColour, startColour));

        timer
            .getEmitter()
            .on('complete', onTimerComplete);

        tapper
            .getEmitter()
            .on('tapped', onTapped)
            .on('colour-update', onColourUpdate);
    }
};
