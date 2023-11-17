const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const cave = [];
const table = [];

const smallHeight = lines.length;
const smallWidth = lines[0].length;
const height = smallHeight*5;
const width = smallWidth*5;

lines.forEach(l => {
    const row = [];
    let i;
    for (i=0; i<smallWidth; i++) {
        row.push(parseInt(l[i], 10));
    }
    cave.push(row);

})

const expandCave = (cave) => {
    let tile;
    let y;
    for (y=0; y<smallHeight; y++) {
        const line = cave[y];
        for (tile=1; tile<5; tile++) {
            let x;
            for (x=0; x<smallWidth; x++) {
                let newVal = line[x] + tile;
                newVal = newVal > 9 ? newVal-9 : newVal;
                line.push(newVal);
            }
        }
    }

    for (tile=1; tile<5; tile++) {
        for (y=0; y<smallHeight; y++) {
            const line = cave[y];
            const newLine = line.map(val => {
                let newVal = val + tile;
                newVal = newVal > 9 ? newVal-9 : newVal;
                return newVal;
            });
            cave.push(newLine);
        }
    }

    for (y=0; y<height; y++) {
        const tableRow = [];
        for (x=0; x<width; x++) {
            tableRow.push(null);
        }
        table.push(tableRow);
    }
}

//console.log(cave);
console.log(`cave width ${width}, height ${height}`)
const indexToString = (y, x) => {
    return `${y}_${x}`
}

const searchPath = (cave, y, x, score, visited, solution, table, min) => {
//    if ((y <= min) || (x <= min)) return;
//console.log(`search.. ${y} ${x}`)
    if (table[y][x] !== null) {
        let currentScore = score + table[y][x];
        if ((solution.score === undefined) || (currentScore < solution.score)) {
            solution.score = currentScore;
        }
        return;
    }
    let currentScore = score + cave[y][x];

    // mark it as visited
    const key = indexToString(y, x);
    visited[key] = 1;

    if ((y === height-1) && (x === width-1)) {
        // we are at the end
        console.log(`found possible solution, ${currentScore}`)
        if ((solution.score === undefined) || (currentScore < solution.score)) {
            solution.score = currentScore;
        }
        return;
    }

    if ((solution.score !== undefined) && (currentScore > solution.score)) {
        // already greater than the best solution
        return;
    }

    // bottom
    if (y < height-1) {
        const nextY = y+1;
        const nextX = x;
        const nextKey = indexToString(nextY, nextX);
        if (visited[nextKey] === undefined) {
            const nextVisited = {
                ...visited,
            }
            searchPath(cave, nextY, nextX, currentScore, nextVisited, solution, table);
        }
    }

    // right
    if (x < width-1) {
        const nextY = y;
        const nextX = x+1;
        const nextKey = indexToString(nextY, nextX);
        if (visited[nextKey] === undefined) {
            const nextVisited = {
                ...visited,
            }
            searchPath(cave, nextY, nextX, currentScore, nextVisited, solution, table);
        }
    }

    // top
    if ((y > 0) && (y > min)) {
        const nextY = y-1;
        const nextX = x;
        const nextKey = indexToString(nextY, nextX);
        if (visited[nextKey] === undefined) {
            const nextVisited = {
                ...visited,
            }
            searchPath(cave, nextY, nextX, currentScore, nextVisited, solution, table);
        }
    }

    // left
    if ((x > 0) && (x > min)) {
        const nextY = y;
        const nextX = x-1;
        const nextKey = indexToString(nextY, nextX);
        if (visited[nextKey] === undefined) {
            const nextVisited = {
                ...visited,
            }
            searchPath(cave, nextY, nextX, currentScore, nextVisited, solution, table);
        }
    }
}

const populateTableLocation = (cave, table, y, x, visited, min) => {
    const entranceKey = indexToString(y, x);
    visited[entranceKey] = 1;
    const solution = {};
    searchPath(cave, y, x, 0, visited, solution, table, min);
    table[y][x] = solution.score;
    // console.log(`y ${y} x ${x}: ${table[y][x]}`);
}

const populateTable = (cave, table) => {
    let y, x;

    for (y=height-2; y>=0; y--) {
        console.log(`computing ${y}`)
        const visited = {}
        let curY = y - 1;
        let min = y -1;
        console.log(`min ${min}`)
//        x = width-1;
//        while (x >= curY) {
//            const key = indexToString(curY, x);
//            visited[key] = 1;
//            x--;
//        }
//        x++;
//        while (curY < height) {
//            const key = indexToString(curY, x);
//            visited[key] = 1;
//            curY++;
//        }

        curY = y;
        x = width-1;
        while (x >= curY) {
            let curVisited = {}
            populateTableLocation(cave, table, curY, x, curVisited, min);
            curVisited = {}
            populateTableLocation(cave, table, x, curY, curVisited, min);
            x--;
        }
//        x++;
//        while (curY < height) {
//            const curVisited = {...visited}
//            populateTableLocation(cave, table, curY, x, curVisited, min);
//            curY++;
//        }
    }
}

const prettyPrint = (cave) => {
    let y, x;
    for (y=0; y<cave.length; y++) {
        let lineBuffer = '';
        cave[y].forEach(val => {
            lineBuffer += val;
        })
        console.log(lineBuffer);
    }
}

expandCave(cave);
console.log(`${cave.length} ${cave[0].length}`);
prettyPrint(cave);

populateTable(cave, table);
console.log(`Solution: ${table[0][0]-cave[0][0]}`);

//const entranceKey = indexToString(0, 0);
//const visited = {};
//visited[entranceKey] = 1;
//const solution = {};


//searchPath(cave, 0, 0, 0, visited, solution);
//
//if (solution.score !== undefined) {
//    console.log(`final score ${solution.score - cave[0][0]}`);
//} else {
//    console.log(`something went wrong, no solution`);
//}
