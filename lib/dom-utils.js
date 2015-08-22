let $ = require('jquery');

module.exports = {
    createElement: nameOfElement => document.createElement(nameOfElement),
    appendChild: (parent, child) => parent.appendChild(child),
    css: (element, css) => $(element).css(css),
    addClass: (element, classnames) => $(element).addClass(classnames),
    on: (element, eventname, listener) => $(element).on(eventname, listener),
    html: (element, htmlString) => $(element).html(htmlString)
};
