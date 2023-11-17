const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

const points = [];
const part2 = true;
lines.forEach(l => {
    const terms = l.split(' ');
    // console.log(`${terms[0]}_${terms[2]}`);
    const firstCoords = terms[0].split(',');
    const secondCoords = terms[2].split(',');
    points.push({
        origin: {
            x: parseInt(firstCoords[0], 10),
            y: parseInt(firstCoords[1], 10),
        },
        dest: {
            x: parseInt(secondCoords[0], 10),
            y: parseInt(secondCoords[1], 10),
        }
    });
});

// console.log(points);
const pointMap = {};

const insertMap = (map, x, y) => {
    if (map[x] === undefined) {
        map[x] = {}
    }
    const mapY = map[x];
    if (mapY[y] === undefined) {
        mapY[y] = 1;
    } else {
        mapY[y] ++;
    }
}

const countMap = (map) => {
    let sum = 0;
    for (const [key, val] of Object.entries(map)) {
        for (const [key2, val2] of Object.entries(val)) {
            if (val2 > 1) {
                sum ++;
            }
        }
    }
    return sum;
}

points.forEach(p => {
    let delta;
    console.log(p);
    if (p.origin.x === p.dest.x) {
        delta = (p.origin.y < p.dest.y) ? 1 : -1;
        let y = p.origin.y;
        do {
            // console.log(`adding ${p.origin.x} ${y}`);
            insertMap(pointMap, p.origin.x, y);
            y += delta;
        } while (y !== p.dest.y+delta);
    } else if (p.origin.y === p.dest.y) {
        delta = (p.origin.x < p.dest.x) ? 1 : -1;
        let x = p.origin.x;
        do {
            // console.log(`adding ${x} ${p.origin.y}`);
            insertMap(pointMap, x, p.origin.y);
            x += delta;
        } while (x !== p.dest.x+delta);
    } else if (part2 === true) {
        delta = (p.origin.y < p.dest.y) ? 1 : -1;
        let y = p.origin.y;
        let x = p.origin.x;
        let xdelta = (p.origin.x < p.dest.x) ? 1 : -1;
        do {
            // console.log(`adding ${x} ${y}`);
            insertMap(pointMap, x, y);
            x += xdelta;
            y += delta;
        } while (y !== p.dest.y+delta);
    } else {
        console.log(`skipping`);
    }
});

// console.log(pointMap);
const sum = countMap(pointMap);
console.log(`total ${sum}`);
