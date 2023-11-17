const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

const map = []

const height = lines.length;
const width = lines[0].length;
lines.forEach(l => {
    const points = [];
    let i;
    for (i=0; i<l.length; i++) {
        points.push(parseInt(l[i], 10));
    }
    map.push(points);
});

console.log(map);

let x, y;
let score = 0;
const mins = [];
for (y=0; y<height; y++) {
    for (x=0; x<width; x++) {
        let left = false;
        let right = false
        let top = false;
        let bottom = false;
        // check up
        top = (y === 0);
        if ((y > 0 ) && (map[y][x] < map[y-1][x])) {
            top = true;
        }
        // check down
        bottom = (y === height-1);
        if ((y < height-1) && (map[y][x] < map[y+1][x])) {
            bottom = true;
        }
        // check left
        left = (x === 0);
        if ((x > 0) && (map[y][x] < map[y][x-1])) {
            left = true;
        }
        // check right
        right = (x === width-1);
        if ((x < width-1) && (map[y][x] < map[y][x+1])) {
            right = true;
        }
        if (top && bottom && left && right) {
            mins.push({
                x: x,
                y: y,
            })
            score += map[y][x] + 1;
            // console.log(`min ${x} ${y} ${map[y][x]}`);
        }
    }
}

console.log(`mins ${mins.length} score ${score}`);
console.log(mins);

const exploreBasin = (map, x, y) => {
    if (map[y][x] >= 9) {
        return 0;
    }

    let score = 1;
    map[y][x] = 10;  // flag this point as done
    // top
    if (y > 0) {
        score += exploreBasin(map, x, y-1);
    }
    // bottom
    if (y < height-1) {
        score += exploreBasin(map, x, y+1);
    }
    // left
    if (x > 0) {
        score += exploreBasin(map, x-1, y);
    }
    // right
    if (x < width-1) {
        score += exploreBasin(map, x+1, y);
    }
    return score;
}

let basinSizes = mins.map(m => {
    let basinSize = exploreBasin(map, m.x, m.y);
    // console.log(`basin ${basinSize}`);
    // console.log(map);
    return basinSize;
});

basinSizes.sort(function(a, b){return b-a});
console.log(basinSizes);

console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);

