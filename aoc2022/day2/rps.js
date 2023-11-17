const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

// a rock, b paper, c scissor
// x rock, y paper, z scissor
const outcome = {
    "A X": 3,
    "A Y": 6,
    "A Z": 0,
    "B X": 0,
    "B Y": 3,
    "B Z": 6,
    "C X": 6,
    "C Y": 0,
    "C Z": 3
}

const rpcValue = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

let sum = 0;
lines.forEach(l => {
    if (l.length > 2) {
        const choiceScore = rpcValue[l[2]];
        const gameValue = outcome[l];
        const roundValue = choiceScore + gameValue;
        console.log(`${l} ${choiceScore} ${gameValue} ${roundValue}`);
        sum += roundValue;
    }
});

console.log(`total score ${sum}`);

// a rock, b paper, c scissor
// x rock, y paper, z scissor
// (1 for Rock, 2 for Paper, and 3 for Scissors)
const rnd2score = {
    "A X": 3,   // rock lose => scissor
    "A Y": 1,   // rock draw => rock
    "A Z": 2,   // rock win => paper
    "B X": 1,   // paper lose => rock
    "B Y": 2,   // paper draw => paper
    "B Z": 3,   // paper win => scissor
    "C X": 2,   // scissor lose => paper
    "C Y": 3,   // scissor draw => scissor
    "C Z": 1    // scissor win => rock
}

const outcomeValue = {
    "X": 0,
    "Y": 3,
    "Z": 6,
}

sum = 0;
lines.forEach(l => {
    if (l.length > 2) {
        const choiceScore = rnd2score[l];
        const gameValue = outcomeValue[l[2]];
        const roundValue = choiceScore + gameValue;
        console.log(`${l} ${choiceScore} ${gameValue} ${roundValue}`);
        sum += roundValue;
    }
})

console.log(`total score day2 ${sum}`);

