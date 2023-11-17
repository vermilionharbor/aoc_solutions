const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let sums = [];
let i;
let width = lines[0].length;
for (i=0; i<lines[0].length; i++) {
    sums[i] = 0;
}

lines.forEach(l => {
    for (i=0; i<l.length; i++) {
        if (l[i] === '1') {
            sums[i] ++;
        }
    }
});

console.log(lines.length, lines.length/2);
console.log(sums);

let acc = '';
let acc2 = '';
for (i=0; i<width; i++) {
    if (sums[i] > lines.length/2) {
        acc += '1';
        acc2 += '0';
    } else {
        acc += '0';
        acc2 += '1';
    }
}

console.log(`acc1 ${acc} acc2 ${acc2}`);
let gamma = parseInt(acc, 2);
let epsilon = parseInt(acc2, 2);
console.log(gamma, epsilon, gamma*epsilon);

lines.sort();
lines.forEach(l => {
    console.log(l);
});

const oxygenFilter = (data, index) => {
    let numData = data.length;
    let keep = '';
    if (numData % 2 === 1) {
        // odd terms, check the middle one
        let mid = (numData-1)/2;
        keep = data[mid][index];
    } else {
        // even terms
        let mid = numData/2;
        if (data[mid][index] !== data[mid-1][index]) {
            keep = '1';
        } else {
            keep = data[mid][index];
        }
    }
    let acc = [];
    data.forEach(d => {
        if (d[index] === keep) {
            acc.push(d);
        }
    });
    console.log(`keeping ${keep}, ${acc.length} items`);

    return acc;
}

const carbonFilter = (data, index) => {
    let numData = data.length;
    let keep = '';
    if (numData % 2 === 1) {
        // odd terms, check the middle one
        let mid = (numData-1)/2;
        keep = data[mid][index];
    } else {
        // even terms
        let mid = numData/2;
        if (data[mid][index] !== data[mid-1][index]) {
            keep = '1';
        } else {
            keep = data[mid][index];
        }
    }
    if (keep === '1') {
        keep = '0'
    } else {
        keep = '1'
    }
    let acc = [];
    data.forEach(d => {
        if (d[index] === keep) {
            acc.push(d);
        }
    });
    console.log(`keeping ${keep}, ${acc.length} items`);

    return acc;
}

const testData = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
];

let newLines = lines;
// let newLines = testData.sort();
width = newLines[0].length;
let index = 0;

while (newLines.length > 1 && index < width) {
    newLines = oxygenFilter(newLines, index);
    index++;
}


console.log('done');

let oxygen = parseInt(newLines[0], 2);
console.log(newLines.length, newLines[0], oxygen);

index = 0;
// newLines = testData.sort();
newLines = lines;
while (newLines.length > 1 && index < width) {
    newLines = carbonFilter(newLines, index);
    index++;
}

let carbon = parseInt(newLines[0], 2);
console.log(newLines.length, newLines[0], carbon);
console.log(oxygen * carbon);