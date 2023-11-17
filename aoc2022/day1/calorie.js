const fs = require('fs');

const data = fs.readFileSync("input1.txt").toString().split('\n');

let sum = 0;
let largest = 0;
let elves = [];

data.forEach(l => {
    // console.log(l);
    if (l === "") {
        console.log(`sum ${sum}`);
        if (sum > largest) {
            largest = sum;
        }
        elves.push(sum);
        sum = 0;
    } else {
        sum += parseInt(l, 10);
    }
});

console.log(`largest ${largest}`);

console.log(elves);

elves.sort((a, b) => b - a);

console.log(elves);

console.log(`part b ${elves[0] + elves[1] + elves[2]}`);


