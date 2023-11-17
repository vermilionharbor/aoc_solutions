const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const board = [];
let width, height, exitRow, exitCol, startRow, startCol;
height = lines.length;
width = lines[0].length;
let exitMap = {};
let startMap = {}

const indexToString = (r, c) => {
    return `${r}_${c}`;
}

lines.forEach((l, index) => {
    const row = [];
    let i;
    for (i=0; i<l.length; i++) {
        switch (l[i]) {
            case 'a':
                row.push(0);
                startMap[indexToString(index, i)] = 1;
                break;
            case 'b':
                row.push(1);
                break;
            case 'c':
                row.push(2);
                break;
            case 'd':
                row.push(3);
                break;
            case 'e':
                row.push(4);
                break;
            case 'f':
                row.push(5);
                break;
            case 'g':
                row.push(6);
                break;
            case 'h':
                row.push(7);
                break;
            case 'i':
                row.push(8);
                break;
            case 'j':
                row.push(9);
                break;
            case 'k':
                row.push(10);
                break;
            case 'l':
                row.push(11);
                break;
            case 'm':
                row.push(12);
                break;
            case 'n':
                row.push(13);
                break;
            case 'o':
                row.push(14);
                break;
            case 'p':
                row.push(15);
                break;
            case 'q':
                row.push(16);
                break;
            case 'r':
                row.push(17);
                break;
            case 's':
                row.push(18);
                break;
            case 't':
                row.push(19);
                break;
            case 'u':
                row.push(20);
                break;
            case 'v':
                row.push(21);
                break;
            case 'w':
                row.push(22);
                break;
            case 'x':
                row.push(23);
                break;
            case 'y':
                row.push(24);
                break;
            case 'z':
                row.push(25);
                break;
            case 'S':
                row.push(0);
                console.log(`Start at ${index} ${i}`);
                startRow = index;
                startCol = i;
                startMap[indexToString(index, i)] = 1;
                break;
            case 'E':
                row.push(25);
                console.log(`Exit at ${index} ${i}`);
                exitRow = index;
                exitCol = i;
                exitMap[indexToString(exitRow, exitCol)] = 1;
                break;
            default:
                console.log(`parse error ${l[i]}`);
                break;
        }
    }
    board.push(row);
})

console.log(`height ${height} width ${width} Start ${startRow} ${startCol} Exit ${exitRow} ${exitCol}`);


let shortestSolution;
let iterations = 0;


const searchP = (board, goal) => {
    let r, c;
    let numPs = 0;
    console.log(`regions that exit ${goal}`)
    for (r=0; r<height; r++) {
        for (c=0; c<width; c++) {
            if (board[r][c] === goal) {
                numPs ++;

                if ((r > 0) && (board[r-1][c] === board[r][c]-1)) {
                    console.log(`${r} ${c} move up`)
                }
                // move left
                if ((c > 0) && (board[r][c-1] === board[r][c]-1)) {
                    console.log(`${r} ${c} move left`)
                }
                // move down
                if ((r < height-1) && (board[r+1][c] === board[r][c]-1)) {
                    console.log(`${r} ${c} move down`)
                }
                // move right
                if ((c < width-1) && (board[r][c+1] === board[r][c]-1)) {
                    console.log(`${r} ${c} move right`)
                }

            }
        }
    }

    console.log(`numP ${numPs}`);
}

const keyToIndex = (key) => {
    // console.log(`keytoindex ${key}`);
    const terms = key.split('_');
    return [parseInt(terms[0], 10), parseInt(terms[1], 10)];
}

const prettyPrint = (frontier) => {
    let r, c;
    let prettyMap = [];
    for (r=0; r<height; r++) {
        let row = "";
        for (c=0; c<width; c++) {
            const curIndex = indexToString(r, c);
            if ((exitMap[curIndex] !== undefined) && (frontier[curIndex] !== undefined)) {
                row += lines[r][c].toUpperCase();
            } else if (r === startRow && c === startCol) {
                row += "S";
            } else if (frontier[curIndex] !== undefined) {
                row += lines[r][c];
            } else {
                row += ".";
            }
        }
        prettyMap.push(row);
        console.log(row);
    }
}

