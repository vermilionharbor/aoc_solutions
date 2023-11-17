const fs = require('fs');


const indexToString = (x, y) => {
    return `${x}_${y}`;
}

const readData = (file) => {
    const lines = fs.readFileSync(file).toString().split('\n');

    let world = {}
    world.height = lines.length;
    world.width = lines[0].length;
    world.easties = [];
    world.southies = [];
    world.board = {}
    let board = world.board;
    lines.forEach((l, index) => {
        let i;
        let key;
        for (i=0; i<l.length; i++) {
            if (l[i] === 'v') {
                let cucumber = {
                    face: 'south',
                    x: i,
                    y: index,
                }
                key = indexToString(i, index);
                board[key] = cucumber;
                world.southies.push(cucumber);
            } else if (l[i] === '>') {
                let cucumber = {
                    face: 'east',
                    x: i,
                    y: index,
                }
                key = indexToString(i, index);
                board[key] = cucumber;
                world.easties.push(cucumber);
            }
        }
    });
    return world;
}

const prettyPrint = (world) => {
    let i,j;
    const board = world.board;
    for (j=0; j<world.height; j++) {
        let lineBuffer = '';
        for (i=0; i<world.width; i++) {
            const key = indexToString(i, j);
            if (board[key] !== undefined) {
                const cucumber  = board[key];
                if (cucumber.face === 'east') {
                    lineBuffer += '>';
                } else if (cucumber.face === 'south') {
                    lineBuffer += 'v';
                }
            } else {
                lineBuffer += '.';
            }
        }
        console.log(lineBuffer);
    }
}

const moveCucumbers = (world) => {
    let nextBoard = {}
    let numMoved = 0;
    let nextEasties = []
    let nextSouthies = [];

    world.easties.forEach(cucumber => {
        let nextX, nextY;
        nextX = (cucumber.x + 1) % world.width;
        nextY = cucumber.y;
        let key = indexToString(nextX, nextY);
        let replicated = {
            ...cucumber,
        }
        if (world.board[key] === undefined) {
            // the location is empty
            numMoved++;
            replicated.x = nextX;
        } else {
            // it's occupied
            replicated.x = cucumber.x
        }
        nextEasties.push(replicated);
        key = indexToString(replicated.x, replicated.y);
        nextBoard[key] = replicated;
    });

    // make a temporary board with all the easties that moved, and all the southies that did not
    let tempBoard = {...nextBoard};
    world.southies.forEach(cucumber => {
        const key = indexToString(cucumber.x, cucumber.y);
        tempBoard[key] = cucumber;
    })

    world.southies.forEach(cucumber => {
        let nextX, nextY;
        nextX = cucumber.x;
        nextY = (cucumber.y + 1) % world.height;
        let key = indexToString(nextX, nextY);
        let replicated = {
            ...cucumber,
        }
        // this time test against tempBoard
        if (tempBoard[key] === undefined) {
            // the location is empty
            numMoved++;
            replicated.y = nextY;
        } else {
            // it's occupied
            replicated.y = cucumber.y
        }
        nextSouthies.push(replicated);
        key = indexToString(replicated.x, replicated.y);
        nextBoard[key] = replicated;
    });

    return [{
        width: world.width,
        height: world.height,
        southies: nextSouthies,
        easties: nextEasties,
        board: nextBoard,
    }, numMoved];
}


const testUtils = () => {
    const world = readData('testinput.txt');
    console.log(`world is ${world.width} x ${world.height}`);
    prettyPrint(world);

    console.log("");
    console.log("moving step 1...");
    let [nextWorld, numMoved] = moveCucumbers(world);
    console.log(`numMoved ${numMoved}`);
    prettyPrint(nextWorld);
}

const solvePart1 = () => {
    const world = readData('input.txt');
    console.log('initial state')
    prettyPrint(world);
    console.log("");

    let numMoved;
    let nextWorld = world;
    let i = 1;
    do {
        [nextWorld, numMoved] = moveCucumbers(nextWorld);
        console.log(`after ${i} step,  ${numMoved} cucumbers moved..`)
        prettyPrint(nextWorld);
        console.log("");
        i++;
    } while (numMoved > 0);
}

// testUtils();
solvePart1();