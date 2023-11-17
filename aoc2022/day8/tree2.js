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


let r, c;
const width = field[0].length;
const height = field.length;
let maxView = 0;
let pointsVisited = 0;

for (r=1; r<height-1; r++) {
    for (c=1; c<width-1; c++) {
        // traverse up
        let x=c;
        let y=r-1;
        let distanceUp = 0;
        // if ((r === 3) && (c === 2)) {
        //     console.log(`maxHeight ${maxHeight} ${x} ${y}`);
        // }
        while (y >= 0) {
            distanceUp ++;

            if (field[y][x] >= field[r][c]) {
                break;
            }
            y--;
        }

        // traverse down
        x=c;
        y=r+1;
        let distanceDown = 0;
        while (y < height) {
            distanceDown ++;
            if (field[y][x] >= field[r][c]) {
                break;
            }
            y++;
        }


        // traverse right
        x=c+1;
        y=r;
        let distanceRight = 0;
        while (x<width) {
            distanceRight ++;
            if (field[y][x] >= field[r][c]) {
                break;
            }
            x++;
        }

        // traverse left
        x=c-1;
        y=r;
        let distanceLeft = 0;
        while (x>=0) {
            distanceLeft ++;
            if (field[y][x] >= field[r][c]) {
                break;
            }
            x--;
        }
        const viewDistance = distanceUp * distanceDown * distanceRight * distanceLeft;
        // console.log(viewDistance);
        visibleMap[r][c] = viewDistance;
        if (viewDistance > maxView) {
            maxView = viewDistance;
            console.log(`maxView ${maxView}, ${r} ${c}, ${distanceUp} ${distanceDown} ${distanceLeft} ${distanceRight}, **${field[r][c]}`);
        }
        pointsVisited ++;
    }
}

// printField(visibleMap);

console.log(`${width} ${height} ${pointsVisited}`);
console.log(`max view is ${maxView}`);



