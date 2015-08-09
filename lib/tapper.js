let domUtils = require('./dom-utils');

function Tapper() {
    let tapperInstance;
    let tapperElem;

    tapperInstance = {
        init: () => {
            tapperElem = domUtils.createElement('div');
            domUtils.addClass(tapperElem, 'tapper');

            return tapperInstance;
        },
        addEventListeners: () => {
            domUtils.on(tapperElem, 'click', event => console.log('click'));

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
