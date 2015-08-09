let utils = require('./utils');
let domUtils = require('./dom-utils');

function Target() {
    let targetInstance;
    let targetElement;

    let colour = utils.getRandomHex();

    targetInstance = {
        init: () => {
            targetElement = domUtils.createElement('div');
            domUtils.addClass(targetElement, 'target');
            targetInstance.setColour(colour);

            return targetInstance;
        },
        setColour: colourToSet => {
            colour = colourToSet;
            domUtils.css(targetElement, {'background-color': colour});

            return targetInstance;
        },
        draw: container => {
            domUtils.appendChild(container, targetElement);

            return targetInstance;
        }
    };

    return targetInstance;
}

module.exports = {
    create: () => Target().init()
};
