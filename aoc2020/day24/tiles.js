const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

const encode = (q, r) => {
    return `${q}_${r}`;
}

const decode = (hash) => {
    let terms = hash.split("_");
    return [terms[0]*1, terms[1]*1];
}

let numBlack = 0;
let map = {};
lines.forEach(l => {
    let i = 0;
    let east = 0;
    let west = 0;
    let northeast = 0;
    let northwest = 0;
    let southeast = 0;
    let southwest = 0;
    let q = 0;
    let r = 0;
    while (i < l.length) {
        if (l[i] === 'e') {
            // console.log('e');
            east ++;
            q++;
            i++;
        } else if (l[i] === 'w') {
            // console.log('w');
            west ++;
            q--;
            i++;
        } else if (l[i] === 's') {
            if (l[i+1] === 'e') {
                // console.log('se');
                southeast ++;
                r++;
                i+=2;
            } else if (l[i+1] === 'w') {
                // console.log('sw');
                southwest ++;
                q--;
                r++;
                i+=2;
            } else {
                throw new Error(`south error ${l[i]} ${l[i+1]}`);
            }
        } else if (l[i] === 'n') {
            if (l[i+1] === 'e') {
                // console.log('ne');
                northeast ++;
                q++;
                r--;
                i+=2;
            } else if (l[i+1] === 'w') {
                // console.log('nw');
                northwest ++;
                r--;
                i+=2;
            }
        } else {
            throw new Error(`unknown error ${l[i]}`);
        }
    }

    let key = encode(q, r);
    if (map[key] === undefined) {
        map[key] = 1;
    } else {
        map[key] ++;
    }
})

let currentBlack = {};
for ([key, val] of (Object.entries(map))) {
    console.log(`${key} ${val}`);
    if (val % 2 === 0) {
        // console.log(`white ${val}`);
    } else {
        // console.log(`black ${val}`);
        numBlack++;
        currentBlack[key] = 1;
    }
}
console.log(map);
console.log(`total black ${numBlack}`);

const simulateDay = (map) => {
    let nextDayBlack = {};
    let currentWhite = {};

    // iterate through all blacks
    for ([key, val] of (Object.entries(map))) {
        let [q, r] = decode(key);
        let neighbor_key;
        let num_black_neighbors = 0;

        const categorize = (neighbor) => {
            if (map[neighbor] !== undefined) {
                num_black_neighbors++;
            } else if (currentWhite[neighbor] === undefined) {
                currentWhite[neighbor] = 1;
            } else {
                currentWhite[neighbor] ++;
            }
        }

        // look at each neighbor of 6 neighbors
        neighbor_key = encode(q, r-1);
        categorize(neighbor_key);

        neighbor_key = encode(q, r+1);
        categorize(neighbor_key);

        neighbor_key = encode(q+1, r-1);
        categorize(neighbor_key);

        neighbor_key = encode(q+1, r);
        categorize(neighbor_key);

        neighbor_key = encode(q-1, r);
        categorize(neighbor_key);

        neighbor_key = encode(q-1, r+1);
        categorize(neighbor_key);

        if ((num_black_neighbors === 1) || (num_black_neighbors === 2)) {
            // black has 2 black neighbors
            nextDayBlack[key] = 1;
        }
    }

    for ([key, val] of Object.entries(currentWhite)) {
        if (val === 2) {
            nextDayBlack[key] = 1;
        }
    }

    return nextDayBlack;
}

const maxDay = 100;
for (let day=0; day<maxDay; day++) {
    let nextDayBlack = simulateDay(currentBlack);
    console.log(`Day ${day+1}: ${Object.keys(nextDayBlack).length} `);
    currentBlack = nextDayBlack;
}