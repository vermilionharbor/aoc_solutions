const fs = require('fs');
const test = false;
let inputMovesLine;
let inputLines;
let cubeSize;
if (test === true) {
    inputLines = fs.readFileSync('test.txt').toString().split('\n');
    inputMovesLine = "10R5L5R10L4R5L5";
    cubeSize = 4;
} else {
    inputLines = fs.readFileSync('input.txt').toString().split('\n');
    inputMovesLine = fs.readFileSync('moves.txt').toString();
    cubeSize = 50;
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

const computeTestMaps = () => {
    let r, c;
    let newR, newC;

    // top map
    newR = 0
    for (c=0; c<cubeSize; c++) {
        newC = 3*cubeSize-1-c;
        topMap[c] = {
            r: newR,
            c: newC,
            face: 1, // down
        }
    }

    for (c=cubeSize; c<cubeSize*2; c++) {
        newR = c-cubeSize;
        newC = 2*cubeSize;
        topMap[c] = {
            r: newR,
            c: newC,
            face: 0, // right
        }
    }

    let offset = 0;
    for (c=2*cubeSize; c<3*cubeSize; c++) {
        newC = cubeSize-1+offset;
        newR = cubeSize;
        offset--;
        topMap[c] = {
            r: newR,
            c: newC,
            face: 1, // down
        }
    }

    for (c=3*cubeSize; c<4*cubeSize; c++) {
        newC =3*cubeSize-1;
        offset = c-3*cubeSize;
        newR = 2*cubeSize-1-offset;
        topMap[c] = {
            r: newR,
            c: newC,
            face: 2, // left
        }
    }

    // bottom map
    for (offset=0; offset<cubeSize; offset++) {
        c = offset;
        newR = 3*cubeSize-1;
        newC = 3*cubeSize-1-offset;
        bottomMap[c] = {
            r: newR,
            c: newC,
            face: 3, // up
        }
    }

    for (offset=0; offset<cubeSize; offset++) {
        c = cubeSize+ offset;
        newR = 3*cubeSize-1-offset;
        newC = 2*cubeSize;
        bottomMap[c] = {
            r: newR,
            c: newC,
            face: 0, // right
        }
    }

    for (offset=0; offset<cubeSize; offset++) {
        c = 2*cubeSize + offset;
        newR = 2*cubeSize-1;
        newC = cubeSize-1-offset;
        bottomMap[c] = {
            r: newR,
            c: newC,
            face: 3, // up
        }
    }

    for (offset=0; offset<cubeSize; offset++) {
        c = 3*cubeSize + offset;
        newC = 0;
        newR = 2*cubeSize-1-offset;
        bottomMap[c] = {
            r: newR,
            c: newC,
            face: 0, // right
        }
    }

    // leftMap
    for (offset = 0; offset<cubeSize; offset++) {
        r = offset;
        newR = cubeSize;
        newC = 2*cubeSize-1-offset;
        leftMap[r] = {
            r: newR,
            c: newC,
            face: 1, // down
        }
    }

    for (offset=0; offset<cubeSize; offset++) {
        r = cubeSize+offset;
        newR = 3*cubeSize-1;
        newC = 4*cubeSize-1-offset;
        leftMap[r] = {
            r: newR,
            c: newC,
            face: 3, // up
        }
    }

    for (offset=0; offset<cubeSize; offset++) {
        r = 2*cubeSize+offset;
        newR = 2*cubeSize-1;
        newC = 3*cubeSize-1-offset;
        leftMap[r] = {
            r: newR,
            c: newC,
            face: 3, // up
        }
    }

    // rightMap
    for (offset=0; offset<cubeSize; offset++) {
        r=offset;
        newR = 3*cubeSize-1-offset;
        newC = 4*cubeSize -1;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 2, // left
        }
    }
    for (offset=0; offset<cubeSize; offset++) {
        r = cubeSize+offset;
        newR = 2*cubeSize;
        newC = 4*cubeSize-1-offset;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 1 // down
        }
    }
    for (offset=0; offset<cubeSize; offset++) {
        r = 2*cubeSize+offset;
        newC = 3*cubeSize-1;
        newR = cubeSize-1-offset;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 2 // left
        }
    }
}

