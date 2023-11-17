const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split('\n');

const height = lines.length;
const width = lines[0].length;

console.log(`field is ${height} ${width}`);

const indexToString = (r, c) => {
    return `${r}_${c}`;
}
// we will index all walls as -1 and the origin as the first spot entered
const wallMap = {}
let winds = [];
let windMap = {}
let exitRow, exitCol;
let originRow, originCol;

lines.forEach((l, row) => {
    let c;
    for (c=0; c<l.length; c++) {
        if (l[c] === "#") {
            const key = indexToString(row-1, c-1);
            wallMap[key] = 1;
        } else if ((l[c] === 'E') || (row===0 && l[c] === '.')) {
            // origin
            console.log(`origin at ${row-1} ${c-1}`);
            originRow = row-1;
            originCol = c-1;
        } else if (l[c] === ".") {
            // free space
        } else {
            // wind
            // console.log(l[c]);
            const wind = {
                wind: l[c],
                r: row-1,
                c: c-1
            }
            winds.push(wind);
            const key = indexToString(row-1, c-1);
            windMap[key] = wind;
        }
        if (row === height-1) {
            // scan last row for exit
            if (l[c] === ".") {
                console.log(`exit at ${row-1} ${c-1}`)
                exitRow = row-1;
                exitCol = c-1;
            }
        }
    }
})

console.log(winds);

const getWind = (w, time) => {
    let maxC = width-3;
    let maxR = height-3;
    let rmod = height-2;
    let cmod = width-2;
    if (w.wind === "^") {
        // subtracting R
        return {
            r: (w.r + time*maxR) % rmod,
            c: w.c,
        }
    } else if (w.wind === "v") {
        // adding R
        return {
            r: (w.r+time) % rmod,
            c: w.c,
        }
    } else if (w.wind === ">") {
        // adding c
        return {
            r: w.r,
            c: (w.c+time) % cmod,
        }
    } else if (w.wind === "<") {
        // subtract c
        return {
            r: w.r,
            c: (w.c + time*maxC) % cmod
        }
    } else {
        console.log(`weird wind ${w.wind}`);
        throw "weird wind"
    }
}

const prettyPrint = (wallMap, windMap) => {
    let r, c;

    for (r=-1; r<height-1; r++) {
        let line = "";
        for (c=-1;c<width-1; c++) {
            const key = indexToString(r, c);
            if (wallMap[key] !== undefined) {
                line += "#";
            } else if (windMap[key] !== undefined) {
                if (windMap[key].count === 1) {
                    line += windMap[key].wind;
                } else {
                    // line += windMap[key].count;
                    line += "*";
                }
            } else {
                line += "."
            }
        }
        console.log(line);
    }
}

const getWindMap = (time) => {
    let windMap = {}
    winds.forEach(w => {
        let wind = getWind(w, time);
        let key = indexToString(wind.r, wind.c);
        if (windMap[key] === undefined) {
            windMap[key] = {
                r: wind.r,
                c: wind.c,
                count: 1,
                wind: w.wind
            }
        } else {
            windMap[key].count ++;
        }
    })

    return windMap;
}

// prettyPrint(wallMap, windMap);
const testWinds = () => {
    let t;
    for (t=0; t<19; t++) {
        windMap = getWindMap(t);
        console.log(`wind at time ${t}`);
        prettyPrint(wallMap, windMap);
    }
}

const getNextFrontier = (points, windMap) => {
    let nextFrontier = {}
    for (const [key, point] of Object.entries(points)) {
        // check all the points u, d, l, r, still
        // test them against wall and wind
        const upKey = indexToString(point.r-1, point.c);
        if ((point.r > -1) && (windMap[upKey] === undefined) && (wallMap[upKey] === undefined)) {
            nextFrontier[upKey] = {
                r: point.r-1,
                c: point.c
            }
        }
        const downKey = indexToString(point.r+1, point.c);
        if ((point.r < exitRow) && (windMap[downKey] === undefined) && (wallMap[downKey] === undefined)) {
            nextFrontier[downKey] = {
                r: point.r+1,
                c: point.c
            }
        }
        const leftKey = indexToString (point.r, point.c-1);
        if ((windMap[leftKey] === undefined) && (wallMap[leftKey] === undefined)) {
            nextFrontier[leftKey] = {
                r: point.r,
                c: point.c-1
            }
        }
        const rightKey = indexToString (point.r, point.c+1);
        if ((windMap[rightKey] === undefined) && (wallMap[rightKey] === undefined)) {
            nextFrontier[rightKey] = {
                r: point.r,
                c: point.c + 1
            }
        }
        const stillKey = indexToString(point.r, point.c);
        if (windMap[stillKey] === undefined) {
            nextFrontier[stillKey] = {
                r: point.r,
                c: point.c
            }
        }
    }
    return nextFrontier;
}

