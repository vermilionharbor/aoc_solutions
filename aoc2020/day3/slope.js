const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let board = [];
let deltaC = 3;
let deltaR = 1;
let r = 0;
let c = 0;
let numTrees = 0;
lines.forEach((l, index) => {
    //console.log(l);
    board[index] = l;
    r = index;
    c = (deltaC * index) % l.length;
    if (l[c] === "#") {
        numTrees++;
    }
})
console.log(`lines ${lines.length}`);
console.log(`encountered ${numTrees} trees`);

const findTrees = (deltaC, deltaR, b) => {
    let r = 0;
    let c = 0;
    let l;
    let numTrees = 0;
    while (r < b.length) {
        l = b[r];
        if (l[c] === "#") {
            numTrees++;
        }

        c = (c + deltaC) % l.length;
        r += deltaR;
    }
    return numTrees;
}

let trees11 = findTrees(1, 1, board);
let trees31 = findTrees(3, 1, board);
let trees51 = findTrees(5, 1, board);
let trees71 = findTrees(7, 1, board);
let trees12 = findTrees(1, 2, board);
let product = trees11 * trees31 * trees51 * trees71 * trees12;

console.log(`slope 1 1, ${trees11}`);
console.log(`slope 3 1, ${trees31}`);
console.log(`slope 5 1, ${trees51}`);
console.log(`slope 7 1, ${trees71}`);
console.log(`slope 1 2, ${trees12}`);
console.log(`product ${product}`)

