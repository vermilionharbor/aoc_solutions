const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

const encode = (x, y, z, w) => {
    return `${x}_${y}_${z}_${w}`;
}

let map = {};
let x = 0;
let width = 0;
let height;
lines.forEach(l => {
    // console.log(l);
    width = l.length;
    let z = 0;
    let w = 0;
    for (let y=0; y<width; y++) {
        // console.log(`${r} ${c} ${l[c]}`);
        // console.log(`${r}_${c}_0`);
        console.log(encode(x, y, z, w), l[y]);
        map[encode(x, y, z, w)] = {
            x: x,
            y: y,
            z: z,
            w: w,
            val: l[y]
        };
    }
    x++;
})
height = x;

console.log(width, height);
console.log(map);

let minX = 0;
let minY = 0;
let minZ = 0;
let minW = 0;
let depth = 1;
let timeScale = 1;

// next rouund
let maxX = height;
let maxY = width;
let maxZ = depth;
let maxW = timeScale;

const countNeighbors = (map) => {
    // for each atom count the neighbors
    for ([key, atom] of Object.entries(map)) {
        let atom_key = encode (atom.x, atom.y, atom.z, atom.w);
        map[atom_key].numNeighbors = 0;
        for (let x=atom.x-1; x<=atom.x+1; x++) {
            for (let y=atom.y-1; y<=atom.y+1; y++) {
                for (let z=atom.z-1; z<=atom.z+1; z++) {
                    for (let w=atom.w-1; w<=atom.w+1; w++) {
                        let key = encode(x, y, z, w);
                        //console.log(key, map[key]);
                        if ((map[key] !== undefined) && (key !== atom_key) && (map[key].val === '#')) {
                            map[atom_key].numNeighbors++;
                        }
                    }
                }
            }
        }
    }
}

const countActive = (map) => {
    let numActive = 0;
    for([key, atom] of Object.entries(map)) {
        if (atom.val === '#') {
            numActive ++;
        }
    }
    return numActive;
}

const prettyPrint = (map, minX, maxX, minY, maxY, z, w) => {
    for (let x=minX; x<maxX; x++) {
        let buffer = "";
        for (let y=minY; y<maxY; y++) {
            let key = encode(x, y, z, w);
            buffer += map[key].val;
        }
        console.log(buffer);
    }
}

const prettyPrintNeighbors = (map, minX, maxX, minY, maxY, z, w) => {
    for (let x=minX; x<maxX; x++) {
        let buffer = "";
        for (let y=minY; y<maxY; y++) {
            let key = encode(x, y, z, w);
            buffer += map[key].numNeighbors.toString();
        }
        console.log(buffer);
    }
}

// insert bordering blanks
const expandBorder = (map, minX, maxX, minY, maxY, minZ, maxZ, minW, maxW) => {
    let numAtoms = 0;
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            for (let z = minZ; z < maxZ; z++) {
                for (let w = minW; w < maxW; w++) {
                    // console.log(`${x} ${y} ${z} ${w}`);
                    let key = encode(x, y, z, w);
                    if (map[key] === undefined) {
                        map[key] = {
                            x: x,
                            y: y,
                            z: z,
                            w: w,
                            val: '.'
                        }
                    }
                    numAtoms++;
                }
            }
        }
    }
    console.log(numAtoms);
}

const simulate = (map) => {
    let nextMap = {};
    for ([key, val] of Object.entries(map)) {
        if (val.val === '.') {
            // inactive
            nextMap[key] = {
                x: val.x,
                y: val.y,
                z: val.z,
                w: val.w,
                val: (val.numNeighbors === 3) ? "#" : "."
            }
        } else if (val.val === '#') {
            // active
            nextMap[key] = {
                x: val.x,
                y: val.y,
                z: val.z,
                w: val.w,
                val: ((val.numNeighbors === 2) || (val.numNeighbors === 3)) ? "#" : "."
            }
        } else {
            throw new Error(`unexpected value ${key} ${val}`);
        }
    }
    return nextMap;
}

let nextMap = {...map};

let startTime = new Date();

for (let round=0; round<6; round++) {
    console.log(`simulating cycle`, round+1);
    maxX += 1;
    maxY += 1;
    maxZ += 1;
    maxW += 1;
    minZ -= 1;
    minX -= 1;
    minY -= 1;
    minW -= 1;

    map = nextMap;
    expandBorder(map, minX, maxX, minY, maxY, minZ, maxZ, minW, maxW);
    countNeighbors(map);
    nextMap = simulate(map);
    console.log(`active ${countActive(nextMap)} after round ${round+1}`)
}

let endTime = new Date();
console.log(`elapsed time ${endTime - startTime} ms`);

// let w = 0;
// for (let z=minZ; z<maxZ; z++) {
//     console.log(`z ${z}`)
//     prettyPrint(nextMap, minX, maxX, minY, maxY, z, w);
// }


