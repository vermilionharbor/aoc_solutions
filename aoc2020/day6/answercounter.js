const fs = require('fs');

const lines = fs.readFileSync('input2.txt').toString().split('\n');

let map = {};
let sum = 0;
lines.forEach(l => {
    if (l.length === 0) {
        // console.log('new group');
        console.log(map);
        const numKeys = Object.keys(map).length;
        console.log(`numKeys ${numKeys}`)
        sum += numKeys;
        map = {};
    } else {
        for (let i=0; i<l.length; i++) {
            map[l[i]] = 1;
        }
        console.log(l);
    }
});

console.log(`Answer ${sum}`);


map = {};
sum = 0;
let groupSize = 0;

lines.forEach(l => {
    if (l.length === 0) {
        // console.log('new group');
        // console.log(map);
        let groupSum = 0;
        for (const [key, value] of Object.entries(map)) {
            // console.log(`${key}: ${value}`);
            if (value === groupSize) {
                sum ++;
                groupSum++;
            }
        }
        console.log(`group sum ${groupSum}`)
        map = {};
        groupSize = 0;
    } else {
        for (let i=0; i<l.length; i++) {
            if (map[l[i]] === undefined) {
                map[l[i]] = 1;
            } else {
                map[l[i]]++;
            }
        }
        groupSize ++;
        // console.log(l);
    }
});

console.log(`Answer2 ${sum}`);
