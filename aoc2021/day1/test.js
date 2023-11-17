const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

const depths = lines.map(l => {
    return parseInt(l, 10);
});

depths.forEach((l, index) => {
    console.log(l, index);
});

let i;
let numHigher=0;
for (i=1; i<depths.length; i++) {
    if (depths[i] > depths[i-1]) {
        numHigher++;
    }
}

console.log(`num higher ${numHigher}`);

numHigher=0;
let previousSum = depths[0] + depths[1] + depths[2];
let numHigherWindow = 0;
for (i=3; i<depths.length; i++) {
    const currentSum = depths[i] + depths[i-1] + depths[i-2];
    if (currentSum > previousSum) {
        numHigherWindow++;
    }
    previousSum = currentSum;
}

console.log(`num higher window ${numHigherWindow}`);
