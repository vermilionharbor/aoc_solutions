const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const beacons = [];
lines.forEach(l => {
    const terms = l.split(" ");
    // 2, 3, 8, 9 have the numbers
    // console.log(`${terms[2]} ${terms[3]} ${terms[8]} ${terms[9]}`);
    const x1 = parseInt(terms[2].slice(2, terms[2].length-1), 10);
    const y1 = parseInt(terms[3].slice(2, terms[3].length-1), 10);
    const x2 = parseInt(terms[8].slice(2, terms[8].length-1), 10);
    const y2 = parseInt(terms[9].slice(2, terms[9].length), 10);
    console.log(`${x1} ${y1} ${x2} ${y2}`);
    beacons.push({
        x1, x1,
        y1, y1,
        x2, x2,
        y2, y2,
    });
})

const manhattan = (x1, y1, x2, y2) => {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}

const scanLine = (beacons, lineY, xLow, xHigh, solutions) => {
    console.log(`scanning line ${lineY}`);
    const points = [];
    beacons.forEach(b => {
        const manhattanRemainder = b.manhattan - Math.abs(b.y1-lineY);
        if (manhattanRemainder > 0) {
            // console.log(`${b.manhattan}, ${manhattanRemainder}`);
            // range will be x1+remainder, x1-remainder, lineY
            // const span = {
            //     x1: b.x1-manhattanRemainder,
            //     x2: b.x1+manhattanRemainder
            // }
            // console.log(`spans ${span.x1} to ${span.x2}`);
            points.push({
                x: b.x1-manhattanRemainder,
                kind: "start"
            });
            points.push({
                x: b.x1+manhattanRemainder,
                kind: "end"
            });
        } else {
            // console.log(`${b.manhattan}, ${manhattanRemainder},  out of range`);
        }
    });

    points.push({
        x: xLow,
        kind: "low"
    });
    points.push({
        x: xHigh,
        kind: "high"
    })
    points.sort((a,b) => a.x - b.x);
    // points.forEach(p => {
    //     console.log(JSON.stringify(p));
    // });

    let startPoint = 0;
    let stackDepth = 0;
    let i = 0;
    let acc = 0;
    let inRange = false;
    let uncoveredStart = 0;
    while (i < points.length) {
        if (points[i].kind === "start") {
            if (stackDepth === 0) {
                startPoint = points[i].x;
                if (inRange) {
                    console.log(`ending(1) range ${points[i].x - uncoveredStart}`);
                    solutions.push({
                        start: uncoveredStart,
                        end: points[i].x,
                        y: lineY,
                    });
                }
            }
            stackDepth ++;
        } else if (points[i].kind === "end") {
            stackDepth --;
            if (stackDepth === 0) {
                // console.log(`finished range ${points[i].x} to ${startPoint},  ${points[i].x - startPoint}`);
                acc += (points[i].x - startPoint);
                if (inRange) {
                    uncoveredStart = points[i].x
                    console.log(`starting(solutions) ${uncoveredStart}`);
                }
            }
        } else if (points[i].kind === "low") {
            inRange = true;
            if (stackDepth === 0) {
                uncoveredStart = points[i].x;
                console.log(`starting(solutionsX) ${uncoveredStart}`);
            }
        } else if (points[i].kind === "high") {
            inRange = false;
            if (stackDepth === 0) {
                console.log(`ending range(2) ${points[i].x - uncoveredStart}`);
                solutions.push({
                    start: uncoveredStart,
                    end: points[i].x,
                    y: lineY,
                });
            }
        }
        i++;
    }
    // console.log(`acc ${acc}`);
}


beacons.forEach(b => {
    const man = manhattan(b.x1, b.y1, b.x2, b.y2);
    // console.log(man);
    b.manhattan = man;
})

// scanLine(beacons, 2000000, 0, 4000000);
// scanLine(beacons, 10);

let i;
const solutions = [];
// for (i=0; i<20; i++) {
//     scanLine(beacons, i, 0, 20, solutions);
// }

for (i=0; i<4000000; i++) {
    scanLine(beacons, i, 0, 4000000, solutions);
}

solutions.forEach(s => {
    const range = s.end-s.start
    if (range > 1) {
        console.log(`line ${s.y} ${JSON.stringify(s)} ${range}`);
        console.log(`tuning ${(s.end-1)*4000000 + s.y}`);
    }
});

