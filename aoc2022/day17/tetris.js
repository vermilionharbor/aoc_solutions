const fs = require('fs');

const line = fs.readFileSync('input.txt').toString();

console.log(line);

let worldMap = {}
let worldHeight = 0;
let elapsedTime = 0;
let floor = 0;

const resetState = () => {
    worldMap = {}
    worldHeight = 0;
    elapsedTime = 0;
}

const getWind = (time) => {
    let index = time % line.length;
    return line[index];
}

console.log(line.length);
// console.log(getWind(line.length));
// console.log(getWind(line.length-1));
// console.log(getWind(line.length-2));
// console.log(getWind(line.length-3));

const indexToString = (x, y) => {
    return `${x}_${y}`;
}
const spawnMinus = (height) => {
    return [
        {x:3 , y:height+4 },
        {x:4 , y:height+4 },
        {x:5 , y:height+4 },
        {x:6 , y:height+4 },
    ]
}

const spawnCross = (height) => {
    return [
        {x:4 , y:height+4 },
        {x:4 , y:height+5 },
        {x:4 , y:height+6 },
        {x:3 , y:height+5 },
        {x:5 , y:height+5 },
    ]
}

const spawnL = (height) => {
    return [
        {x:3 , y:height+4 },
        {x:4 , y:height+4 },
        {x:5 , y:height+4 },
        {x:5 , y:height+5 },
        {x:5 , y:height+6 },
    ]
}

const spawnStick = (height) => {
    return [
        {x:3 , y:height+4 },
        {x:3 , y:height+5 },
        {x:3 , y:height+6 },
        {x:3 , y:height+7 },
    ]
}

const spawnSquare = (height) => {
    return [
        {x:3 , y:height+4 },
        {x:3 , y:height+5 },
        {x:4 , y:height+4 },
        {x:4 , y:height+5 },
    ]
}

// find the coords of the shape were it to move horizontally by the wind
const blowShape = (shape, wind) => {
    if (wind === "<") {
        return shape.map(p => {
            return {
                x: p.x-1,
                y: p.y
            }
        })
    } else if (wind === ">") {
        return shape.map(p => {
            return {
                x: p.x+1,
                y: p.y
            }
        })
    } else {
        throw `fail wind ${wind}`;
    }
}

// find the coords of the shape were it to descend by 1
const descendShape = (shape) => {
    return shape.map(p => {
        return {
            x: p.x,
            y: p.y-1
        }
    })
}

const occludedHorizontal = (shape, worldMap) => {
    let i;
    for (i=0; i<shape.length; i++) {
        const p = shape[i];
        if ((p.x <= 0) || (p.x > 7)) {
            // off the edge
            return true;
        }
        let key = indexToString(p.x, p.y);
        if (worldMap[key] !== undefined) {
            return true;
        }
    }
    return false;
}

const occludedVertical = (shape, worldMap) => {
    let i;
    for (i=0; i<shape.length; i++) {
        const p = shape[i];
        if (p.y <= floor) {
            // hit the ground
            return true;
        }
        let key = indexToString(p.x, p.y);
        if (worldMap[key] !== undefined) {
            // hit a grounded block
            return true;
        }
    }
    return false;
}

const landShape = (shape, worldMap) => {
    let i;
    let maxHeight = worldHeight;
    for (i=0; i<shape.length; i++) {
        const p = shape[i];
        const key = indexToString(p.x, p.y);
        worldMap[key] = 1;
        if (p.y > maxHeight) {
            maxHeight = p.y;
        }
    }
    return maxHeight;
}

const doWind = (shape, time, worldMap) => {
    const wind = getWind(time);

    let movedPiece = blowShape(shape, wind);
    // console.log(`moved piece ${JSON.stringify(movedPiece)}`);
    if (!occludedHorizontal(movedPiece, worldMap)) {
        // move the piece
        // console.log('moving piece');
        return movedPiece;
    } else {
        // console.log(`horizontal occlusion`);
    }
    return shape;
}

// return [landed, shape, newHeight]
const doGravity = (shape, worldMap) => {
    let movedPiece = descendShape(shape);
    if (!occludedVertical(movedPiece, worldMap)) {
        // move the piece
        // console.log(`gravity drops piece!`);
        return [false, movedPiece, worldHeight];
    } else {
        // console.log(`vertical occlusion`);
        // land the piece
        let newHeight = landShape(shape, worldMap);
        return [true, shape, newHeight];
    }
}

