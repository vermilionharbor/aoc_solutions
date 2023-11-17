const fs = require('fs');

const getCommands = (file) => {
    const lines = fs.readFileSync(file).toString().split('\n');

    let commands = [];
    lines.forEach(l => {
        const op = l.split(' ');
        const params = op[1].split(',')
        const x_params = params[0].slice(2).split('..');
        const y_params = params[1].slice(2).split('..');
        const z_params = params[2].slice(2).split('..');

        const command = {
            op: op[0],
            xMin: parseInt(x_params[0], 10),
            xMax: parseInt(x_params[1], 10),
            yMin: parseInt(y_params[0], 10),
            yMax: parseInt(y_params[1], 10),
            zMin: parseInt(z_params[0], 10),
            zMax: parseInt(z_params[1], 10),
        }
        commands.push(command);
    });
    return commands;
}

const indexToKey = (x, y, z) => {
    return `${x}_${y}_${z}`;
}

const doPart1 = (commands) => {
    const reactor = {}
    commands.forEach(c => {
        let volume = (c.xMax - c.xMin) * (c.yMax - c.yMin) * (c.zMax - c.zMin);
        console.log(`${c.op} ${c.xMin}..${c.xMax} ${c.yMin}..${c.yMax} ${c.zMin}..${c.zMax} ${volume}`);
        let i, j, k;

        let xMin = c.xMin < -50 ? -50 : c.xMin;
        let xMax = c.xMax > 50 ? 50 : c.xMax;
        let yMin = c.yMin < -50 ? -50 : c.yMin;
        let yMax = c.yMax > 50 ? 50 : c.yMax;
        let zMin = c.zMin < -50 ? -50 : c.zMin;
        let zMax = c.zMax > 50 ? 50 : c.zMax;
        for (i = xMin; i <= xMax; i++) {
            for (j = yMin; j <= yMax; j++) {
                for (k = zMin; k <= zMax; k++) {
                    const key = indexToKey(i, j, k);
                    if (c.op === 'on') {
                        reactor[key] = 1;
                    } else if (c.op === 'off') {
                        if (reactor[key] !== undefined) {
                            delete reactor[key];
                        }
                    }
                }
            }
        }
    });

    console.log(`total cubes ${Object.keys(reactor).length}`);
}

const intersect = (a, b) => {
    return (a.xMin <= b.xMax && a.xMax >= b.xMin) &&
        (a.yMin <= b.yMax && a.yMax >= b.yMin) &&
        (a.zMin <= b.zMax && a.zMax >= b.zMin);
}

const findRanges2 = (aMin, aMax, bMin, bMax) => {
    let valMap = {}
    // insert them in a map to eliminate dupes
    valMap[aMin] = 1;
    valMap[aMax] = 1;
    valMap[bMin] = 1;
    valMap[bMax] = 1;

    // extract the values to an array and sort them
    let valArray = Object.keys(valMap).map(v => parseInt(v, 10)).sort((a,b) => (a-b));

    // find aMin
    let indexMin = valArray.indexOf(aMin);
    let indexMax = valArray.indexOf(aMax);
    let i;
    let curMin = valArray[indexMin];
    let ranges = [];
    for (i=indexMin+1; i<=indexMax; i++) {
        ranges.push({
            min: curMin,
            max: valArray[i],
        })
        // console.log(`${curMin} ${valArray[i]}`);
        curMin = valArray[i];
    }

    return ranges;
}

const findRanges = (aMin, aMax, bMin, bMax) => {
    let ranges = [];
    if (aMin >= bMin) {
        if (aMax <= bMax) {
            // bmin amin amax bmax
            ranges.push({
                min: aMin,
                max: aMax,
            });
        } else {
            // bmin amin bmax amax
            ranges.push({
                min: aMin,
                max: bMax,
            }, {
                min: bMax+1,
                max: aMax,
            });
        }
    } else {
        // aMin < bMin
        if (aMax <= bMax) {
            // amin bmin amax bmax
            ranges.push({
                min: aMin,
                max: bMin-1,
            }, {
                min: bMin,
                max: aMax,
            })
        } else {
            // amin bmin bmax amax
            ranges.push({
                min: aMin,
                max: bMin-1,
            }, {
                min: bMin,
                max: bMax,
            }, {
                min: bMax+1,
                max: aMax
            })
        }
    }

    return ranges;
}

const testIntersection = () => {
    const lit = [];
    commands.forEach(c => {
        console.log(`cube ${JSON.stringify(c)}`)
        if (c.op === 'on') {
            let onCube = {...c}
            lit.forEach(l => {
                const testVal = intersect(l, onCube);
                if (testVal) {
                    console.log(`    it intersects ${JSON.stringify(l)}`);
                } else {
                    console.log(`    we got ${testVal}`);
                }
            })
            lit.push(onCube);
        } else {
            let offCube = {...c}
            lit.forEach(l => {
                const testVal = intersect(l, offCube);
                if (testVal) {
                    console.log(`    it intersects ${JSON.stringify(l)}`);
                } else {
                    console.log(`    we got ${testVal}`);
                }
            })
        }
    });
}

