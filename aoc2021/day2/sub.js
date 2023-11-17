const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let horizontal = 0;
let depth = 0;

lines.forEach(l => {
    const command = l.split(' ');
    const val = parseInt(command[1], 10);
    // console.log(`${command[0]} ${command[1]}`);
    switch (command[0]) {
        case 'forward':
            horizontal += val;
            break;
        case 'down':
            depth += val;
            break;
        case 'up':
            depth -= val;
            break;
    }
    console.log(`horizontal ${horizontal} depth ${depth}`);
});

console.log('done');
console.log(`horizontal ${horizontal} depth ${depth}`);
console.log(horizontal * depth);

console.log('part 2');
horizontal = 0;
depth = 0;
let aim = 0;
lines.forEach(l => {
    const command = l.split(' ');
    const val = parseInt(command[1], 10);
    switch (command[0]) {
        case 'forward':
            horizontal += val;
            depth += aim * val;
            break;
        case 'down':
            aim += val;
            break;
        case 'up':
            aim -= val;
            break;
    }
    console.log(`horizontal ${horizontal} depth ${depth} aim ${aim}`);
});

console.log('done part 2');
console.log(`horizontal ${horizontal} depth ${depth}`);
console.log(horizontal * depth);


