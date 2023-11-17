// #############
// #...........#
// ###B#C#B#D###
//   #D#C#B#A#
//   #D#B#A#C#
//   #A#D#C#A#
//   #########

// 11 room hallway,  16 cave spaces,  number them as such
// the "a" cave is 11, 12, 13, 14
// the "b" cave is 15, 16, 17, 18
// the "c" cave is 19, 20, 21, 22
// the "b" cave is 23, 24, 25, 26


const adjacent = [
    [1],    // room 0
    [0, 2],  // room 1
    [1, 3, 11], // room 2, outside mini a cave
    [2, 4], // room 3
    [3, 5, 15], // room4, outside mini b cave
    [4, 6], // room 5
    [5, 7, 19], // room 6, outside c cave
    [6, 8], // room 7
    [7, 9, 23], // room 8, outside d cave
    [8, 10], // room 9
    [9], // room 10

    [2, 12], // room 11 cave
    [11, 13],  // room 12 cave
    [12, 14], // room 13 cave
    [13],  // room 14 cave

    [4, 16], // room 15 cave
    [15, 17],  // room 16 cave
    [16, 18], // 17 cave
    [17], // 18 cave

    [6, 20], // 19 cave
    [19, 21],  // 20 cave
    [20, 22],  // 21 cave
    [21, 23],  // 22 cave

    [8, 24],  // 23 cave
    [23, 25], // 24 cave
    [24, 26], // 25 cave
    [25],     // 26 cave
];

const defaultOccupancy = adjacent.map(location => false);

const isCaveEntrance = (room) => {
    return (room === 2 || room === 4 || room === 6 || room === 8);
}

const validDest = (start, nextRoom, occupancy, destIsOutside, myCrabType) => {
    const crabTypesMatch = (myCrabType, destCrabType) => {
        return (myCrabType === undefined) || myCrabType === destCrabType;
    }

    if (isCaveEntrance(nextRoom)) {
        return false;
    }
    if ((destIsOutside === false) && (nextRoom < 11)) {
        // can not go to an outside room
        return false;
    }
    if (nextRoom === 11) {
        return (occupancy[12] !== undefined) && (crabTypesMatch(occupancy[12], 'A'))
            && (occupancy[13] !== undefined) && (crabTypesMatch(occupancy[13], 'A'))
            && (occupancy[14] !== undefined) && (crabTypesMatch(occupancy[14], 'A'))
            && crabTypesMatch(myCrabType, 'A');
    } else if (nextRoom === 12) {
        return (occupancy[13] !== undefined) && (crabTypesMatch(occupancy[13], 'A'))
            && (occupancy[14] !== undefined) && (crabTypesMatch(occupancy[14], 'A'))
            && crabTypesMatch(myCrabType, 'A');
    } else if (nextRoom === 13) {
        return (occupancy[14] !== undefined) && (crabTypesMatch(occupancy[14], 'A'))
            && crabTypesMatch(myCrabType, 'A');
    } else if (nextRoom === 14) {
        return crabTypesMatch(myCrabType, 'A');
    } else if (nextRoom === 15) {
        return (occupancy[16] !== undefined) && (crabTypesMatch(occupancy[16], 'B'))
            && (occupancy[17] !== undefined) && (crabTypesMatch(occupancy[17], 'B'))
            && (occupancy[18] !== undefined) && (crabTypesMatch(occupancy[18], 'B'))
            && crabTypesMatch(myCrabType, 'B');
    } else if (nextRoom === 16) {
        return (occupancy[17] !== undefined) && (crabTypesMatch(occupancy[17], 'B'))
            && (occupancy[18] !== undefined) && (crabTypesMatch(occupancy[18], 'B'))
            && crabTypesMatch(myCrabType, 'B');
    } else if (nextRoom === 17) {
        return (occupancy[18] !== undefined) && (crabTypesMatch(occupancy[18], 'B'))
            && crabTypesMatch(myCrabType, 'B');
    } else if (nextRoom === 18) {
        return crabTypesMatch(myCrabType, 'B');
    } else if (nextRoom === 19) {
        return (occupancy[20] !== undefined) && (crabTypesMatch(occupancy[20], 'C'))
            && (occupancy[21] !== undefined) && (crabTypesMatch(occupancy[21], 'C'))
            && (occupancy[22] !== undefined) && (crabTypesMatch(occupancy[22], 'C'))
            && crabTypesMatch(myCrabType, 'C');
    } else if (nextRoom === 20) {
        return (occupancy[21] !== undefined) && (crabTypesMatch(occupancy[21], 'C'))
            && (occupancy[22] !== undefined) && (crabTypesMatch(occupancy[22], 'C'))
            && crabTypesMatch(myCrabType, 'C');
    } else if (nextRoom === 21) {
        return (occupancy[22] !== undefined) && (crabTypesMatch(occupancy[22], 'C'))
            && crabTypesMatch(myCrabType, 'C');
    } else if (nextRoom === 22) {
        return crabTypesMatch(myCrabType, 'C');
    } else if (nextRoom === 23) {
        return (occupancy[24] !== undefined) && (crabTypesMatch(occupancy[24], 'D'))
            && (occupancy[25] !== undefined) && (crabTypesMatch(occupancy[25], 'D'))
            && (occupancy[26] !== undefined) && (crabTypesMatch(occupancy[26], 'D'))
            && crabTypesMatch(myCrabType, 'D');
    } else if (nextRoom === 24) {
        return (occupancy[25] !== undefined) && (crabTypesMatch(occupancy[25], 'D'))
            && (occupancy[26] !== undefined) && (crabTypesMatch(occupancy[26], 'D'))
            && crabTypesMatch(myCrabType, 'D');
    } else if (nextRoom === 25) {
        return (occupancy[26] !== undefined) && (crabTypesMatch(occupancy[26], 'D'))
            && crabTypesMatch(myCrabType, 'D');
    } else if (nextRoom === 26) {
        return crabTypesMatch(myCrabType, 'D');
    }

    return true;
}

