const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

const indexToString = (y, x) => {
    return `${y}_${x}`
}

const height = lines.length;
const width = lines[0].length;
let totalFlashers = 0;

const prettyPrint = cave => {
    let x, y;
    for (y=0; y<height; y++) {
        let lineBuffer = '';
        for (x=0; x<width; x++) {
            const key = indexToString(y, x);
            lineBuffer += cave[key].val;
        }
        console.log(lineBuffer);
    }
}

const initCave = () => {
    const cave = {}
    lines.forEach((l, lineIndex) => {
        let i;
        for (i=0; i<l.length; i++) {
            const val = parseInt(l[i], 10);
            const key = indexToString(lineIndex, i)
            // console.log(val);
            cave[key] = {
                y: lineIndex,
                x: i,
                val: val,
            }
        }
    //    console.log(l);
    });
    return cave;
}

let cave = initCave();

const ageOneStep = (cave) => {
    const nextCave = {}
    for (const [key, val] of Object.entries(cave)) {
        nextCave[key] = {
            ...val,
            val: val.val + 1
        }
    }
    return nextCave;
}

const simulateFlash = (octopus, flashers, cave, flashMap) => {
    let x = octopus.x;
    let y = octopus.y;
    let numFlashers = 1;
    // top left
    if ((x > 0) && (y > 0)) {
        const key = indexToString(y-1, x-1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // top
    if (y > 0) {
        const key = indexToString(y-1, x);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // top right
    if ((x < width-1) && (y>0)) {
        const key = indexToString(y-1, x+1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // left
    if (x > 0) {
        const key = indexToString(y, x-1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // right
    if (x < width-1) {
        const key = indexToString(y, x+1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // bottom left
    if ((y < height-1) && (x > 0)) {
        const key = indexToString(y+1, x-1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // bottom
    if (y < height-1) {
        const key = indexToString(y+1, x);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    // bottom right
    if ((y < height-1) && (x < width-1)) {
        const key = indexToString(y+1, x+1);
        const val = cave[key];
        val.val ++;
        if ((val.val > 9) && (flashMap[key] === undefined)) {
            flashMap[key] = val;
            numFlashers += simulateFlash(val, flashers, cave, flashMap);
        }
    }

    return numFlashers;
}

const clampValues = (cave) => {
    for (const [key, val] of Object.entries(cave)) {
        if (val.val > 9) {
            val.val = 0;
        }
    }
}

const simulateOneStep = (cave) => {
    const flashers = []
    const aged = ageOneStep(cave);
    let numFlashers = 0;
    const flashMap = {}
    for (const [key, val] of Object.entries(aged)) {
        if (val.val > 9) {
            flashers.push(val)
        }
    }

    while (flashers.length > 0) {
        const octopus = flashers.pop();
        const key = indexToString(octopus.y, octopus.x);
        if (flashMap[key] === undefined) {
            // console.log(`flashing ${key}`)
            flashMap[key] = octopus;
            numFlashers += simulateFlash(octopus, flashers, aged, flashMap);
        }

        // console.log(`flashers ${flashers.length} numFlashers ${numFlashers}`);
    }
    totalFlashers += numFlashers;
    console.log(`numFlashers ${numFlashers}`);

    return aged;
}

const checkAllFlash = (cave) => {
    for (const [key, val] of Object.entries(cave)) {
        if (val.val !== 0) {
            return false;
        }
    }
    return true;
}

// console.log(cave);
prettyPrint(cave);
//console.log('next day');
//prettyPrint(ageOneStep(cave));

let step = 0;

totalFlashers = 0;
while (step < 100) {
    console.log(`aging..${step}`);
    const aged = simulateOneStep(cave);
    clampValues(aged);
    prettyPrint(aged);
    cave = aged;
    step ++;
}

console.log(`total flashers ${totalFlashers}`)

//cave = initCave();
//
//step  = 0;
//let allZeros = false;
//while (allZeros !== true) {
//    const aged = simulateOneStep(cave);
//    clampValues(aged);
//    prettyPrint(aged);
//    cave = aged;
//    step ++;
//    allZeros = checkAllFlash(cave);
//}
//
//console.log(`synchronized after step ${step}`)