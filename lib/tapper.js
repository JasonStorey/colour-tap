let events = require('events');
let utils = require('./utils');
let domUtils = require('./dom-utils');

function Tapper() {
    let tapperInstance;
    let tapperElem;
    let emitter = new events.EventEmitter();

    let colour = utils.getRandomHex();

    tapperInstance = {
        init: () => {
            tapperElem = domUtils.createElement('div');
            domUtils.addClass(tapperElem, 'tapper');
            tapperInstance.setColour(colour);

            return tapperInstance;
        },
        addEventListeners: () => {
            domUtils.on(tapperElem, 'click touchstart', event => {
                event.stopPropagation();
                event.preventDefault();
                emitter.emit('tapped', tapperInstance);
            });

            return tapperInstance;
        },
        setColour: colourToSet => {
            colour = colourToSet;
            domUtils.css(tapperElem, {
                'background-color': colour
            });

            emitter.emit('colour-update', colour);

            return tapperInstance;
        },
        draw: container => {
            domUtils.appendChild(container, tapperElem);

            return tapperInstance;
        },
        getEmitter: () => emitter
    };

    return tapperInstance;
}

module.exports = {
    create: () => Tapper().init().addEventListeners()
};