const findAllMoves = (start, visited, dests, distance, destIsOutside=true, myCrabType=undefined, verbose = false) => {
    let current = adjacent[start]
    if (verbose) {
        console.log(`in room ${start} adjacent ${current}`);
    }
    current.forEach(nextRoom => {
        if (visited[nextRoom] === undefined) {
            if (validDest(start, nextRoom, visited, destIsOutside, myCrabType)) {
                if (verbose) {
                    console.log(`found ${nextRoom} ${distance}`)
                }
                dests.push({dest: nextRoom, distance: distance+1});
            }

            // don't come back here in subpaths
            let nextVisited = {...visited}
            nextVisited[start] = 1;
            findAllMoves(nextRoom, nextVisited, dests, distance+1, destIsOutside, myCrabType, verbose);
        }
    });
}

const findCrabMoves = (crab, occupancy) => {
    if (crab.isHome === true) {
        // this one is done
        return [];
    }

    let moveOutside = (crab.movedOut === false);
    let crabMoves = [];
    // console.log(`finding moves.. ${crab.location}, ${moveOutside} ${crab.key}`);
    let verbose = false;
    findAllMoves(crab.location, occupancy, crabMoves, 0, moveOutside, crab.type, verbose);
    crabMoves = crabMoves.map(move => {
        return {
            ...move,
            key: crab.key,
        }
    });
    // console.log(`findCrabMoves ${crab.key}`)
    // console.log(`${JSON.stringify(crabMoves)}`);
    return crabMoves;
}

const findAllCrabMoves = (game) => {
    const allMoves = [];
    // figure all all possible moves for the crabs
    for (const [key, crab] of Object.entries(game.crabs)) {
        // compute the current occupancy
        let visited = {};
        for (const [key, c] of Object.entries(game.crabs)) {
            visited[c.location] = c.type;
        };
        let crabMoves = findCrabMoves(crab, visited);
        allMoves.push(...crabMoves);
    }
    return allMoves;
}

