let utils = require('./utils');
let Target = require('./target');
let Tapper = require('./tapper');
let Timer = require('./timer');

let timer;
let target;
let tapper;

let targetColour;
let startColour;
let colourDiff;

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
    let newColour = utils.shadeBlend(colourDiff, targetColour, startColour);
    tapper.setColour(newColour);
    colourDiff -= 0.2;
}

function onTimerComplete(timer) {
    if(tapper.getColour() === targetColour) {
        win();
    } else {
        lose();
    }
}

function onColourUpdate(colour) {
    if(colourDiff < 0) {
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
        colourDiff = 0.8;

        timer = drawTimer(config.container);
        target = drawTarget(config.container, targetColour);
        tapper = drawTapper(config.container, startColour);

        timer
            .getEmitter()
            .on('complete', onTimerComplete);

        tapper
            .getEmitter()
            .on('tapped', onTapped)
            .on('colour-update', onColourUpdate);
    }
};
