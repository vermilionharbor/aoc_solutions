const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split("\n");

// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
let numValid = 0;
// lines.forEach(l => {
//     // console.log(l);
//     let terms = l.split(" ");
//     let digits = terms[0].split("-");
//     let theChar = terms[1][0];
//     let password = terms[2];
//
//     console.log(`${digits[0]} ${digits[1]} ${theChar} ${password}`);
//
//     let count = 0;
//     for (let i=0; i<password.length; i++) {
//         if (password[i] === theChar) {
//             count ++;
//         }
//     }
//
//     if ((count >= digits[0]) && (count <= digits[1])) {
//         numValid++;
//     }
// });
// console.log(`total passwords ${lines.length}`);
// console.log(`valid passwords ${numValid}`);

numValid = 0;
lines.forEach(l => {
    // console.log(l);
    let terms = l.split(" ");
    let digits = terms[0].split("-");
    let theChar = terms[1][0];
    let password = terms[2];

    let count = 0;
    if (password[digits[0]-1] === theChar) {
        count ++;
    }
    if (password[digits[1]-1] === theChar) {
        count ++;
    }
    if (count === 1) {
        numValid ++;
        console.log('password valid', password);
    }

});

console.log(`total passwords ${lines.length}`);
console.log(`valid passwords ${numValid}`);