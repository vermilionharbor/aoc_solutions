const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const indexToString = (r, c) => {
    return `${r}_${c}`;
}

const keyToIndex = (key) => {
    const terms = key.split('_');
    return [parseInt(terms[0], 10), parseInt(terms[1], 10)];
}

const getWorldMap = () => {
    let worldMap = {};
    lines.forEach((l, row) => {
        let c;
        for (c = 0; c < l.length; c++) {
            // look at each element
            if (lines[row][c] === '#') {
                worldMap[indexToString(row, c)] = {
                    r: row,
                    c: c,
                };
            }
        }
    });

    console.log(`found ${Object.keys(worldMap).length} elves.`);
    return worldMap;
}

const findProposedLocation = (elf, worldMap, round) => {
    // 0 north
    // 1 south
    // 2 west
    // 3 east

    // test the 8 points to see if there are neighbors
    const nw = indexToString(elf.r-1, elf.c-1);
    const n = indexToString(elf.r-1, elf.c);
    const ne = indexToString(elf.r-1, elf.c+1);
    const w = indexToString(elf.r, elf.c-1);
    const e = indexToString(elf.r, elf.c+1);
    const sw = indexToString(elf.r+1, elf.c-1);
    const s = indexToString(elf.r+1, elf.c);
    const se = indexToString(elf.r+1, elf.c+1);

    const noneToNorth = (worldMap[nw] === undefined) && (worldMap[n] === undefined) && (worldMap[ne] === undefined);
    const noneToSouth = (worldMap[sw] === undefined) && (worldMap[s] === undefined) && (worldMap[se] === undefined);
    if (noneToNorth
        && (worldMap[e] === undefined) && (worldMap[w] === undefined)
        && noneToSouth)
    {
        // console.log(`no neighbors`);
        return;
    }

    const roundIndex = round % 4;
    let i = 0;
    while (i < 4) {
        const direction = (roundIndex + i) % 4;
        if (direction === 0) {
            if (noneToNorth) {
                // console.log(`propose north`);
                return {
                    r: elf.r-1,
                    c: elf.c
                }
            }
        } else if (direction === 1) {
            if (noneToSouth) {
                // console.log(`propose south`);
                return {
                    r: elf.r+1,
                    c: elf.c
                }
            }
        } else if (direction == 2) {
            const noneToWest = (worldMap[nw] === undefined) && (worldMap[w] === undefined) && (worldMap[sw] === undefined);
            if (noneToWest) {
                // console.log(`propose west`);
                return {
                    r: elf.r,
                    c: elf.c-1
                }
            }
        } else if (direction == 3) {
            const noneToEast = (worldMap[ne] === undefined) && (worldMap[e] === undefined) && (worldMap[se] === undefined);
            if (noneToEast) {
                // console.log(`propose east`);
                return {
                    r: elf.r,
                    c: elf.c+1
                }
            }
        } else {
            console.log(`weird direction ${direction}`);
            throw "weird direction";
        }
        i++;
    }
}

const prettyPrint = (worldMap, minR, maxR, minC, maxC) => {
    let r, c;
    for (r=minR; r<=maxR; r++) {
        let line = "";
        for (c=minC; c<=maxC; c++) {
            const key = indexToString(r, c);
            if (worldMap[key] === undefined) {
                line += ".";
            } else {
                line += "#";
            }
        }
        console.log(line);
    }
}

const worldsMatch = (a, b) => {
    const keys = Object.keys(a);
    let i;
    for (i=0; i<keys.length; i++) {
        if (b[keys[i]] === undefined) {
            return false;
        }
    }
    return true;
}

const simulateRound = (worldMap) => {
    let round = 0;
    let runSimulation = true;

    // while (round < 10) {
    while (runSimulation) {
        let proposedMap = {}
        let elvesMoved = 0;
        for (const [key, elf] of Object.entries(worldMap)) {
            let proposed = findProposedLocation(elf, worldMap, round);
            if (proposed === undefined) {
                // console.log(`no proposed for ${JSON.stringify(elf)}`);
                elf.proposed = {r: elf.r, c: elf.c};
            } else {
                // console.log(`elf ${JSON.stringify(elf)} proposed ${JSON.stringify(proposed)}`);
                elf.proposed = proposed;
            }
            const proposedKey = indexToString(elf.proposed.r, elf.proposed.c);
            if (proposedMap[proposedKey] === undefined) {
                proposedMap[proposedKey] = 1;
            } else {
                proposedMap[proposedKey]++;
            }
        }

        // do the movement
        let nextWorld = {}
        const anElf = Object.values(worldMap)[0];
        let minR = anElf.r;
        let maxR = anElf.r;
        let minC = anElf.c;
        let maxC = anElf.c;
        for (const [key, elf] of Object.entries(worldMap)) {
            let proposedKey = indexToString(elf.proposed.r, elf.proposed.c);
            if (proposedMap[proposedKey] === undefined) {
                console.log(`weird proposed ${proposedKey}`);
                throw "weird key";
            } else if (proposedMap[proposedKey] == 1) {
                // console.log(`elf moving`);
                nextWorld[proposedKey] = {r: elf.proposed.r, c: elf.proposed.c}
                if (elf.proposed.r <= minR) {
                    minR = elf.proposed.r;
                }
                if (elf.proposed.r >= maxR) {
                    maxR = elf.proposed.r;
                }
                if (elf.proposed.c <= minC) {
                    minC = elf.proposed.c;
                }
                if (elf.proposed.c >= maxC) {
                    maxC = elf.proposed.c;
                }
            } else if (proposedMap[proposedKey] > 1) {
                // the elf stays because more than one wanted to move there
                // console.log(`elf stayed`);
                nextWorld[key] = {r: elf.r, c: elf.c}
                if (elf.r <= minR) {
                    minR = elf.r;
                }
                if (elf.r >= maxR) {
                    maxR = elf.r;
                }
                if (elf.c <= minC) {
                    minC = elf.c;
                }
                if (elf.c >= maxC) {
                    maxC = elf.c;
                }
            } else {
                console.log(`weird proposed ${proposedKey} ${proposedMap[proposedKey]}`)
                throw(`weird key`);
            }
        }

        console.log(`End of round ${round+1}`);
        console.log(`r ${minR} ${maxR}, c ${minC} ${maxC}`);
        prettyPrint(nextWorld, minR, maxR, minC, maxC);
        const totalTiles = (maxR-minR+1)*(maxC-minC+1);
        const numElves = Object.keys(worldMap).length;
        console.log(`${numElves} elves, ${totalTiles} tiles, ${totalTiles-numElves} free tiles`);
        // console.log(nextWorld);
        if (worldsMatch(worldMap, nextWorld)) {
            runSimulation = false;
        }
        worldMap = nextWorld;
        round ++;
    }
}

simulateRound(getWorldMap());
