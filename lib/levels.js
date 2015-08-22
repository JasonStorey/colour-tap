let utils = require('./utils');

let DIFFICULTIES = [
    {
        timer: 5000,
        possibleTapsUntilTarget: [1, 2, 3, 4, 5, 6, 8]
    }
];

module.exports = {
    getLevel: levelIndex => {
        return {
            timer: DIFFICULTIES[0].timer,
            tapsUtilsTarget: utils.randomFromArray(DIFFICULTIES[0].possibleTapsUntilTarget),
            targetColour: utils.getRandomHex(),
            startColour: utils.getRandomHex()
        };
    }
};
