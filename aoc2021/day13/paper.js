const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let i = 0;
const points = [];
while (lines[i] !== "") {
    const term = lines[i].split(',');
    points.push({
        x: term[0],
        y: term[1],
    })
    console.log(lines[i++]);
}

console.log(points);
i++;
console.log('instructions');
const instructions = [];
while (i < lines.length) {
    const term = lines[i++].split(" ");
    // console.log(term[2]);
    const axisValue = parseInt(term[2].slice(2), 10);
    if (term[2][0] === 'x') {
        instructions.push({axis: 'x', value: axisValue})
    } else if (term[2][0] === 'y') {
        instructions.push({axis: 'y', value: axisValue})
    }
}

const indexToString = (x, y) => {
    return `${x}_${y}`
}

const foldY = (points, yAxis) => {
    const pointMap = {};
    points.forEach(p => {
        if (p.y < yAxis) {
            // just add the point
            const key = indexToString(p.x, p.y);
            pointMap[key] = {
                x: p.x,
                y: p.y,
            }
        } else {
            // transform by y, yaxis-p.y +yaxis
            const newY = yAxis - (p.y - yAxis);
            const key = indexToString(p.x, newY);
            pointMap[key] = {
                x: p.x,
                y: newY,
            }
        }
    });
    const newPoints = [];
    for (const [key, val] of Object.entries(pointMap)) {
        newPoints.push(val);
    }
    return newPoints;
}

const foldX = (points, xAxis) => {
    const pointMap = {};
    points.forEach(p => {
        if (p.x < xAxis) {
            // just add the point
            const key = indexToString(p.x, p.y);
            pointMap[key] = {
                x: p.x,
                y: p.y,
            }
        } else {
            // transform by x, xAxis-p.x +xAxis
            const newX = xAxis - (p.x - xAxis);
            const key = indexToString(newX, p.y);
            pointMap[key] = {
                x: newX,
                y: p.y,
            }
        }
    });
    const newPoints = [];
    for (const [key, val] of Object.entries(pointMap)) {
        newPoints.push(val);
    }
    return newPoints;
}

const prettyPrint = (points, xMax, yMax) => {
    let x, y;
    const pointsMap = {};
    points.forEach(p => {
        const key = indexToString(p.x, p.y);
        pointsMap[key] = 1;
    });
    for (y=0; y<yMax; y++) {
        let lineBuffer = '';
        for (x=0; x<xMax; x++) {
            if (pointsMap[indexToString(x, y)] !== undefined) {
                lineBuffer += '*';
            } else {
                lineBuffer += ' ';
            }
        }
        console.log(lineBuffer);
    }
}

// console.log(instructions);
let lastX, lastY;
let nextPoints = points;
    instructions.forEach((fold, index) => {
    if (fold.axis === 'x') {
        lastX = fold.value;
        console.log(`fold x ${fold.value}`)
        nextPoints = foldX(nextPoints, fold.value);
    } else if (fold.axis === 'y') {
        lastY = fold.value;
        console.log(`fold y ${fold.value}`)
        nextPoints = foldY(nextPoints, fold.value);
    }
    console.log(`${index+1} numPoints ${nextPoints.length}`)
});

console.log(`LAST: x ${lastX}, y ${lastY}`);
prettyPrint(nextPoints, lastX, lastY);
//let nextPoints = foldY(points, 7);
//nextPoints = foldX(nextPoints, 5);
//console.log(nextPoints.length);
