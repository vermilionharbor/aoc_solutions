const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const board = [];
let width, height, exitRow, exitCol, startRow, startCol;
height = lines.length;
width = lines[0].length;
lines.forEach((l, index) => {
    const row = [];
    let i;
    for (i=0; i<l.length; i++) {
        switch (l[i]) {
            case 'a':
                row.push(0);
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
                break;
            case 'E':
                row.push(26);
                console.log(`Exit at ${index} ${i}`);
                exitRow = index;
                exitCol = i;
                break;
            default:
                console.log(`parse error ${l[i]}`);
                break;
        }
    }
    board.push(row);
})

console.log(`height ${height} width ${width} Start ${startRow} ${startCol} Exit ${exitRow} ${exitCol}`);

const indexToString = (r, c) => {
    return `${r}_${c}`;
}

let r, c;
for (r=0; r<height; r++) {
    // console.log(board[r]);
}

let shortestSolution;

const climb = (board, r, c, pathLength, visited) => {
    console.log(`visit ${r} ${c} ${pathLength}`);
    // check for end condition
    if ((r === exitRow) && (c === exitCol)) {
        console.log(`found solution of length ${pathLength}`)
        if (shortestSolution === undefined) {
            shortestSolution = pathLength;
        } else if (pathLength < shortestSolution) {
            shortestSolution = pathLength;
        }
        return;
    }

    if ((shortestSolution !== undefined) && (pathLength > shortestSolution)) {
        // early return it's already too long
        return;
    }

    // mark the current as visited
    const curMap = {
        ...visited
    }
    curMap[indexToString(r, c)] = 1;

    // move up
    if ((r > 0) && (visited[indexToString(r-1, c)] === undefined) && (board[r-1][c] <= board[r][c]+1)) {
        // console.log('move up');
        climb(board, r-1, c, pathLength + 1, curMap);
    }
    // move left
    if ((c > 0) && (visited[indexToString(r, c-1)] === undefined) && (board[r][c-1] <= board[r][c]+1)) {
        // console.log('move left');
        climb(board, r, c-1, pathLength + 1, curMap);
    }
    // move down
    if ((r < height-1) && (visited[indexToString(r+1, c)] === undefined) && (board[r+1][c] <= board[r][c]+1)) {
        // console.log('move down');
        climb(board, r+1, c, pathLength + 1, curMap);
    }
    // move right
    if ((c < width-1) && (visited[indexToString(r, c+1)] === undefined) && (board[r][c+1] <= board[r][c]+1)) {
        // console.log('move right');
        climb(board, r, c+1, pathLength + 1, curMap);
    }
}

const visited = {};
climb(board, startRow, startCol, 0, visited);
console.log(`shortest route ${shortestSolution}`);
