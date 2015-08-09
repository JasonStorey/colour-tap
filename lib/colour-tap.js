let Tapper = require('./tapper');

function drawTapper(container) {
    Tapper.create().draw(container);
}

module.exports = {
    init: config => {
        drawTapper(config.container);
    }
};