const prettyPrint = (worldMap, worldHeight) => {
    let i, j;
    for (j=worldHeight; j>0; j--) {
        let line = "";
        for (i=1; i<8; i++) {
            if (worldMap[indexToString(i, j)] === undefined) {
                line += ".";
            } else {
                line += "#";
            }
        }
        console.log(`${line} (${j})`);
    }
    console.log("-------")
}

const garbageCollect = (worldMap, worldHeight) => {
    let i, j;
    for (j=worldHeight; j>floor; j--) {
        let lineFound = true;
        for (i=1; i<8; i++) {
            if (worldMap[indexToString(i, j)] === undefined) {
                lineFound = false;
                break;
            }
        }
        if (lineFound === true) {
            // console.log(`garbage collect at height ${j}`);
            let h, x;
            let newWorld = {};
            for (h=worldHeight; h>=j; h--) {
                for (x=1; x<8; x++) {
                    const key = indexToString(x, h);
                    if (worldMap[key] !== undefined) {
                        newWorld[key] = 1;
                    }
                }
            }
            floor = j;
            return newWorld;
        }
    }
    return worldMap;
}

resetState();

// let landed;
// do {
//     console.log(`time ${elapsedTime}`);
//     shape = doWind(shape, elapsedTime, worldMap);
//     const [nextLanded, nextShape, nextHeight] = doGravity(shape, worldMap);
//     shape = nextShape;
//     worldHeight = nextHeight;
//     landed = nextLanded;
//     prettyPrint(worldMap, worldHeight);
//     console.log(JSON.stringify(worldMap));
//     elapsedTime++;
// } while (landed === false);

let i;
// 22 is a +,  39
// 57 is a +,  92
// 92 is a +,  145
// 127 is a +, 198

// 50 is 22+28, 78  figuring out the remainder stacked on the 22, the remainder is 28
// 49 is a | that fills 3 bars


// test data
// 322,   2 bars, 195 piece is a square, height 326
// 2993,  2 bars, 1890 piece is a square, height 2997
// 5664,  3585 piece is square, height 5668

const iterations = (195+610);
for (i=0; i<iterations; i++) {
    let shape;
    let landed;

    switch (i % 5) {
        case 0:
            shape = spawnMinus(worldHeight);
            break;
        case 1:
            shape = spawnCross(worldHeight);
            break;
        case 2:
            shape = spawnL(worldHeight);
            break
        case 3:
            shape = spawnStick(worldHeight);
            break;
        case 4:
            shape = spawnSquare(worldHeight);
            break;
    }
    do {
        // console.log(`time ${elapsedTime}`);
        shape = doWind(shape, elapsedTime, worldMap);
        const [nextLanded, nextShape, nextHeight] = doGravity(shape, worldMap);
        shape = nextShape;
        worldHeight = nextHeight;
        landed = nextLanded;
        // worldMap = garbageCollect(worldMap, worldHeight);
        // prettyPrint(worldMap, worldHeight, false);
        // console.log(JSON.stringify(worldMap));
        elapsedTime++;
    } while (landed === false);
}
prettyPrint(worldMap, worldHeight, true);
console.log(`height ${worldHeight}`);

// test and calculations for sample, 1514285714288.
// console.log(1000000000000-22);
// console.log((1000000000000-22)%35);
// const layers = Math.floor((1000000000000-22)/35);
// const layerThickness = 53;
// console.log(Math.floor((1000000000000-22)/35));
// const soFar = layers*layerThickness+ 39;
// console.log(soFar+39);
//
// test and calculations for actual data
const startOffset = 195
const patternCycle = 1695
console.log(1000000000000-startOffset);
const remainderBlocks = (1000000000000-startOffset)%patternCycle;
console.log(`remainderBlocks ${remainderBlocks}`);
const layers = Math.floor((1000000000000-22)/patternCycle);
const layerThickness = 2671;
const startHeight = 326;
console.log(`total ${layers} layers`);
const soFar = layers*layerThickness;
console.log(`soFar ${soFar}`);
// remainder is 610, we need to figure out what 195+610 looks like
// it is 1316 high, we know 195 is 326 high  so do 1316-326
const remainderHeight = 1316-326;
const totalHeight = soFar + remainderHeight + 326; // so its actually just adding 1316
console.log(`totalHeight ${totalHeight}`);