const getNextFrontier2 = (points, windMap) => {
    let nextFrontier = {}
    for (const [key, point] of Object.entries(points)) {
        // check all the points u, d, l, r, still
        // test them against wall and wind
        const upKey = indexToString(point.r-1, point.c);
        if ((point.r > -1) && (windMap[upKey] === undefined) && (wallMap[upKey] === undefined)) {
            nextFrontier[upKey] = {
                r: point.r-1,
                c: point.c
            }
        }
        const downKey = indexToString(point.r+1, point.c);
        if ((point.r < exitRow) && (windMap[downKey] === undefined) && (wallMap[downKey] === undefined)) {
            nextFrontier[downKey] = {
                r: point.r+1,
                c: point.c
            }
        }
        const leftKey = indexToString (point.r, point.c-1);
        if ((windMap[leftKey] === undefined) && (wallMap[leftKey] === undefined)) {
            nextFrontier[leftKey] = {
                r: point.r,
                c: point.c-1
            }
        }
        const rightKey = indexToString (point.r, point.c+1);
        if ((windMap[rightKey] === undefined) && (wallMap[rightKey] === undefined)) {
            nextFrontier[rightKey] = {
                r: point.r,
                c: point.c + 1
            }
        }
        const stillKey = indexToString(point.r, point.c);
        if (windMap[stillKey] === undefined) {
            nextFrontier[stillKey] = {
                r: point.r,
                c: point.c
            }
        }
    }
    return nextFrontier;
}

const simulate = () => {
    let t = 1;
    let frontier = {};
    let exitKey = indexToString(exitRow, exitCol);
    console.log(exitKey);
    let originKey = indexToString(originRow, originCol);
    console.log(originKey);
    frontier[originKey] = {
        r: originRow,
        c: originCol
    };
    console.log(frontier);
    console.log(`origin ${originRow} ${originCol}`);

    do {
        let windMap = getWindMap(t);
        let nextFrontier = getNextFrontier(frontier, windMap);
        console.log(`simulating time ${t} ${Object.keys(nextFrontier).length} points`);
        // console.log(nextFrontier)
        t = t + 1;
        frontier = nextFrontier;
    } while ((frontier[exitKey] === undefined));

    console.log(`done at exit ${t-1}`);
    console.log(frontier[exitKey]);
    frontier = {}
    exitKey = indexToString(originRow, originCol)
    console.log(exitKey);
    originKey = indexToString(exitRow, exitCol);
    console.log(originKey);
    frontier[originKey] = {
        r: exitRow,
        c: exitCol
    }
    do {
        let windMap = getWindMap(t);
        let nextFrontier = getNextFrontier(frontier, windMap);
        console.log(`simulating time ${t} ${Object.keys(nextFrontier).length} points`);
        // console.log(nextFrontier)
        t = t + 1;
        frontier = nextFrontier;
    } while ((frontier[exitKey] === undefined));
    console.log(`done at origin ${t-1}`);

    frontier = {}
    exitKey = indexToString(exitRow, exitCol)
    console.log(exitKey);
    originKey = indexToString(originRow, originCol);
    console.log(originKey);
    frontier[originKey] = {
        r: originRow,
        c: originCol,
    }
    do {
        let windMap = getWindMap(t);
        let nextFrontier = getNextFrontier(frontier, windMap);
        console.log(`simulating time ${t} ${Object.keys(nextFrontier).length} points`);
        // console.log(nextFrontier)
        t = t + 1;
        frontier = nextFrontier;
    } while ((frontier[exitKey] === undefined));
    console.log(`done at origin ${t-1}`);
}

// testWinds();

simulate();