const findSubCubes = (a, b) => {
    // find subCubes of A that are divided by B, A and B must intersect

    let xRanges = findRanges(a.xMin, a.xMax, b.xMin, b.xMax);
    let yRanges = findRanges(a.yMin, a.yMax, b.yMin, b.yMax);
    let zRanges = findRanges(a.zMin, a.zMax, b.zMin, b.zMax);

    const subCubes = [];
    xRanges.forEach(xR => {
        yRanges.forEach(yR => {
            zRanges.forEach(zR => {
                subCubes.push({
                    xMin: xR.min,
                    xMax: xR.max,
                    yMin: yR.min,
                    yMax: yR.max,
                    zMin: zR.min,
                    zMax: zR.max,
                })
            })
        })
    });

    return subCubes;
}


const testFindSubCubes = () => {
    const a = {"op":"on","xMin":-20,"xMax":33,"yMin":-21,"yMax":23,"zMin":-26,"zMax":28}
    const b = {"op":"on","xMin":-20,"xMax":26,"yMin":-36,"yMax":17,"zMin":-47,"zMax":7}

    console.log(`a ${JSON.stringify(a)}`)
    console.log(`b ${JSON.stringify(b)}`)

    let xRanges = findRanges(a.xMin, a.xMax, b.xMin, b.xMax);
    let yRanges = findRanges(a.yMin, a.yMax, b.yMin, b.yMax);
    let zRanges = findRanges(a.zMin, a.zMax, b.zMin, b.zMax);

    const subCubes = [];
    xRanges.forEach(xR => {
        yRanges.forEach(yR => {
            zRanges.forEach(zR => {
                subCubes.push({
                    xMin: xR.min,
                    xMax: xR.max,
                    yMin: yR.min,
                    yMax: yR.max,
                    zMin: zR.min,
                    zMax: zR.max,
                })
            })
        })
    });

    subCubes.forEach(s => {
        console.log(JSON.stringify(s));
        let doesIntersect = intersect(s, b);
        if (doesIntersect) {
            console.log('it intersects B');
        } else {
            console.log('it does not intersect B');
        }
    })
}


// testFindSubCubes();
const getVolume = (cube) => {
    return (cube.xMax - cube.xMin + 1) * (cube.yMax - cube.yMin + 1) * (cube.zMax - cube.zMin + 1);
}

const insertOnCubeGeneral = (filter) => (list, cube, verbose=false) => {
    const nextList = [];

    let i;
    for (i=0; i<list.length; i++) {
        let currentCube = list[i];
        if (intersect(currentCube, cube)) {
            // found intersecting cubes
            let subCubes = findSubCubes(currentCube, cube);
            let numInserted = 0;
            // insert all subcubes which do not intersect into the next list
            subCubes.forEach(sc => {
                if (!intersect(sc, cube)) {
                    nextList.push(sc);
                    numInserted++;
                }
            });
            if (verbose === true) {
                console.log(`found ${subCubes.length} sub Cubes, inserting ${numInserted}`);
            }
            if (subCubes.length - numInserted > 1) {
                console.log(`*** unexpected failure, too many intersecting sub-cubes ****`);
            }
        } else {
            // just insert the cube
            nextList.push(currentCube);
            if (verbose === true) {
                console.log(`inserting non-overlapping cube`);
            }
        }
    }

    if (filter === false) {
        // the cube joins last, so each piece is only counted once
        nextList.push(cube);
        if (verbose === true) {
            console.log(`adding the final cube`);
        }
    } else {
        if (verbose === true) {
            console.log(`omitting the last cube`)
        }
    }

    return nextList;
}

const insertOnCube = insertOnCubeGeneral(false);
const filterOffCube = insertOnCubeGeneral(true);

const commandToCube = (command) => {
    let cube = {
        ...command,
    }
    delete cube.op;
    return cube;
}

const getVolumeSum = (list) => {
    let volumes = list.map(c => getVolume(c));
    let volumeSum = volumes.reduce((acc, val) => {
        return acc + val;
    }, 0);
    return volumeSum;
}

const testInsertOnCube = () => {
    let onCubes = [];
    let verbose = false;
    let volume;
    let volumeSum;
    let totalVolumeSeen = 0;
    const commands = getCommands('input.txt');
    commands.forEach(c => {
        console.log(`${c.op} ${c.xMin}..${c.xMax} ${c.yMin}..${c.yMax} ${c.zMin}..${c.zMax}`);
        if (c.op === 'on') {
            let cube = commandToCube(c);
            volume = getVolume(cube);
            totalVolumeSeen += volume;
            console.log(`found on cube of volume ${volume}`);
            onCubes = insertOnCube(onCubes, commandToCube(c), verbose);
        } else if (c.op === 'off') {
            console.log(`found off cube of volume ${volume}`);
            onCubes = filterOffCube(onCubes, commandToCube(c), verbose);
        }
        volumeSum = getVolumeSum(onCubes);
        console.log(`list volume ${volumeSum}`);
    })

    volumeSum = getVolumeSum(onCubes);
    console.log(`total cubes inserted ${onCubes.length}, total volume ${volumeSum}, total seen ${totalVolumeSeen}`);
}

testInsertOnCube();



