const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let map = {};
let answer;
lines.forEach(l => {
    let val = l*1;
    let complement = 2020 - val;
    console.log(val, complement);
    if (map[complement] !== undefined) {
        answer = complement;
    } else {
        map[val] = 1;
    }
    console.log(map);
});

console.log(`{${answer}, ${2020-answer}, ${answer * (2020-answer)}}`);


let map1 = {};
let map2 = {};

lines.forEach(l => {
    let val = l*1;
    let complement = 2020 - val;
    // console.log(val, complement);
    if (map2[complement] !== undefined) {
        answer = complement;
    } else {
        // go through all of map1 add it to val and put it in map2
        for([key, mapval] of Object.entries(map1)) {
            let partial = key*1 + val;
            map2[partial] = {
                first: key*1,
                second: val
            }
        }

        // put val in map1
        map1[val] = 1;
    }
    // console.log(map);
});

let theAnswer = 2020 - answer;
let first = map2[answer].first*1;
let second = map2[answer].second*1;
console.log(`${theAnswer} ${first} ${second} ${theAnswer*first*second} `);
