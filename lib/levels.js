let utils = require('./utils');

let DIFFICULTIES = [
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
];

function getColourRangeArray(startColour, targetColour, totalSteps) {
    let colourRangeArray = totalSteps > 0 ? [startColour] : [targetColour];

    for(let step = totalSteps; step > 0; step--) {
        colourRangeArray.push(utils.shadeBlend((step - 1) / totalSteps, targetColour, startColour));
    }

    return colourRangeArray;
}

module.exports = {
    getLevel: (startColour, levelIndex) => {
        let stepsInColourRange = utils.randomFromArray(DIFFICULTIES[0].possibleStepsInColourRange),
            targetColour = utils.getRandomHex(),
            minColourDiff = stepsInColourRange * 0.05;

        while(utils.calculateColourDiff(startColour, targetColour) <= minColourDiff) {
            targetColour = utils.getRandomHex();
        }

        return {
            timer: DIFFICULTIES[0].timer,
            colourRangeArray: getColourRangeArray(startColour, targetColour, stepsInColourRange)
        };
    }
};
