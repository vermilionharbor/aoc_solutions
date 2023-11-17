const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

const checkSyntax = (autoComplete) => (line) => {
    const stack = [];
    let i = 0;
    let syntaxError = 0;
    while ((i < line.length) && (syntaxError === 0)) {
        const letter = line[i];
        let pop;
        switch (letter) {
            case '(':
            case '[':
            case '{':
            case '<':
                stack.push(letter);
                break;
            case ')':
                pop = stack.pop();
                // console.log(`pop ${pop}`)
                if (pop !== '(') {
                    // console.log(`expected ( found ${pop}`)
                    syntaxError = 3;
                }
                break;
            case ']':
                pop = stack.pop();
                // console.log(`pop ${pop}`)
                if (pop !== '[') {
                    // console.log(`expected [ found ${pop}`)
                    syntaxError = 57;
                }
                break;
            case '}':
                pop = stack.pop();
                // console.log(`pop ${pop}`)
                if (pop !== '{') {
                    // console.log(`expected { found ${pop}`)
                    syntaxError = 1197;
                }
                break;
            case '>':
                pop = stack.pop();
                // console.log(`pop ${pop}`)
                if (pop !== '<') {
                    // console.log(`expected < found ${pop}`)
                    syntaxError = 25137;
                }
                break;
        }
        i++
    }
    if (autoComplete === false) {
        return syntaxError;
    } else {
        let score = 0;
        while (stack.length > 0) {
            let pop = stack.pop();
            score *= 5;
            switch (pop) {
                case '(':
                    score += 1;
                    break;
                case '[':
                    score += 2;
                    break;
                case '{':
                    score += 3;
                    break;
                case '<':
                    score += 4;
                    break;
            }
        }

        return score;
    }
}

const checkForErrors = checkSyntax(false);
const autoComplete = checkSyntax(true);

let score = 0;
const incomplete = [];
lines.forEach((l, index) => {
    // console.log(l);
    const lineScore = checkForErrors(l);
    if (lineScore !== 0) {
        score += lineScore;
        console.log(`line ${index}: ${l}`);
        console.log(lineScore);
    } else {
        incomplete.push(l);
    }

})

console.log(`total score ${score}`);
console.log('** scanning incomplete lines **');

let autoCompleteScores = [];
incomplete.forEach((l, index) => {
    const score = autoComplete(l);
    console.log(score);
    autoCompleteScores.push(score);
})

autoCompleteScores.sort((a, b) => {return a-b});
console.log(`middle score ${autoCompleteScores[(Math.floor(autoCompleteScores.length-1)/2)]}`)