const initCrabs = (locations) => {
    let crabs = [
        {
            key: 'a',
            type: 'A',
            location: locations[0],
            movedOut: false,
            isHome: false,
            energy: 1,
        },
        {
            key: 'A',
            type: 'A',
            location: locations[1],
            movedOut: false,
            isHome: false,
            energy: 1,
        },
        {
            key: 'a1',
            type: 'A',
            location: locations[2],
            movedOut: false,
            isHome: false,
            energy: 1,
        },
        {
            key: 'A2',
            type: 'A',
            location: locations[3],
            movedOut: false,
            isHome: false,
            energy: 1,
        },
        {
            key: 'b',
            type: 'B',
            location: locations[4],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'B',
            type: 'B',
            location: locations[5],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'b1',
            type: 'B',
            location: locations[6],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'B2',
            type: 'B',
            location: locations[7],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'c',
            type: 'C',
            location: locations[8],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'C',
            type: 'C',
            location: locations[9],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'c1',
            type: 'C',
            location: locations[10],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'C1',
            type: 'C',
            location: locations[11],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'd',
            type: 'D',
            location: locations[12],
            movedOut: false,
            isHome: false,
            energy: 1000,
        },
        {
            key: 'D',
            type: 'D',
            location: locations[13],
            movedOut: false,
            isHome: false,
            energy: 1000,
        },
        {
            key: 'd1',
            type: 'D',
            location: locations[14],
            movedOut: false,
            isHome: false,
            energy: 1000,
        },
        {
            key: 'D1',
            type: 'D',
            location: locations[15],
            movedOut: false,
            isHome: false,
            energy: 1000,
        },
    ];

    // check for crabs that are already home
    // compute an occupancy map
    let occupancy = {}
    crabs.forEach(c => {
        // if any crabs are in locations < 11, these are outside
        if (c.location < 11) {
            c.movedOut = true;
        }
        occupancy[c.location] = c;
    });

    // mark each home cave
    let crab = occupancy[14];
    if((crab !== undefined) && (crab.type === 'A')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[13];
        if((crab !== undefined) && (crab.type === 'A')) {
            crab.isHome = true;
            crab.movedOut = true;
            crab = occupancy[12];
            if ((crab !== undefined) && (crab.type === 'A')) {
                crab.isHome = true;
                crab.movedOut = true;
                crab = occupancy[11];
                if ((crab !== undefined) && (crab.type === 'A')) {
                    crab.isHome = true;
                    crab.movedOut = true;
                }
            }
        }
    }

    crab = occupancy[18];
    if ((crab !== undefined) && (crab.type === 'B')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[17];
        if ((crab !== undefined) && (crab.type === 'B')) {
            crab.isHome = true;
            crab.movedOut = true;
            crab = occupancy[16]
            if ((crab !== undefined) && (crab.type === 'B')) {
                crab.isHome = true;
                crab.movedOut = true;
                crab = occupancy[15];
                if ((crab !== undefined) && (crab.type === 'B')) {
                    crab.isHome = true;
                    crab.movedOut = true;
                }
            }
        }
    }

    crab = occupancy[22];
    if ((crab !== undefined) && (crab.type === 'C')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[21];
        if ((crab !== undefined) && (crab.type === 'C')) {
            crab.isHome = true;
            crab.movedOut = true;
            crab = occupancy[20];
            if ((crab !== undefined) && (crab.type === 'C')) {
                crab.isHome = true;
                crab.movedOut = true;
                crab = occupancy[19];
                if ((crab !== undefined) && (crab.type === 'C')) {
                    crab.isHome = true;
                    crab.movedOut = true;
                }
            }
        }
    }

    crab = occupancy[26];
    if ((crab !== undefined) && (crab.type === 'D')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[25];
        if ((crab !== undefined) && (crab.type === 'D')) {
            crab.isHome = true;
            crab.movedOut = true;
            crab = occupancy[24];
            if ((crab !== undefined) && (crab.type === 'D')) {
                crab.isHome = true;
                crab.movedOut = true;
                crab = occupancy[23];
                if ((crab !== undefined) && (crab.type === 'D')) {
                    crab.isHome = true;
                    crab.movedOut = true;
                }
            }
        }
    }

    const crabMap = {};
    crabs.forEach(c => {
        crabMap[c.key] = c;
    })
    return crabMap;
}

const initGame = (locations) => {
    const game = {
        energy: 0,
        crabs: initCrabs(locations),
    }
    return game;
}

const copyGameState = (game) => {
    const newCrabs = {}
    for (const [key, crab] of Object.entries(game.crabs)) {
        newCrabs[key] = {
            ...crab
        }
    }
    const newGameState = {
        ...game,
        crabs: newCrabs,
    }
    return newGameState;
}

const isWinningState = (game) => {
    let result = true;
    for (const [key, val] of Object.entries(game.crabs)) {
        result = result && val.isHome;
    }
    return result;
}

const moveCrab = (game, move) => {
    const crab = game.crabs[move.key];
    // console.log(`moving crab ${JSON.stringify(crab)}`);
    crab.location = move.dest;
    if (crab.movedOut === false) {
        crab.movedOut = true;
    }
    if ((crab.type === 'A') && ((move.dest === 11) || (move.dest === 12) || (move.dest === 13) || (move.dest === 14))) {
        crab.isHome = true;
    }
    if ((crab.type === 'B') && ((move.dest === 15) || (move.dest === 16) || (move.dest === 17) || (move.dest === 18))) {
        crab.isHome = true;
    }
    if ((crab.type === 'C') && ((move.dest === 19) || (move.dest === 20) || (move.dest === 21) || (move.dest === 22))) {
        crab.isHome = true;
    }
    if ((crab.type === 'D') && ((move.dest === 23) || (move.dest === 24) || (move.dest === 25) || (move.dest === 26))) {
        crab.isHome = true;
    }
    game.energy += crab.energy * move.distance;
}

const prettyPrint = (crabs, byKey = false) => {
    let board = adjacent.map(loc => '.');
    for (const [key, val] of Object.entries(crabs)) {
        let crabLocation  = val.location;
        board[crabLocation] = byKey === true ? val.key : val.type;
    }
    console.log('#############');
    console.log(`#${board[0]}${board[1]}${board[2]}${board[3]}${board[4]}${board[5]}${board[6]}${board[7]}${board[8]}${board[9]}${board[10]}#`);
    console.log(`###${board[11]}#${board[15]}#${board[19]}#${board[23]}###`);
    console.log(`  #${board[12]}#${board[16]}#${board[20]}#${board[24]}#`);
    console.log(`  #${board[13]}#${board[17]}#${board[21]}#${board[25]}#`);
    console.log(`  #${board[14]}#${board[18]}#${board[22]}#${board[26]}#`);
    console.log(`  #########`);
}

