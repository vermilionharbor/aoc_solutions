const fs = require('fs');

const inputLines = fs.readFileSync('initial.txt').toString().split('\n');

const crates = {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
}
inputLines.forEach(l => {
    console.log(l);
    if (l[1] !== ' ') {
        crates['1'].push(l[1]);
    }

    if (l[5] !== ' ') {
        crates['2'].push(l[5]);
    }

    if (l[9] !== ' ') {
        crates['3'].push(l[9]);
    }

    if (l[13] !== ' ') {
        crates['4'].push(l[13]);
    }

    if (l[17] !== ' ') {
        crates['5'].push(l[17]);
    }

    if (l[21] !== ' ') {
        crates['6'].push(l[21]);
    }

    if (l[25] !== ' ') {
        crates['7'].push(l[25]);
    }

    if (l[29] !== ' ') {
        crates['8'].push(l[29]);
    }

    if (l[33] !== ' ') {
        crates['9'].push(l[33]);
    }
});

console.log(crates);

const lines = fs.readFileSync('input.txt').toString().split('\n');

lines.forEach(l => {
    // console.log(l);
    const terms = l.split(' ');
    console.log(`${terms[1]} ${terms[3]} ${terms[5]} `);
    const numToMove = parseInt(terms[1], 10);
    const source = terms[3];
    const dest = terms[5];

    let i = 0;
    for (i=0; i <numToMove; i++) {
        const cur = crates[source].pop();
        crates[dest].push(cur);
    }
})

console.log(crates);
console.log(`${crates['1'].pop()}${crates['2'].pop()}${crates['3'].pop()}${crates['4'].pop()}${crates['5'].pop()}${crates['6'].pop()}${crates['7'].pop()}${crates['8'].pop()}${crates['9'].pop()}`)

