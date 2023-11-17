const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let pairs = [];
let sum = 0;
let disjoint = 0;

lines.forEach(l => {
    if (l.length > 0) {
        console.log(l);
    }
    const team = l.split(',');
    const left = team[0].split('-');
    const right = team[1].split('-');
    const a = parseInt(left[0], 10);
    const b = parseInt(left[1], 10);
    const c = parseInt(right[0], 10);
    const d = parseInt(right[1], 10);
    pairs.push({
        left: {
            start: a,
            end: b
        },
        right: {
            start: c,
            end: d
        }
    });

    if ((c >= a) && (d <= b) || (a >= c) && (b <= d)) {
        sum ++;
        console.log(`contained!! ${sum}`);
    }

    if ((c > b) || (d < a)) {
        disjoint ++;
        console.log(`disjoint ${disjoint}`)
    }
})

console.log(`total ${lines.length} sum ${sum} overlapped ${lines.length - disjoint}`);
