let utils = require('./utils');

let DIFFICULTIES = [
    {
        timer: 5000,
        possibleStepsInColourRange: [1, 2, 3,3, 4,4],
        minColourDiff: 0.12
    },
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2, 3,3, 4,4,4, 5,5,5],
        minColourDiff: 0.09
    },
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2, 3,3, 4,4,4, 5,5,5, 6,6,6],
        minColourDiff: 0.08
    },
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2,2, 3,3,3, 4,4,4, 5,5,5, 6,6,6, 7,7],
        minColourDiff: 0.07
    },
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2,2, 3,3,3, 4,4,4, 5,5,5, 6,6,6, 7,7,7, 8,8],
        minColourDiff: 0.06
    },
    {
        timer: 5000,
        possibleStepsInColourRange: [0, 1, 2,2, 3,3,3, 4,4,4, 5,5,5, 6,6,6, 7,7,7, 8,8,8, 9,9],
        minColourDiff: 0.054
    }
];

function getColourRangeArray(startColour, targetColour, totalSteps) {
    let colourRangeArray = [startColour];

    for(let step = totalSteps; step > 0; step--) {
        colourRangeArray.push(utils.shadeBlend((step - 1) / totalSteps, targetColour, startColour));
    }

    return colourRangeArray;
}

module.exports = {
    getLevel: (startColour, levelIndex) => {
        let difficulty = DIFFICULTIES[Math.floor(levelIndex / 7)] || DIFFICULTIES[DIFFICULTIES.length - 1];
        let stepsInColourRange = utils.randomFromArray(difficulty.possibleStepsInColourRange),
            targetColour = utils.getRandomHex(),
            minColourDiff = stepsInColourRange * difficulty.minColourDiff;

        while(utils.calculateColourDiff(startColour, targetColour) <= minColourDiff) {
            targetColour = utils.getRandomHex();
        }

        return {
            timer: difficulty.timer - (levelIndex * 50),
            colourRangeArray: getColourRangeArray(startColour, targetColour, stepsInColourRange)
        };
    }
};
