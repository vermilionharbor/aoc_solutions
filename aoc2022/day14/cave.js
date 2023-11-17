const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const rocks = [];
lines.forEach(l => {
    // console.log(l);
    const points = l.split(" -> ");
    let theLine = [];
    points.forEach(p => {
        const coords = p.split(',');
        x = parseInt(coords[0], 10);
        y = parseInt(coords[1], 10);
        const thePoint = {
            x: x,
            y, y,
        }
        theLine.push(thePoint);
        // console.log(p);
    });
    rocks.push(theLine);
})

// console.log(JSON.stringify(rocks));
const indexToString = (x, y) => {
    return `${x}_${y}`;
}

let maxY = 0;

const createCave = (rocks, caveMap) => {
    let i, j;
    const makeSegment = (a, b) => {
        if (a.x === b.x) {
            // y coords changing
            if (a.y > b.y) {
                // swap them
                let temp = a;
                a = b;
                b = temp;
            }
            if (b.y > maxY) {
                maxY = b.y;
            }
            for (j=a.y; j<= b.y; j++) {
                console.log(`rock at ${a.x},${j}`)
                caveMap[indexToString(a.x, j)] = "#";
            }
        } else if (a.y === b.y) {
            if (a.y > maxY) {
                maxY = a.y;
            }
            if (a.x > b.x) {
                // swap them
                let temp = a;
                a = b;
                b = temp;
            }
            for (j=a.x; j<= b.x; j++) {
                console.log(`rock at ${j},${a.y}`)
                caveMap[indexToString(j, a.y)] = "#";
            }
        } else {
            console.log('something wrong');
        }
    }

    for (i=0; i<rocks.length; i++) {
        let j;
        for (j=1; j < rocks[i].length; j++) {
            console.log(`make segment from ${JSON.stringify(rocks[i][j-1])} to ${JSON.stringify(rocks[i][j])}`);
            makeSegment(rocks[i][j-1], rocks[i][j]);
        }
    }
}

const dropSand = (caveMap) => {
    let x, y;
    let nextX, nextY;
    x = 500;
    nextX = 500;
    y=0;
    nextY = 0;
    do {
        x = nextX;
        y = nextY;
        // console.log(`${x} ${y}`);
        if (caveMap[indexToString(x, y+1)] === undefined) {
            // fall
            nextX = x;
            nextY = y+1;
        } else if (caveMap[indexToString(x-1, y+1)] === undefined) {
            // console.log('fall left');
            // left down
            nextX = x-1;
            nextY = y+1;
        } else if (caveMap[indexToString(x+1, y+1)] === undefined) {
            // console.log(`before fall right ${JSON.stringify(caveMap)}`);
            // console.log('fall right');
            // right down
            nextX = x+1;
            nextY = y+1;
        }
    } while (((nextX !== x) || (nextY !== y)) && (nextY <= maxY));

    if (nextY > maxY) {
        console.log(`infinite sand`);
        return false;
    } else {
        caveMap[indexToString(x, y)] = "O";
        // console.log(`sand rests at ${x} ${y}`);
        return true;
    }
}


const caveMap = {}
createCave(rocks, caveMap);
console.log(JSON.stringify(caveMap));
console.log(`maxY ${maxY}`);

// dropSand(caveMap);
// console.log(JSON.stringify(caveMap));
// dropSand(caveMap);
// console.log(JSON.stringify(caveMap));
let sandResult;
let numSand = 0;
do {
    sandResult = dropSand(caveMap);
    if (sandResult === true) {
        numSand ++;
    }
} while (sandResult);
console.log(`numSand ${numSand}`);