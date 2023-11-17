const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const indexToString = (x, y, z) => {
    return `${x}_${y}_${z}`;
}

const keyToIndex = (key) => {
    const terms = key.split('_');
    return [parseInt(terms[0], 10), parseInt(terms[1], 10), parseInt(terms[2], 10)];
}

const points = [];
let maxX = 0;
let maxY = 0;
let maxZ = 0;

lines.forEach(l => {
    const terms = l.split(',');
    const point = {
        x: parseInt(terms[0], 10),
        y: parseInt(terms[1], 10),
        z: parseInt(terms[2], 10),
    }
    if (point.x > maxX) {
        maxX = point.x;
    }
    if (point.y > maxY) {
        maxY = point.y;
    }
    if (point.z > maxZ) {
        maxZ = point.z;
    }
    points.push(point);
});

const pointMap = {}
// because hashing is great
points.forEach(p => {
    pointMap[indexToString(p.x, p.y, p.z)] = 1;
});

const computeFaces = (points, pointMap) => {
    // each cube has 6 faces,  check the map if it has a neighbor on that side
    let numFaces = 0;
    points.forEach(p => {
        // check x
        if (pointMap[indexToString(p.x+1, p.y, p.z)] === undefined) {
            numFaces++;
        }
        if (pointMap[indexToString(p.x-1, p.y, p.z)] === undefined) {
            numFaces++;
        }
        // check y
        if (pointMap[indexToString(p.x, p.y+1, p.z)] === undefined) {
            numFaces++;
        }
        if (pointMap[indexToString(p.x, p.y-1, p.z)] === undefined) {
            numFaces++;
        }

        // check z
        if (pointMap[indexToString(p.x, p.y, p.z+1)] === undefined) {
            numFaces++;
        }
        if (pointMap[indexToString(p.x, p.y, p.z-1)] === undefined) {
            numFaces++;
        }
    })

    return numFaces;
}


const fillWater = (pointMap, waterMap, min, max) => {
    // so we need to expand the bounds by 1
    min--;
    max++;
    let frontier = {}
    let nextFrontier;
    let keyOrigin = indexToString(min, min, min);
    frontier[keyOrigin] = 1;
    waterMap[keyOrigin] = 1;
    let wave = 0;
    console.log(`filling water ${min} ${max}`);

    while ((Object.keys(frontier).length > 0)) {
        nextFrontier = {};
        console.log(`computing wave ${wave} ${Object.keys(frontier).length}`);
        for (const key of Object.keys(frontier)) {
            const [x, y, z] = keyToIndex(key);

            let nextKey;
            nextKey = indexToString(x-1, y, z);
            if ((x-1 >= min) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
            nextKey = indexToString(x+1, y, z);
            if ((x+1 <= max) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
            nextKey = indexToString(x, y-1, z);
            if ((y-1 >= min) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
            nextKey = indexToString(x, y+1, z);
            if ((y+1 <= max) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
            nextKey = indexToString(x, y, z-1);
            if ((z-1 >= min) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
            nextKey = indexToString(x, y, z+1);
            if ((z+1 <= max) && (pointMap[nextKey] === undefined) && (waterMap[nextKey] === undefined)) {
                nextFrontier[nextKey] = 1;
                waterMap[nextKey] = 1;
            }
        }
        wave ++;
        frontier = nextFrontier;
    }

    let i,j,k;
    let numBlocks = 0;
    for (i=min; i<=max; i++) {
        for (j=min; j<=max; j++) {
            for (k=min; k<=max; k++) {
                numBlocks++;
            }
        }
    }
    console.log(numBlocks);
    console.log(Object.keys(pointMap).length);
    console.log(`${maxX} ${maxY} ${maxZ}`);

    for (const key of Object.keys(waterMap)) {
        if (pointMap[key] !== undefined) {
            console.log(`failed at ${key}`);
        }
    }
}

const computeFacesWithoutBubbles = (points, pointMap, waterMap) => {
    let numFaces = 0;
    let key;
    points.forEach(p => {
        // check x
        key = indexToString(p.x+1, p.y, p.z);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }
        key = indexToString(p.x-1, p.y, p.z);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }
        // check y
        key = indexToString(p.x, p.y+1, p.z);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }
        key = indexToString(p.x, p.y-1, p.z);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }

        // check z
        key = indexToString(p.x, p.y, p.z+1);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }
        key = indexToString(p.x, p.y, p.z-1);
        if ((pointMap[key] === undefined) && (waterMap[key] !== undefined)) {
            numFaces++;
        }
    })

    return numFaces;
}

const numFaces = computeFaces(points, pointMap);
console.log(`num faces ${numFaces}`);

// make these bounds
// maxX++;
// maxY++;
// maxZ++;

// let numFaces2 = computeFacesWithoutBubbles(points, pointMap);
// console.log(`num faces ${numFaces2}`);
// console.log(`max x ${maxX} y ${maxY} z ${maxZ}`);
// console.log(isBubble(18, 12, 11, pointMap, true));

// const bubbles21 = {};
// computeBubbles (points, pointMap, bubbles21, 21);
// console.log(`bubbles 21 ${Object.keys(bubbles21).length}`);
// const bubbles22 = {};
// computeBubbles (points, pointMap, bubbles22, 22);
// console.log(`bubbles 22 ${Object.keys(bubbles22).length}`);
//
// for (const key of Object.keys(bubbles22)) {
//     if (bubbles21[key] === undefined) {
//         console.log(`found ${key}`);
//     }
// }
const waterMap = {}
let theMax = maxX;
if (maxY > theMax) { theMax = maxY }
if (maxZ > theMax) { theMax = maxZ }
fillWater(pointMap, waterMap, 0, theMax);
console.log(`filled water ${Object.keys(waterMap).length} gallons!`);
const exteriorFaces = computeFacesWithoutBubbles(points, pointMap, waterMap);
console.log(`num faces in water ${exteriorFaces}`);

