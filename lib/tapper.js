let utils = require('./utils');
let domUtils = require('./dom-utils');

function Tapper() {
    let tapperInstance;
    let tapperElem;

    let colour = utils.getRandomHex();
    let shadeChange = Math.random() > 0.5 ? 0.2 : -0.2;

    tapperInstance = {
        init: () => {
            tapperElem = domUtils.createElement('div');
            domUtils.addClass(tapperElem, 'tapper');
            tapperInstance.setColour(colour);

            return tapperInstance;
        },
        addEventListeners: () => {
            domUtils.on(tapperElem, 'click', event => {
                let newColour = utils.shadeBlend(shadeChange, colour);
                tapperInstance.setColour(newColour);
            });

            return tapperInstance;
        },
        setColour: colourToSet => {
            colour = colourToSet;
            domUtils.css(tapperElem, {
                'background-color': colour
            });

            return tapperInstance;
        },
        draw: container => {
            domUtils.appendChild(container, tapperElem);

            return tapperInstance;
        }
    };

    return tapperInstance;
}

module.exports = {
    create: () => Tapper().init().addEventListeners()
};
