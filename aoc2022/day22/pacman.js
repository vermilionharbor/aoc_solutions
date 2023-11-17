const fs = require('fs');
const test = false;
let inputMovesLine;
let inputLines;
if (test === true) {
    inputLines = fs.readFileSync('test.txt').toString().split('\n');
    inputMovesLine = "10R5L5R10L4R5L5";
} else {
    inputLines = fs.readFileSync('input.txt').toString().split('\n');
    inputMovesLine = fs.readFileSync('moves.txt').toString();
}

const movesLine = inputMovesLine;
const lines = inputLines;
const height = lines.length;
let width = 0;
lines.forEach(l => {
    if (l.length > width) {
        width = l.length;
    }
});

const indexToString = (x, y) => {
    return `${x}_${y}`;
}

let r, c;
let worldMap = {}
let leftMap = {}
let rightMap = {}
let topMap = {}
let bottomMap = {}

for (r=0; r<height; r++) {
    for (c=0; c<lines[r].length; c++) {
        switch (lines[r][c]) {
            case ".":
            case "#":
                let key = indexToString(r, c);
                worldMap[key] = lines[r][c];

                if (leftMap[r] === undefined) {
                    leftMap[r] = {
                        r: r,
                        c: c,
                    };
                }
                if (topMap[c] === undefined) {
                    topMap[c] = {
                        r: r,
                        c: c,
                    }
                }
                rightMap[r] = {
                    r: r,
                    c: c,
                }
                bottomMap[c] = {
                    r,
                    c,
                }
                break;
            case " ":
                // do nothing
                break;
            default:
                console.log(`weird map tile ${lines[r][c]}`);
                break;
        }
    }
}

console.log(`map is ${height} high, ${width} wide`);
console.log(topMap);
console.log(bottomMap);
console.log(leftMap);
console.log(rightMap);
const parseMoves = (moves) => {
    let buffer = "";
    let i = 0;
    let distance;
    let movesArray = [];
    while (i < moves.length) {
        switch (moves[i]) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                buffer += moves[i];
                break;
            case 'R':
                if (buffer.length > 0) {
                    distance = parseInt(buffer, 10);
                    buffer = "";
                    // console.log(`move ${distance}`)
                    movesArray.push(distance);
                }
                // console.log(`right`);
                movesArray.push('R');
                break;
            case 'L':
                if (buffer.length > 0) {
                    distance = parseInt(buffer, 10);
                    buffer = "";
                    // console.log(`move ${distance}`)
                    movesArray.push(distance);
                }
                // console.log(`left`);
                movesArray.push('L');
                break;
        }
        i++;
    }
    if (buffer.length > 0) {
        distance = parseInt(buffer, 10);
        // console.log(`move ${distance}`)
        movesArray.push(distance);
    }

    return movesArray;
}
// 0 right
// 1 down
// 2 left
// 3 up
const turn = (facing, direction) => {
    if (direction === 'R') {
        return (facing + 1) % 4;
    } else if (direction === 'L') {
        return (facing + 3) % 4;
    } else {
        console.log(`unexpected turn ${direction}`);
    }
}

// parseMoves(moves);
const prettyPrint = (position, face) => {
    let r;
    console.log(position);
    for (r=0; r<height; r++) {
        if (r === position.r) {
            const before = lines[r].slice(0, position.c);
            // console.log(lines[r]);
            // console.log(lines[r].length);
            // console.log(lines[r].slice(0, 5));
            // console.log(lines[r].slice(0, 6));
            // console.log(lines[r].slice(0, 7));
            // console.log(lines[r].slice(0, 8));
            // console.log(lines[r].slice(0, 9));
            // console.log(`before ${before}`);
            const after = lines[r].slice(position.c+1, lines[r].length);
            // console.log(`after ${after}`);
            let icon;
            switch (face) {
                case 0:
                    icon = ">";
                    break;
                case 1:
                    icon = "V";
                    break;
                case 2:
                    icon = "<";
                    break;
                case 3:
                    icon = "^";
                    break;
            }
            const line = before + icon + after;
            console.log(line);
        } else {
            console.log(lines[r]);
        }
    }
}

const printMap = () => {
    console.log('map');
    lines.forEach(l => {
        console.log(l);
    })
}

const simulate = () => {
    const initialPos = leftMap[0];
    console.log(initialPos);

    let face = 0;
    let position = {
        r: initialPos.r,
        c: initialPos.c,
    }

    const moves = parseMoves(movesLine);

    let i = 0;
    for (i=0; i<moves.length; i++) {
    // if (true) {
        console.log(`doing move.. ${moves[i]}`);
        if (typeof moves[i] === 'number') {
            let numSteps = moves[i];
            let step;
            let increment;
            let warpMap;
            if ((face === 0) || (face === 2)) {
                if (face === 0) {
                    // facing right
                    warpMap = leftMap;
                    increment = 1;
                } else if (face === 2) {
                    // facing left
                    increment = -1;
                    warpMap = rightMap;
                }
                step = 0;
                let nextR = position.r;
                let nextC = position.c;
                let key;
                while (step < numSteps) {
                    nextC = nextC + increment;
                    key = indexToString(nextR, nextC);
                    let nextTile = worldMap[key];
                    if (nextTile === '.') {
                        // empty move to it
                        position.c = nextC;
                    } else if (nextTile === '#') {
                        // blocked, stop moving
                        break;
                    } else if (nextTile === undefined) {
                        // fell off
                        nextC = warpMap[nextR].c;
                        key = indexToString(nextR, nextC);
                        nextTile = worldMap[key];
                        if (nextTile === ".") {
                            position.c = nextC;
                        } else if (nextTile === '#') {
                            // blocked
                            break;
                        }
                    }
                    step++;
                }
            } else if ((face === 1) || (face === 3)) {
                if (face === 1) {
                    // facing down
                    warpMap = topMap;
                    increment = 1;
                } else if (face === 3) {
                    // facing up
                    warpMap = bottomMap;
                    increment = -1;
                }
                step = 0;
                let nextR = position.r;
                let nextC = position.c;
                let key;
                while (step < numSteps) {
                    nextR = nextR + increment;
                    key = indexToString(nextR, nextC);
                    let nextTile = worldMap[key];
                    if (nextTile === '.') {
                        // empty move to it
                        position.r = nextR;
                    } else if (nextTile === '#') {
                        // blocked, stop moving
                        break;
                    } else if (nextTile === undefined) {
                        // fell off
                        nextR = warpMap[nextC].r;
                        key = indexToString(nextR, nextC);
                        nextTile = worldMap[key];
                        if (nextTile === ".") {
                            position.r = nextR;
                        } else if (nextTile === '#') {
                            // blocked
                            break;
                        }
                    }
                    step++;
                }
            } else {
                console.log(`weird face ${face}`);
                throw "weird face"
            }

        } else {
            // it's a turn
            face = turn(face, moves[i]);
        }

        // prettyPrint(position, face);
    }

    const password = (position.r+1)*1000 + (position.c+1)*4 + face;
    console.log(`the password is ${password}`);
}

simulate ();

// printMap();


