const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

let numUniques = 0;
lines.forEach(l => {
    const leftright = l.split(' | ');
    const right = leftright[1].split(' ');

    right.forEach(t => {
        console.log(`${t} ${t.length}`);
        if (t.length === 2) {
            numUniques++;
        }
        if (t.length === 4) {
            numUniques++;
        }
        if (t.length === 3) {
            numUniques ++;
        }
        if (t.length === 7) {
            numUniques++;
        }
    });
})

console.log(numUniques);

let sum = 0;
lines.forEach(l => {
    const leftright = l.split(' | ');

    const left = leftright[0].split(' ');
    let digitMap = {};
    left.forEach(t => {
        if (t.length === 2) {
            // console.log(`one is ${t}`);
            digitMap[1] = t;
        }
        if (t.length === 4) {
            // console.log(`four is ${t}`)
            digitMap[4] = t;
        }
        if (t.length === 3) {
            // console.log(`seven is ${t}`);
            digitMap[7] = t;
        }
        if (t.length === 7) {
            // console.log(`eight is ${t}`);
            digitMap[8] = t;
        }
    })
    // 1
    const segOneA = digitMap[1][0];
    const segOneB = digitMap[1][1];

    // 4
    const fourSegA = digitMap[4][0];
    const fourSegB = digitMap[4][1];
    const fourSegC = digitMap[4][2];
    const fourSegD = digitMap[4][3];

    const sixMap = {};
    const zeroMap = {};
    const nineMap = {};
    const threeMap = {};
    const fiveMap = {};
    const twoMap = {};
    left.forEach(l => {
        // scan for length 6
        if (l.length === 6) {
            let segMap = {};
            let i;
            for (i = 0; i < 6; i++) {
                segMap[l[i]] = true;
            }

            // try the segments from 1
            // figure out 6
            if ((segMap[segOneA] === undefined) || (segMap[segOneB] === undefined)) {
                // console.log(`6 is ${l}`);
                digitMap[6] = l;
                // create the sixmap
                for (i = 0; i < 6; i++) {
                    sixMap[l[i]] = true;
                }
            } else {
                // try the segments for 4

                if ((segMap[fourSegA] === undefined) ||
                    (segMap[fourSegB] === undefined) ||
                    (segMap[fourSegC] === undefined) ||
                    (segMap[fourSegD] === undefined)
                ) {
                    // this is 0
                    // console.log(`0 is ${l}`);
                    digitMap[0] = l;
                    for (i = 0; i < 6; i++) {
                        zeroMap[l[i]] = true;
                    }
                } else {
                    // this is 9
                    // console.log(`9 is ${l}`);
                    digitMap[9] = l;
                    for (i = 0; i < 6; i++) {
                        nineMap[l[i]] = true;
                    }
                }
            }
        }
    });

    left.forEach(l => {
        if (l.length === 5) {
            let segMap = {};
            let i;
            for (i=0; i<5; i++) {
                segMap[l[i]] = true;
            }

            // try the segments for 1
            if ((segMap[segOneA] === true) && (segMap[segOneB] === true)) {
                // console.log(`3 is ${l}`);
                digitMap[3] = l;
                for (i=0; i<5; i++) {
                    threeMap[l[i]] = true;
                }
            } else {
                let isFive = true;
                for (i=0; i<5; i++) {
                    if (sixMap[l[i]] === undefined) {
                        isFive = false;
                    }
                }
                if (isFive === true) {
                    // console.log(`5 is ${l}`);
                    digitMap[5] = l;
                    for (i=0; i<5; i++) {
                        fiveMap[l[i]] = true;
                    }
                } else {
                    // it's 2
                    // console.log(`2 is ${l}`);
                    digitMap[2] = l;
                    for (i=0; i<5; i++) {
                        twoMap[l[i]] = true;
                    }
                }
            }
        }
    })

    // console.log(digitMap);

    const decode = (code) => {
        if (code.length === 2) {
            return '1';
        } else if (code.length === 4) {
            return '4';
        } else if (code.length === 3) {
            return '7';
        } else if (code.length === 7) {
            return '8';
        } else {
            let segMap = {};
            let i;
            for (i = 0; i < code.length; i++) {
                segMap[code[i]] = true;
            }
            if (code.length === 6) {
                // check one
                if ((segMap[segOneA] === undefined) || (segMap[segOneB] === undefined)) {
                    return '6';
                } else {
                    if ((segMap[fourSegA] === undefined) ||
                        (segMap[fourSegB] === undefined) ||
                        (segMap[fourSegC] === undefined) ||
                        (segMap[fourSegD] === undefined)
                    ) {
                        return '0';
                    } else {
                        return '9'
                    }
                }
            } else if (code.length === 5) {
                if ((segMap[segOneA] === true) && (segMap[segOneB] === true)) {
                    return '3';
                } else {
                    let isFive = true;
                    for (i=0; i<5; i++) {
                        if (sixMap[code[i]] === undefined) {
                            isFive = false;
                        }
                    }
                    if (isFive === true) {
                        return '5';
                    } else {
                        return '2';
                    }
                }
            }
        }
        console.log(`unknown code ${code}`);
    }
    const right = leftright[1].split(' ');

    const digits = right.map(r => decode(r));
    const digitString = digits.reduce((acc, val) => {
        return acc+val;
    }, '');
    const value = parseInt(digitString, 10);
    console.log(value);
    sum += value;
});

console.log(`the sum is ${sum}`);