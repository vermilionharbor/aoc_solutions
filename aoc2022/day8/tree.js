const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const field = [];
lines.forEach(l => {
    const rowLen = l.length;
    let i;
    const row = [];
    for (i=0; i<rowLen; i++) {
        row.push(parseInt(l[i], 10));
    }
    field.push(row);
})

field.forEach(r => {
    console.log(r);
});

console.log(`total ${field.length} rows`);

const visibleMap = [];
field.forEach(r => {
   const row = r.map(v => 0);
   visibleMap.push(row);
});

const printField = (field) => {
    field.forEach(r => {
        console.log(r);
    });
    console.log(`total ${field.length} rows`);
}


// traverse left to right
let r, c;
const width = field[0].length;
const height = field.length;
for (r=0; r<height; r++) {
    // first col is visible
    visibleMap[r][0] = 1;
    let maxHeight = field[r][0];
    c=1;
    while (c < width) {
        if (field[r][c] > maxHeight) {
            visibleMap[r][c] = 1;
            maxHeight = field[r][c];
        }
        c++;
    }
}

printField(visibleMap);

// traverse top to bottom
for (c=0; c<width; c++) {
    // first row is visible
    visibleMap[0][c] = 1;
    let maxHeight = field[0][c];
    r = 1;
    while (r < height) {
        if (field[r][c] > maxHeight) {
            visibleMap[r][c] = 1;
            maxHeight = field[r][c];
        }
        r++;
    }
}

// traverse right to left
for (r=0; r<height; r++) {
    // last col is visible
    visibleMap[r][width-1] = 1;
    let maxHeight = field[r][width-1];
    c=width-2;
    while (c > 0) {
        if (field[r][c] > maxHeight) {
            visibleMap[r][c] = 1;
            maxHeight = field[r][c];
        }
        c--;
    }
}

// traverse bottom to top
for (c=0; c<width; c++) {
    // first row is visible
    visibleMap[height-1][c] = 1;
    let maxHeight = field[height-1][c];
    r = height-1;
    while (r > 0) {
        if (field[r][c] > maxHeight) {
            visibleMap[r][c] = 1;
            maxHeight = field[r][c];
        }
        r--;
    }
}

printField(visibleMap);

const countTrees = (field) => {
    let r, c;
    let sum = 0;
    const height = field.length;
    const width = field[0].length;
    for (r=0; r<height; r++) {
        for (c=0; c<width; c++) {
            if (field[r][c] > 0) {
                sum++;
            }
        }
    }
    return sum;
}

console.log(`total visible ${countTrees(visibleMap)}`);

