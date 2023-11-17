const fs = require('fs');

const lines = fs.readFileSync("input2.txt").toString().split('\n');

const decodeBase2 = (s, charZero, charOne) => {
    let buf = '';
    for (let i=0; i<s.length; i++) {
        if (s[i] === charZero) {
            buf += '0';
        } else if (s[i] === charOne) {
            buf += '1';
        } else {
            throw new Error(`unexepected input ${s[i]} in ${s}`);
        }
    }

    return parseInt(buf, 2);
}

const getSeatId = (r, c) => {
    return r*8+c;
}

let highest = 0;
let seatRows = [];
for (let r=0; r<128; r++) {
    seatRows[r] = [0, 0, 0, 0, 0, 0, 0, 0];
}
lines.forEach(l => {
    // console.log(l);
    const rowCode = l.slice(0, 7);
    const colCode = l.slice(7, 10);

    let row = decodeBase2(rowCode, 'F', 'B');
    let col = decodeBase2(colCode, 'L', 'R');
    let seatId = getSeatId(row, col);
    console.log(`${rowCode} ${colCode} ${row} ${col} seat ID ${seatId}`);
    if (seatId > highest) {
        highest = seatId;
    }

    seatRows[row][col] = 1;
})

console.log(`highest ID ${highest}`);

for (let r=0; r<128; r++) {
    if (seatRows[r].some(s => s===0)) {
        console.log(`row ${r} has empties`);
        for (let c=0; c<8; c++) {
            if (seatRows[r][c] === 0) {
                console.log(`seatID ${getSeatId(r, c)}`);
            }
        }
    }
}