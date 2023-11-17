const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let mask = '';
let imm = '';
let index = 0;

const reverseString = (s) => {
    let chars = s.split("");
    chars = chars.reverse();
    return chars.join("");
}

const maskInt = (v, m) => {
    console.log(`*${v} ${m}`)
    const val = reverseString(v);
    const mask = reverseString(m);
    let buf = '';

    for (let i=0; i<36; i++) {
        switch (mask[i]) {
            case 'X':
                if (i >= val.length) {
                    buf += '0';
                } else {
                    buf += val[i];
                }
                break;
            case '1':
                buf += '1';
                break;
            case '0':
                buf += '0';
                break;
        }
    }

    return reverseString(buf);
}

// part 1
// let mem = [];
// lines.forEach(l => {
//     // console.log(l);
//     const terms = l.split(" ");
//     // console.log(`${terms[0]} ${terms[2]}`);
//     if (terms[0] === "mask") {
//         mask = terms[2];
//         console.log(`${mask}`)
//     } else {
//         index = parseInt(terms[0].slice(4, terms[0].length-1), 10);
//         imm = terms[2];
//         let immBase2 = parseInt(imm, 10).toString(2);
//         let maskedImm = maskInt(immBase2, mask);
//         let maskedImmVal = parseInt(maskedImm, 2);
//         console.log(`${index} ${imm} ${maskedImm} ${maskedImmVal}`);
//         mem[index] = maskedImmVal;
//     }
// });
//
// let sum = 0;
// mem.forEach(val => {
//     if (val != undefined) {
//         sum += val;
//     }
// });
//
// console.log(`sum ${sum}`);

const maskAddr = (v, m) => {
    // console.log(`*${v} ${m}`)
    const val = reverseString(v);
    const mask = reverseString(m);
    let buf = '';

    for (let i=0; i<36; i++) {
        switch (mask[i]) {
            case 'X':
                buf += 'X';
                break;
            case '1':
                buf += '1';
                break;
            case '0':
                if (i >= val.length) {
                    buf += '0';
                } else {
                    buf += val[i];
                }
                break;
        }
    }

    return reverseString(buf);
}

const countX = (val) => {
    let sum = 0;
    for (let i=0; i<val.length; i++) {
        if (val[i] === 'X') {
            sum ++;
        }
    }
    return sum;
}

const genAddr = (left, right, acc) => {
    let xIndex = right.indexOf('X')
    if (xIndex === -1) {
        // done
        let addr = parseInt(left+right, 2);
        acc.push(addr);
    } else {
        let lsplit = right.slice(0, xIndex);
        let rsplit = right.slice(xIndex+1, right.length);
        genAddr(left+lsplit+'0', rsplit, acc);
        genAddr(left+lsplit+'1', rsplit, acc);
    }
}

let mem2 = {};
lines.forEach(l => {
    const terms = l.split(" ");
    // console.log(`${terms[0]} ${terms[2]}`);
    if (terms[0] === "mask") {
        mask = terms[2];
        console.log(`${mask} ${mask.length} ${countX(mask)}`);
    } else {
        index = parseInt(terms[0].slice(4, terms[0].length-1), 10);
        imm = terms[2];
        let immVal = parseInt(imm, 10);
        let address = [];
        let indexBase2 = index.toString(2);
        let maskedAddr = maskAddr(indexBase2, mask);
        genAddr("", maskedAddr, address);
        // console.log(address);
        console.log(`assigning ${address.length} values`)
        address.forEach(a => {
            mem2[a] = immVal;
        })
    }
});

let sum2 = 0;
for (const [key, value] of Object.entries(mem2)) {
    console.log(`${key} ${value}`);
    sum2 += value;
}
console.log(`sum ${sum2}`);
