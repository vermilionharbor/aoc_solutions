const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

const picks = lines[0].split(',').map(term => parseInt(term, 10));

// picks.forEach(p => {
//     console.log(p);
// });

let lineIndex = 1;

const boards = [];
let boardIndex = -1;
while (lineIndex < lines.length) {
    if (lines[lineIndex] === "") {
        boardIndex++;
        boards.push([]);
    } else {
        boards[boardIndex].push(lines[lineIndex]);
    }
    lineIndex++;
}

boards.forEach((b, index) => {
    const b2 = b.map(line => {
        return line.trim().split(/\s+/).map(term => parseInt(term, 10));
    })
    boards[index] = b2;
})

// boards.forEach(b => {
//     console.log(b);
// })

// boards and input are parsed
// setup the game state
const initialGameState = (boards) => {
    const game = boards.map(b => []);
    boards.forEach((b, bIndex) => {
        b.forEach(row => {
            game[bIndex].push(row.map(val => false));
        })
    });
    return game;
}
let game = initialGameState(boards);

// console.log(game);
console.log(boards.length, game.length);

const makePick = (board, flags, val) => {
    board.forEach((row, rowIndex) => {
        row.forEach((place, colIndex) => {
            if (place === val) {
                flags[rowIndex][colIndex] = true;
            }
        })
    })
}

const makePickForAll = (board, game, val) => {
    board.forEach((b, bIndex) => {
        makePick(b, game[bIndex], val);
    })
}

const makePickForAll2 = (board, game, status, val) => {
    board.forEach((b, bIndex) => {
        if (status[bIndex] === false) {
            makePick(b, game[bIndex], val);
        }
    })
}

const findBingo = (board, game) => {
    // scan rows
    //game.forEach((row) => {
    let r, c;
    const rsize = game.length;
    for (r=0; r<rsize; r++) {
        const row = game[r];
        const result = row.reduce((acc, val) => {
            return acc && val;
        }, true);
        if (result === true) {
            return true;
        }
    }

    // scan columns
    let csize = game[0].length;
    for (c=0; c<csize; c++) {
        let result = true;
        for (r = 0; r < board.length; r++) {
            result = result && game[r][c];
        }
        if (result === true) {
            return true;
        }
    }

    return false;
}

const findScore = (board, game, val) => {
    let sum = 0;
    let r, c;
    const rSize = board.length;
    const cSize = board[0].length;
    for (r=0; r<rSize; r++) {
        for (c=0; c<cSize; c++) {
            if (game[r][c] === false) {
                sum += board[r][c];
            }
        }
    }
    console.log(`sum ${sum} pick ${val}  score ${sum*val}`)
    return sum*val;
}

const findBingoForAll = (boards, game, lastpick) => {
    let bIndex;
    for (bIndex=0; bIndex<boards.length; bIndex++) {
        const b=boards[bIndex];
        const result = findBingo(b, game[bIndex]);
        if (result === true) {
            console.log(`*** winner board ${bIndex} **`);
            console.log(game[bIndex]);
            const score = findScore(b, game[bIndex], lastpick);
            return [true, score];
        }
    };
    return [false, 0];
}

let sanitycheck = 0;
const findLastBingo = (boards, game, status, lastpick) => {
    let bIndex;
    for (bIndex=0; bIndex<boards.length; bIndex++) {
        if (status[bIndex] === false) {
            const b = boards[bIndex];
            const result = findBingo(b, game[bIndex]);
            status[bIndex] = result;
            if (result === true) {
                const score = findScore(b, game[bIndex], lastpick);
                sanitycheck++;
                console.log(`*** winner board ${bIndex} index ${sanitycheck} score ${score} ***`);
            }
        }
    };
    return status.reduce((acc, val) => {
        return acc && val;
    }, [true]);
}

// play the game
let pickIndex = 0;
while (pickIndex < picks.length) {
    console.log(`picking.. ${picks[pickIndex]}`);
    makePickForAll(boards, game, picks[pickIndex]);
    const [bingo, score] = findBingoForAll(boards, game, picks[pickIndex]);
    if (bingo) {
        console.log(`bingo score ${score}`);
        break;
    }
    pickIndex++;
    // console.log(`gamestate ${pickIndex}`);
    // console.log(game);
}

// console.log(game);

// play the game again to find last winner
sanitycheck = 0;
game = initialGameState(boards);
const boardStatus = boards.map(b => false);
pickIndex = 0;
let lastWinner = false;
while ((pickIndex < picks.length) && !lastWinner) {
    console.log(`picking.. ${picks[pickIndex]}`);
    makePickForAll2(boards, game, boardStatus, picks[pickIndex]);
    lastWinner = findLastBingo(boards, game, boardStatus, picks[pickIndex]);
    pickIndex++;
    // console.log(`gamestate ${pickIndex}`);
    // console.log(game);
}