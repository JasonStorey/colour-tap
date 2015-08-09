let utils = require('./utils');
let Target = require('./target');
let Tapper = require('./tapper');

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

module.exports = {
    init: config => {
        let targetColour = utils.getRandomHex();
        let startColour = utils.getRandomHex();
        let colourDiff = 0.8;


        let target = drawTarget(config.container, targetColour);
        let tapper = drawTapper(config.container, startColour);

        function onTapped(tapper) {
            let newColour = utils.shadeBlend(colourDiff, targetColour, startColour);
            tapper.setColour(newColour);
            colourDiff -= 0.2;
        }

        tapper
            .getEmitter()
            .on('tapped', onTapped)
            .on('colour-update', colour => {
                if(colour === targetColour) {
                    console.log('win');
                    tapper
                        .getEmitter()
                        .removeListener('tapped', onTapped);
                }
            });
    }
};
