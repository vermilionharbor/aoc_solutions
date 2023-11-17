const fs = require('fs');

const data = fs.readFileSync("input2.txt").toString();


const stringToGrid = (s) => {
    let grid = [];
    let lines = s.split('\n');

    lines.forEach(l => {
        if (l.length > 0) {
            let row = [];
            for (let i = 0; i < l.length; i++) {
                row.push(l[i]);
            }
            grid.push(row);
        }
    })
    return grid;
}

const gridToString = (g) => {
    let buffer = '';
    g.forEach(l => {
        let line = '';
        for (let i=0; i<l.length; i++) {
            line += l[i];
        }
        buffer += line + '\n';
    })
    return buffer;
}

const findNeighbor = (r, c, g, deltar, deltac) => {
    const width = g[0].length
    const height = g.length;

    const newR = r + deltar;
    const newC = c + deltac;

    if ((newR < 0) || (newR >= height) || (newC < 0) || (newC >= width)) {
        // falls off
        return '.';
    } else if ((g[newR][newC] === '#') || (g[newR][newC] === 'L')) {
        return g[newR][newC];
    } else {
        return findNeighbor(newR, newC, g, deltar, deltac);
    }
}

const countNeighbor = (r, c, g, target, debug=false) => {
    let count = 0;
    const width = g[0].length
    const height = g.length;

    const debugOut = (s) => {
        if (debug) {
            console.log(s);
        }
    }

    if (r-1 >= 0) {
        // top left
        if ((c - 1 >= 0) && (g[r - 1][c - 1] === target)) {
            debugOut("top left")
            count++;
        }
        // top
        if ((g[r - 1][c] === target)) {
            debugOut("top")
            count++;
        }
        // top right
        if ((c + 1 < width) && (g[r - 1][c + 1] === target)) {
            debugOut("top right")
            count++;
        }
    }
    // left
    if ((c-1 >= 0) && (g[r][c-1] === target)) {
        debugOut("left")
        count ++;
    }
    // right
    if ((c+1 < width) && (g[r][c+1] === target)) {
        debugOut("right")
        count ++;
    }

    if (r+1 < height) {
        // bottom left
        if ((c - 1 >= 0) && (g[r + 1][c - 1] === target)) {
            debugOut("bottom left")
            count++;
        }

        // bottom
        if ((g[r + 1][c] === target)) {
            debugOut("bottom")
            count++;
        }

        // bottom right
        if ((c + 1 < width) && (g[r + 1][c + 1] === target)) {
            debugOut("bottom right")
            count++;
        }
    }
    return count;
}

const countFarNeighbor = (r, c, g, target, debug=false) => {
    let count = 0;
    const width = g[0].length
    const height = g.length;

    const debugOut = (s) => {
        if (debug) {
            console.log(s);
        }
    }

    // top left
    if (findNeighbor(r, c, g, -1, -1) === target) {
        debugOut("top left")
        count++;
    }
    // top
    if (findNeighbor(r, c, g, -1, 0) === target) {
        debugOut("top")
        count++;
    }
    // top right
    if (findNeighbor(r, c, g, -1, 1) === target) {
        debugOut("top right")
        count++;
    }

    // left
    if (findNeighbor(r, c, g, 0, -1) === target) {
        debugOut("left")
        count ++;
    }
    // right
    if (findNeighbor(r, c, g, 0, 1) === target) {
        debugOut("right")
        count ++;
    }

    // bottom left
    if (findNeighbor(r, c, g, 1, -1) === target) {
        debugOut("bottom left")
        count++;
    }

    // bottom
    if (findNeighbor(r, c, g, 1, 0) === target) {
        debugOut("bottom")
        count++;
    }

    // bottom right
    if (findNeighbor(r, c, g, 1, 1) === target) {
        debugOut("bottom right")
        count++;
    }

    return count;
}

const moveRound = (g) => {
    // do a round of seating, return the new grid
    let grid = [];
    let emptySeats, occupiedSeats;
    for (let r=0; r<g.length; r++) {
        grid[r] = [];
        for (let c=0; c<g[r].length; c++) {
            // if (r === 1 && c === 1) {
            //     console.log('current');
            //     console.log(gridToString(g));
            //     console.log('count', countNeighbor(r, c, g, '#', true));
            //     console.log('row', g[r]);
            //     console.log('dest', gridToString(grid));
            // }
            switch (g[r][c]) {
                case '.':
                    grid[r][c] = g[r][c];
                    break;
                case 'L':
                    occupiedSeats = countNeighbor(r, c, g, '#');
                    if (occupiedSeats === 0) {
                        grid[r][c] = '#';
                    } else {
                        grid[r][c] = 'L';
                    }
                    break;
                case '#':
                    occupiedSeats = countNeighbor(r, c, g, '#');
                    if (occupiedSeats >= 4) {
                        grid[r][c] = 'L';
                    } else {
                        grid[r][c] = '#';
                    }
                    break;
            }
        }
    }

    return grid;
}

const moveRoundComplex = (g) => {
    // do a round of seating, return the new grid
    let grid = [];
    let occupiedSeats;
    for (let r=0; r<g.length; r++) {
        grid[r] = [];
        for (let c=0; c<g[r].length; c++) {
            switch (g[r][c]) {
                case '.':
                    grid[r][c] = g[r][c];
                    break;
                case 'L':
                    occupiedSeats = countFarNeighbor(r, c, g, '#');
                    if (occupiedSeats === 0) {
                        grid[r][c] = '#';
                    } else {
                        grid[r][c] = 'L';
                    }
                    break;
                case '#':
                    occupiedSeats = countFarNeighbor(r, c, g, '#');
                    if (occupiedSeats >= 5) {
                        grid[r][c] = 'L';
                    } else {
                        grid[r][c] = '#';
                    }
                    break;
            }
        }
    }

    return grid;
}

const countOccupiedSeats = (grid) => {
    let count = 0;
    for (let r=0; r<grid.length; r++) {
        for (let c=0; c<grid[r].length; c++) {
            if (grid[r][c] === '#') {
                count ++;
            }
        }
    }

    return count;
}

let grid = stringToGrid(data)
// console.log(grid);
console.log(gridToString(grid));
const width = grid[0].length
const height = grid.length;
console.log(`w ${width} h ${height}`);

let nextRound = grid;
let nextRoundString = '';
let lastRoundString = '';
let round = 0;
do {
    lastRoundString = gridToString(grid);
    // nextRound = moveRound(grid)
    nextRound = moveRoundComplex(grid);
    nextRoundString = gridToString(nextRound);
    grid = nextRound;
    console.log('after round', round);
    console.log(nextRoundString);
    // console.log(lastRoundString);
    round++;
} while (lastRoundString !== nextRoundString);

console.log(`Occupied Seats ${countOccupiedSeats(grid)}`);

// console.log(countNeighbor(0,0, grid, 'L'));
// console.log(countNeighbor(8,5, grid, 'L'));
// console.log(countNeighbor(9,5, grid, 'L'));

