// #############
// #...........#
// ###B#C#A#B###
//   #C#D#D#A#
//   #########

// 11 room hallway,  8 cave spaces,  number them as such
// the "a" cave is 11, 12
// the "b" cave is 13, 14, ...
// #############
// #0123456789.#
// ###B#C#A#B###
//   #C#D#D#A#
//   #########

const adjacent = [
    [1],    // room 0
    [0, 2],  // room 1
    [1, 3, 11], // room 2, outside mini a cave
    [2, 4], // room 3
    [3, 5, 13], // room4, outside mini b cave
    [4, 6], // room 5
    [5, 7, 15], // room 6, outside c cave
    [6, 8], // room 7
    [7, 9, 17], // room 8, outside d cave
    [8, 10], // room 9
    [9], // room 10
    [2, 12], // room 11 cave
    [11],  // room 12 cave
    [4, 14], // room 13 cave
    [13],  // room 14 cave
    [6, 16], // 15 cave
    [15], // 16 cave
    [8, 18], // 17 cave
    [17],  // 18 cave
];

const defaultOccupancy = adjacent.map(location => false);

const isCaveEntrance = (room) => {
    return (room === 2 || room === 4 || room === 6 || room === 8);
}

const validDest = (start, nextRoom, occupancy, destIsOutside, myCrabType) => {
    const crabTypesMatch = (myCrabType, destCrabType) => {
        if (myCrabType === undefined) {
            return true;
        }
        return myCrabType === destCrabType;
    }
    if (isCaveEntrance(nextRoom)) {
        return false;
    }
    if ((destIsOutside === false) && (nextRoom < 11)) {
        // can not go to an outside room
        return false;
    }
    if (nextRoom === 11) {
        return (start !== 12 && occupancy[12] !== undefined) && (crabTypesMatch(occupancy[12], 'A') && crabTypesMatch(myCrabType, 'A'));
    } else if (nextRoom === 13) {
        return (start !== 14 && occupancy[14] !== undefined) && (crabTypesMatch(occupancy[14], 'B') && crabTypesMatch(myCrabType, 'B'));
    } else if (nextRoom === 15) {
        return (start !== 16 && occupancy[16] !== undefined) && (crabTypesMatch(occupancy[16], 'C') && crabTypesMatch(myCrabType, 'C'));
    } else if (nextRoom === 17) {
        return (start !== 18 && occupancy[18] !== undefined)  && (crabTypesMatch(occupancy[18], 'D') && crabTypesMatch(myCrabType, 'D'));
    } else if (nextRoom == 12) {
        return crabTypesMatch(myCrabType, 'A');
    } else if (nextRoom === 14) {
        return crabTypesMatch(myCrabType, 'B');
    } else if (nextRoom === 16) {
        return crabTypesMatch(myCrabType, 'C');
    } else if (nextRoom === 18) {
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
            key: 'b',
            type: 'B',
            location: locations[2],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'B',
            type: 'B',
            location: locations[3],
            movedOut: false,
            isHome: false,
            energy: 10,
        },
        {
            key: 'c',
            type: 'C',
            location: locations[4],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'C',
            type: 'C',
            location: locations[5],
            movedOut: false,
            isHome: false,
            energy: 100,
        },
        {
            key: 'd',
            type: 'D',
            location: locations[6],
            movedOut: false,
            isHome: false,
            energy: 1000,
        },
        {
            key: 'D',
            type: 'D',
            location: locations[7],
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
    let crab = occupancy[12];
    if ((crab !== undefined) && (crab.type === 'A')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[11];
        if ((crab !== undefined) && (crab.type === 'A')) {
            crab.isHome = true;
            crab.movedOut = true;
        }
    }

    crab = occupancy[14];
    if ((crab !== undefined) && (crab.type === 'B')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[13];
        if ((crab !== undefined) && (crab.type === 'B')) {
            crab.isHome = true;
            crab.movedOut = true;
        }
    }

    crab = occupancy[16];
    if ((crab !== undefined) && (crab.type === 'C')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[15];
        if ((crab !== undefined) && (crab.type === 'C')) {
            crab.isHome = true;
            crab.movedOut = true;
        }
    }

    crab = occupancy[18];
    if ((crab !== undefined) && (crab.type === 'D')) {
        crab.isHome = true;
        crab.movedOut = true;
        crab = occupancy[17];
        if ((crab !== undefined) && (crab.type === 'D')) {
            crab.isHome = true;
            crab.movedOut = true;
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
    if ((crab.type === 'A') && ((move.dest === 11) || (move.dest === 12))) {
        crab.isHome = true;
    }
    if ((crab.type === 'B') && ((move.dest === 13) || (move.dest === 14))) {
        crab.isHome = true;
    }
    if ((crab.type === 'C') && ((move.dest === 15) || (move.dest === 16))) {
        crab.isHome = true;
    }
    if ((crab.type === 'D') && ((move.dest === 17) || (move.dest === 18))) {
        crab.isHome = true;
    }
    game.energy += crab.energy * move.distance;
}

const prettyPrint = (crabs, byKey = true) => {
    let board = adjacent.map(loc => '.');
    for (const [key, val] of Object.entries(crabs)) {
        let crabLocation  = val.location;
        board[crabLocation] = byKey === true ? val.key : val.type;
    }
    console.log('#############');
    console.log(`#${board[0]}${board[1]}${board[2]}${board[3]}${board[4]}${board[5]}${board[6]}${board[7]}${board[8]}${board[9]}${board[10]}#`);
    console.log(`###${board[11]}#${board[13]}#${board[15]}#${board[17]}###`);
    console.log(`  #${board[12]}#${board[14]}#${board[16]}#${board[18]}#`);
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

// const theLocs = [12, 18, 11, 3, 16, 13, 14, 17];

// #############
// #.b.B...D...#
// ###.#.#C#.###
//   #a#d#c#A#
//   #########
// const theLocs = [12, 18, 1, 3, 16, 13, 14, 7];

// #############
// #.b.B.C.D.A.#
// ###.#.#.#.###
//   #a#d#c#.#
//   #########
// const theLocs = [12, 9, 1, 3, 16, 5, 14, 7];

// #############
// #.b.B.......#
// ###.#.#C#D###
//   #a#d#c#A#
//   #########
// const theLocs = [12, 18, 1, 3, 16, 15, 14, 17];

// #############
// #...........#
// ###B#C#B#D###
//   #A#D#C#A#
//   #########
// const theLocs = [12, 18, 11, 15, 16, 13, 14, 17];

// actual input
// #############
// #...........#
// ###B#C#A#B###
//   #C#D#D#A#
//   #########
const theLocs = [15, 18, 11, 17, 12, 13, 14, 16];

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
        // prettyPrint(nextState.crabs, true);
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
    //     key: 'D',
    //     dest: 9,
    //     distance: 2,
    // });
    moveCrab(game, {
        key: 'a',
        dest: 1,
        distance: 6,
    });
    moveCrab(game, {
        key: 'B',
        dest: 3,
        distance: 6,
    });
    moveCrab(game, {
        key: 'A',
        dest: 9,
        distance: 3,
    });
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