const breathSearch = (board, startRow, startCol) => {
    const visited = {};
    const startKey = indexToString(startRow, startCol);
    visited[startKey] = 0;

    let frontier = {}
    frontier[startKey] = 1;
    const endIndex = indexToString(exitRow, exitCol);

    let pathLength = 0;
    let loop = true;
    while (loop === true) {
        const nextFrontier = {};
        let blocksProcessed = 0;
        for (const [key, val] of Object.entries(frontier)) {
            const [r, c] = keyToIndex(key);
            // console.log(`${r} ${c}`);
            visited[key] = pathLength;
            if (exitMap[key] !== undefined) {
                loop = false;
            }
            // move down
            const downKey = indexToString(r + 1, c)
            if ((r < height - 1) && (visited[downKey] === undefined) && (board[r + 1][c] <= board[r][c] + 1)) {
                // console.log('move down');
                nextFrontier[downKey] = 1;
            }

            // move left
            const leftKey = indexToString(r, c - 1);
            if ((c > 0) && (visited[leftKey] === undefined) && (board[r][c - 1] <= board[r][c] + 1)) {
                // console.log('move left');
                nextFrontier[leftKey] = 1;
            }

            // move up
            const upKey = indexToString(r - 1, c);
            if ((r > 0) && (visited[upKey] === undefined) && (board[r - 1][c] <= board[r][c] + 1)) {
                // console.log('move up');
                nextFrontier[upKey] = 1;
            }

            // move right
            const rightKey = indexToString(r, c + 1);
            if ((c < width - 1) && (visited[rightKey] === undefined) && (board[r][c + 1] <= board[r][c] + 1)) {
                // console.log('move right');
                nextFrontier[rightKey] = 1;
            }
            blocksProcessed ++;
        }
        console.log(`processing path length ${pathLength} ${blocksProcessed}`)
        // prettyPrint(frontier);
        prettyPrint(visited);
        pathLength++;
        frontier = nextFrontier;
    }

    // console.log(`shortest path ${visited[endIndex]}`);
    for (const [key, val] of Object.entries(exitMap)) {
        console.log(`${key} ${visited[key]}`);
    }
}

const reverseBreathSearch = (board, startRow, startCol, exitMap) => {
    const visited = {};
    const startKey = indexToString(startRow, startCol);
    visited[startKey] = 0;

    let frontier = {}
    frontier[startKey] = 1;
    const endIndex = indexToString(exitRow, exitCol);

    let pathLength = 0;
    let loop = true;
    while (loop === true) {
        const nextFrontier = {};
        let blocksProcessed = 0;
        for (const [key, val] of Object.entries(frontier)) {
            const [r, c] = keyToIndex(key);
            // console.log(`${r} ${c}`);
            visited[key] = pathLength;
            if (exitMap[key] !== undefined) {
                loop = false;
            }
            // move down
            const downKey = indexToString(r + 1, c)
            if ((r < height - 1) && (visited[downKey] === undefined) && (board[r + 1][c] >= board[r][c] - 1)) {
                // console.log('move down');
                nextFrontier[downKey] = 1;
            }

            // move left
            const leftKey = indexToString(r, c - 1);
            if ((c > 0) && (visited[leftKey] === undefined) && (board[r][c - 1] >= board[r][c] - 1)) {
                // console.log('move left');
                nextFrontier[leftKey] = 1;
            }

            // move up
            const upKey = indexToString(r - 1, c);
            if ((r > 0) && (visited[upKey] === undefined) && (board[r - 1][c] >= board[r][c] - 1)) {
                // console.log('move up');
                nextFrontier[upKey] = 1;
            }

            // move right
            const rightKey = indexToString(r, c + 1);
            if ((c < width - 1) && (visited[rightKey] === undefined) && (board[r][c + 1] >= board[r][c] - 1)) {
                // console.log('move right');
                nextFrontier[rightKey] = 1;
            }
            blocksProcessed ++;
        }
        console.log(`processing path length ${pathLength} ${blocksProcessed}`)
        // prettyPrint(frontier);
        prettyPrint(visited);
        pathLength++;
        frontier = nextFrontier;
    }

    // console.log(`shortest path ${visited[endIndex]}`);
    for (const [key, val] of Object.entries(exitMap)) {
        console.log(`${key} ${visited[key]}`);
    }
}

// searchP(board, 17);
// searchP(board, 16);
// console.log('k');
// searchP(board, 10);
console.log('e');
searchP(board, 4);
// climbDown(board, 35, 50, 0, visited);

// breathSearch(board, startRow, startCol);
// prettyPrint(exitMap);

reverseBreathSearch(board, exitRow, exitCol, startMap);
prettyPrint(startMap);


// lines.forEach(l => {
//     console.log(l);
// })

