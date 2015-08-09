let utils = require('./utils');
let Target = require('./target');
let Tapper = require('./tapper');

function drawTarget(container, colour) {
    Target
        .create()
        .setColour(colour)
        .draw(container);
}

function drawTapper(container, colour) {
    Tapper
        .create()
        .setColour(colour)
        .draw(container);
}

module.exports = {
    init: config => {
        let targetColour = utils.getRandomHex();

        drawTarget(config.container, targetColour);
        drawTapper(config.container, targetColour);
    }
};