const testFindAllMoves = () => {
    console.log('** test findAllMoves ***');
    let allMoves = [];
    let start = 7
    let visited = {}
    visited[start] = 1;
    findAllMoves(start, visited, allMoves, 0);
    console.log(`all possible moves from ${start}, ${JSON.stringify(allMoves)}`);
}


// Test data
// #############
// #...........#
// ###B#C#B#D###
//   #D#C#B#A#
//   #D#B#A#C#
//   #A#D#C#A#
//   #########
// const theLocs = [
//     14, 21, 24, 26,
//     11, 17, 19, 20,
//     15, 16, 22, 25,
//     12, 13, 18, 23,
//     ];

// Actual Data
// #############
// #...........#
// ###B#C#A#B###
//   #D#C#B#A#
//   #D#B#A#C#
//   #C#D#D#A#
//   #########
const theLocs = [
    19, 21, 24, 26,
    11, 17, 20, 23,
    14, 15, 16, 25,
    12, 13, 18, 22,
    ];

let initialCrabs = initCrabs(theLocs);
console.log(`*** Initial State ***`);
prettyPrint(initialCrabs);
console.log(JSON.stringify(initialCrabs));


const testFindAllMoves2 = () => {
    let crabs = initCrabs(theLocs);
    let allMoves = [];
    let visited = {};
    let start = 7;
    console.log('** testing findAllMoves with more pieces **')
    for (const [key, c] of Object.entries(crabs)) {
        visited[c.location] = c.type;
    };
    console.log(visited);
    findAllMoves(start, visited, allMoves, 0);
    console.log(`all possible moves from ${start}, ${JSON.stringify(allMoves)}`);
}

const testFindCrabMoves = () => {
    let crabs = initCrabs(theLocs);
    let crab = crabs['D']
    console.log(crab);
    let visited = {};
    for (const [key, c] of Object.entries(crabs)) {
        visited[c.location] = c.type;
    }
    let crabMoves = findCrabMoves(crab, visited);
    console.log(`crab ${crab.key} can move ${JSON.stringify(crabMoves)}`);
}

const playGame = (game, depth) => {
    if ((globals.minEnergy !== undefined) && (game.energy > globals.minEnergy)) {
        // early return
        // console.log(`${game.energy} energy surpassed previous min ${globals.minEnergy}.. abandoning`);
        // forceGC();
        return;
    }

    if (isWinningState(game)) {
        globals.numSolutions ++;
        console.log(`** Found winning state ** ${game.energy} ${globals.minEnergy} ${globals.numSolutions}`);
        if ((globals.minEnergy === undefined) || (game.energy < globals.minEnergy)) {
            globals.minEnergy = game.energy;
        }
        if (globals.numSolutions % 50 === 0) {
            forceGC();
        }
        return;
    }

    const allMoves = findAllCrabMoves(game);

    if (allMoves.length === 0) {
        // console.log(`** OUTTA moves **`);
        // console.log(JSON.stringify(game));
        // console.log(`*****************`);
        return;
    }

    // console.log(`all moves for depth ${depth}:`)
    // allMoves.forEach(m => {
    //     console.log(JSON.stringify(m));
    // });
    // console.log(JSON.stringify(game));
    // console.log("");

    allMoves.forEach(m => {
        // console.log(`making move for depth ${depth}.. ${JSON.stringify(m)}`);
        let nextState = copyGameState(game);
        moveCrab(nextState, m);
        // console.log(JSON.stringify(nextState.crabs));
        // prettyPrint(nextState.crabs, false);
        playGame(nextState, depth+1);
        nextState.crabs = undefined;
        nextState = undefined;
    })
}

let globals = {};

const testGame = () => {
    globals = {}
    globals.numSolutions = 0;
    const game = initGame(theLocs);
    // moveCrab(game, {
    //     key: 'a',
    //     dest: 1,
    //     distance: 6,
    // });

    prettyPrint(game.crabs);
    playGame(game, 0);
    console.log(`*** min energy ${globals.minEnergy}`);
}

const debugGame = () => {
    const game = initGame(theLocs);

    const allMoves = findAllCrabMoves(game);

    console.log(`all moves:`)
    allMoves.forEach(m => {
        console.log(JSON.stringify(m));
    });

}

function forceGC() {
    if (global.gc) {
        global.gc();
    } else {
        console.warn('No GC hook! Start your program as `node --expose-gc file.js`.');
    }
}

testGame();
// debugGame();