const computeMaps = () => {
    let r, c;
    let newR, newC;
    let offset;
    for (offset=0; offset< cubeSize; offset++) {
        // face A
        r = cubeSize + offset;
        newR = cubeSize - 1;
        newC = 2*cubeSize + offset;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 3 // up
        }

        c = 2*cubeSize -1;
        bottomMap[newC] = {
            r: r,
            c: c,
            face: 2 // left
        }

        // face B
        r = 2 * cubeSize + offset;
        c = 2 * cubeSize -1;
        newR = cubeSize -1 -offset;
        newC = 3*cubeSize - 1;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 2, // left
        }
        rightMap[newR] = {
            r: r,
            c: c,
            face: 2 // left
        }

        // face C
        r = 3*cubeSize + offset;
        c = cubeSize - 1;
        newR = 3 * cubeSize - 1;
        newC = cubeSize + offset;
        rightMap[r] = {
            r: newR,
            c: newC,
            face: 3 //up
        }
        bottomMap[newC] = {
            r: r,
            c: c,
            face: 2 // left
        }

        // face D
        r = 2 *cubeSize -1;
        c = offset;
        newR = 2*cubeSize -1 - offset;
        newC = cubeSize;
        topMap[c] = {
            r: newR,
            c: newC,
            face: 0, // right
        }
        leftMap[newR] = {
            r: r,
            c: c,
            face: 1, // down
        }

        // face E
        r = 3*cubeSize + offset;
        c = 0;
        newR = 0;
        newC = cubeSize+offset;
        leftMap[r] = {
            r: newR,
            c: newC,
            face: 1 // down
        }
        topMap[newC] = {
            r: r,
            c: c,
            face: 0 // right
        }

        // face F
        r = 4*cubeSize -1;
        c = offset;
        newR = 0;
        newC = 2 * cubeSize + offset;
        bottomMap[c] = {
            r: newR,
            c: newC,
            face: 1 // down
        }
        topMap[newC] = {
            r: r,
            c: c,
            face: 3 // up
        }

        // face G
        r = 2*cubeSize + offset;
        c = 0;
        newR = cubeSize - 1 - offset;
        newC = cubeSize;
        leftMap[r] = {
            r: newR,
            c: newC,
            face: 0 // right
        }
        leftMap[newR] = {
            r: r,
            c, c,
            face: 0 // right
        }
    }
}

console.log(`map is ${height} high, ${width} wide`);
if (test === true) {
    computeTestMaps();
} else {
    computeMaps();
}
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
            const after = lines[r].slice(position.c+1, lines[r].length);
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

const findInitialPos = () => {
    let c;
    for (c=0; c<width; c++) {
        if (worldMap[indexToString(0, c)] !== undefined) {
            return {
                r: 0,
                c: c,
            }
        }
    }
}
const simulate = () => {
    const initialPos = findInitialPos();
    console.log(`initial pos ${JSON.stringify(initialPos)}`);

    let face = 0;
    let position = {
        r: initialPos.r,
        c: initialPos.c,
    }
    console.log(`initial state`);
    prettyPrint(position, face);
    const moves = parseMoves(movesLine);

    let i = 0;
    for (i=0; i<moves.length; i++) {
    // for (i=0; i<11; i++) {
        console.log(`${i} doing move.. ${moves[i]}`);
        if (typeof moves[i] === 'number') {
            let numSteps = moves[i];
            let step;
            let incrementR;
            let incrementC;
            let warpMap;
            step = 0;
            let nextR, nextC, nextFace;
            let key;
            let nextPos;
            nextR = position.r;
            nextC = position.c;
            while (step < numSteps) {
                if (face === 0) {
                    // facing right
                    warpMap = leftMap;
                    incrementR = 0;
                    incrementC = 1;
                } else if (face === 2) {
                    // facing left
                    incrementR = 0;
                    incrementC = -1;
                    warpMap = rightMap;
                } else if (face === 1) {
                    // facing down
                    warpMap = topMap;
                    incrementR = 1;
                    incrementC = 0;
                } else if (face === 3) {
                    // facing up
                    warpMap = bottomMap;
                    incrementR = -1;
                    incrementC = 0;
                }

                nextR = nextR + incrementR;
                nextC = nextC + incrementC;
                key = indexToString(nextR, nextC);
                let nextTile = worldMap[key];
                if (nextTile === '.') {
                    // empty move to it
                    position.r = nextR;
                    position.c = nextC;
                } else if (nextTile === '#') {
                    // blocked, stop moving
                    break;
                } else if (nextTile === undefined) {
                    // fell off
                    if (face === 0) {
                        // facing right
                        warpMap = rightMap;
                        nextPos = warpMap[position.r];
                        console.log(`using left map`)
                    } else if (face === 2) {
                        // facing left
                        warpMap = leftMap;
                        nextPos = warpMap[position.r];
                    } else if (face === 1) {
                        // facing down
                        warpMap = bottomMap;
                        nextPos = warpMap[position.c];
                    } else if (face === 3) {
                        // facing up
                        warpMap = topMap;
                        nextPos = warpMap[position.c];
                    }
                    nextR = nextPos.r;
                    nextC = nextPos.c;
                    nextFace = nextPos.face;

                    key = indexToString(nextR, nextC);
                    nextTile = worldMap[key];
                    if (nextTile === ".") {
                        position.r = nextR;
                        position.c = nextC;
                        face = nextFace;
                    } else if (nextTile === '#') {
                        // blocked
                        break;
                    }
                }
                step++;
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


