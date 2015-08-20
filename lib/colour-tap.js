let utils = require('./utils');
let Target = require('./target');
let Tapper = require('./tapper');
let Timer = require('./timer');

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
}

function lose() {
    alert('You failed, buddy');
}

module.exports = {
    init: config => {
        let targetColour = utils.getRandomHex();
        let startColour = utils.getRandomHex();
        let colourDiff = 0.8;

        let timer = drawTimer(config.container);
        let target = drawTarget(config.container, targetColour);
        let tapper = drawTapper(config.container, startColour);

        function onTapped(tapper) {
            let newColour = utils.shadeBlend(colourDiff, targetColour, startColour);
            tapper.setColour(newColour);
            colourDiff -= 0.2;
        }

        function onTimerComplete(timer) {
            lose();
            timer
                .getEmitter()
                .removeListener('complete', onTimerComplete);
        }

        timer
            .getEmitter()
            .on('complete', onTimerComplete);

        tapper
            .getEmitter()
            .on('tapped', onTapped)
            .on('colour-update', colour => {
                if(colour === targetColour) {
                    win();
                    tapper
                        .getEmitter()
                        .removeListener('tapped', onTapped);
                }
            });
    }
};
