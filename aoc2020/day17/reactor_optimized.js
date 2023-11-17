const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

const encode = (x, y, z) => {
    return `${x}_${y}_${z}`;
}

const decode = (hash) => {
    let terms = hash.split("_");
    return [terms[0]*1, terms[1]*1, terms[2]*1];
}

let map = {};
let x = 0;
let width = 0;
let height;
lines.forEach(l => {
    // console.log(l);
    width = l.length;
    let z = 0;
    for (let y=0; y<width; y++) {
        // console.log(`${r} ${c} ${l[c]}`);
        // console.log(`${r}_${c}_0`);
        if (l[y] === "#") {
            console.log(encode(x, y, z), l[y]);
            map[encode(x, y, z)] = {
                x: x,
                y: y,
                z: z,
                val: l[y]
            };
        }
    }
    x++;
})
height = x;

console.log(width, height);
console.log(map);

let minX = 0;
let minY = 0;
let minZ = 0;
let depth = 1;

// next rouund
let maxX = height;
let maxY = width;
let maxZ = depth;

const countNeighbors = (map) => {
    // for each atom count the neighbors
    for ([key, atom] of Object.entries(map)) {
        let atom_key = encode (atom.x, atom.y, atom.z);
        map[atom_key].numNeighbors = 0;
        for (let x=atom.x-1; x<=atom.x+1; x++) {
            for (let y=atom.y-1; y<=atom.y+1; y++) {
                for (let z=atom.z-1; z<=atom.z+1; z++) {
                    let key = encode(x, y, z);
                    //console.log(key, map[key]);
                    if ((map[key] !== undefined) && (key !== atom_key) && (map[key].val === '#')) {
                        map[atom_key].numNeighbors ++;
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

const prettyPrint = (map, minX, maxX, minY, maxY, z) => {
    for (let x=minX; x<maxX; x++) {
        let buffer = "";
        for (let y=minY; y<maxY; y++) {
            let key = encode(x, y, z);
            buffer += map[key].val;
        }
        console.log(buffer);
    }
}

const prettyPrintNeighbors = (map, minX, maxX, minY, maxY, z) => {
    for (let x=minX; x<maxX; x++) {
        let buffer = "";
        for (let y=minY; y<maxY; y++) {
            let key = encode(x, y, z);
            buffer += map[key].numNeighbors.toString();
        }
        console.log(buffer);
    }
}

// insert bordering blanks
const expandBorder = (map, minX, maxX, minY, maxY, minZ, maxZ) => {
    let numAtoms = 0;
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            for (let z = minZ; z < maxZ; z++) {
                // console.log(`${x} ${y} ${z}`);
                let key = encode(x, y, z);
                if (map[key] === undefined) {
                    map[key] = {
                        x: x,
                        y: y,
                        z: z,
                        val: '.'
                    }
                }
                numAtoms++;
            }
        }
    }
    // console.log(numAtoms);
}

const expandBorder2 = (map) => {
    for ([key, val] of Object.entries(map)) {
        [originx, originy, originz] = decode(key);
        // console.log(`${originx} ${originy} ${originz}`);
        for (let x=originx-1; x<=originx+1; x++) {
            for (let y=originy-1; y<=originy+1; y++) {
                for (let z=originz-1; z<=originz+1; z++) {
                    let key = encode(x, y, z);
                    if (map[key] === undefined) {
                        map[key] = {
                            x: x,
                            y: y,
                            z: z,
                            val: '.'
                        }
                    }
                }
            }
        }
    }
}

const prunedMap = (map) => {
    let nextMap = {};
    for ([key, val] of Object.entries(map)) {
        if (val.val === '#') {
            nextMap[key] = {
                x: val.x,
                y: val.y,
                z: val.z,
                val: val.val
            };
        }
    }
    return nextMap;
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
                val: (val.numNeighbors === 3) ? "#" : "."
            }
        } else if (val.val === '#') {
            // active
            nextMap[key] = {
                x: val.x,
                y: val.y,
                z: val.z,
                val: ((val.numNeighbors === 2) || (val.numNeighbors === 3)) ? "#" : "."
            }
        } else {
            throw new Error(`unexpected value ${key} ${val}`);
        }
    }
    return nextMap;
}

let nextMap = {...map};

for (let round=0; round<6; round++) {
    console.log(`simulating cycle`, round+1);
    // map = nextMap;
    // expandBorder(map, minX, maxX, minY, maxY, minZ, maxZ);
    // countNeighbors(map);
    // nextMap = simulate(map, minX, maxX, minY, maxY, minZ, maxZ);
    // console.log(`active ${countActive(nextMap)} after round ${round+1}`)

    map = nextMap;
    console.log("expanding border2");
    expandBorder2(map);
    console.log("counting neighbors");
    countNeighbors(map);
    console.log("simulating");
    nextMap = simulate(map);
    console.log("pruning");
    nextMap = prunedMap(nextMap);
    console.log(`active ${countActive(nextMap)} after round ${round+1}`)
}
//
// for (let z=minZ; z<maxZ; z++) {
//     console.log(`z ${z}`)
//     prettyPrint(nextMap, minX, maxX, minY, maxY, z);
// }


