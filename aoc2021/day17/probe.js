const testTarget = {
    xmin: 20,
    xmax: 30,
    ymin: -10,
    ymax: -5,
}

//target area: x=253..280, y=-73..-46
const target = {
    xmin: 253,
    xmax: 280,
    ymin: -73,
    ymax: -46,
}

const indexToString = (x, y) => {
    return `${x}_${y}`
}

const simulateStep = (probe) => {
    probe.x += probe.xVelocity;
    probe.y += probe.yVelocity;
    if (probe.xVelocity > 0) {
        probe.xVelocity --;
    } else if (probe.xVelocity < 0) {
        probe.xVelocity ++;
    }
    probe.yVelocity --;
}

const withinTarget = (probe, target) => {
    if ((probe.x >= target.xmin) && (probe.x <= target.xmax)
        && (probe.y >= target.ymin) && (probe.y <= target.ymax)) {
        return true;
    }
    return false;
}


const simulate = (target, xInitial, yInitial) => {
    probe = {
        x: 0, y: 0,
        xVelocity: xInitial,
        yVelocity: yInitial,
    }
    let maxY = 0;
    let noSolution = false;
    let result = false;
    let tooFast = false;

    while ((probe.xVelocity !== 0) || (probe.y >= target.ymin)) {
        if ((probe.y === 0) && (probe.yVelocity < target.ymin)) {
            tooFast = true;
        }
        if (withinTarget(probe, target)) {
            result = true;
        }
        simulateStep(probe);
        if (probe.y > maxY) {
            maxY = probe.y;
        }
    }
    noSolution = ((probe.x > target.xmax) && (result === false)) || (probe.x < target.xmin) || (tooFast);
    return [result, maxY, noSolution];
}

const maximizeHeight = (target, solutionMap) => {
    // probe would pass target after step 1
    let xVelocity = target.xmax;
    let maxY = 0;
    let yVelocity;
    while (xVelocity > 0) {
        let result, y, noSolution = false;
        yVelocity = 1;
        while (noSolution !== true) {
            [result, y, noSolution] = simulate(target, xVelocity, yVelocity);
            if (result === true) {
                const key = indexToString(xVelocity, yVelocity);
                solutionMap[key] = {
                    x: xVelocity,
                    y: yVelocity,
                };
                if (y > maxY) {
                    maxY = y;
                }
            }
            // console.log(`simulate ${xVelocity} ${yVelocity}, ${result}, ${y} ${noSolution}`);
            yVelocity++;
        }
        xVelocity--;
    }
    return maxY;
}

const shootLevel = (target, solutionMap) => {
    // probe would pass target after step 1
    let xVelocity = target.xmax;
    let maxY = 0;
    let yVelocity;
    while (xVelocity > 0) {
        let result, y, noSolution = false;
        yVelocity = 0;
        while (yVelocity >= target.ymin) {
            [result, y, noSolution] = simulate(target, xVelocity, yVelocity);
            if (result === true) {
                const key = indexToString(xVelocity, yVelocity);
                solutionMap[key] = {
                    x: xVelocity,
                    y: yVelocity,
                };
                if (y > maxY) {
                    maxY = y;
                }
            }
            // console.log(`simulate ${xVelocity} ${yVelocity}, ${result}, ${y} ${noSolution}`);
            yVelocity--;
        }
        xVelocity--;
    }
    return maxY;
}

const tryAll = (target, solutionMap) => {
    // probe would pass target after step 1
    let xVelocity = target.xmax;
    let maxY = 0;
    let yVelocity;
    while (xVelocity > 0) {
        let result, y, noSolution = false;
        yVelocity = 0;
        for (yVelocity = 2628; yVelocity >= target.ymin; yVelocity--) {
            [result, y, noSolution] = simulate(target, xVelocity, yVelocity);
            if (result === true) {
                const key = indexToString(xVelocity, yVelocity);
                solutionMap[key] = {
                    x: xVelocity,
                    y: yVelocity,
                };
                if (y > maxY) {
                    maxY = y;
                }
            }
            // console.log(`simulate ${xVelocity} ${yVelocity}, ${result}, ${y} ${noSolution}`);
        }
        xVelocity--;
    }
    return maxY;
}

//let [result, maxY] = simulate(target, 6, 3);
//console.log(result, maxY);
//[result, maxY] = simulate(target, 7, 2);
//console.log(result, maxY);
//[result, maxY] = simulate(target, 9, 0);
//console.log(result, maxY);
//[result, maxY] = simulate(target, 17, -4);
//console.log(result, maxY);
//[result, maxY] = simulate(target, 6, 9);
//console.log(result, maxY);

let theTarget = target;
const solutionMap = {};
//const result = maximizeHeight(theTarget, solutionMap);
//console.log(`ymax ${result}`);
//shootLevel(theTarget, solutionMap);
tryAll(theTarget, solutionMap);

let numSolutions = 0;
for (const [key, val] of Object.entries(solutionMap)) {
    numSolutions ++;
    // console.log(`solution ${val.x}, ${val.y}`);
}
console.log(`num solutions ${numSolutions}`)
// simulate(target, 7, 100);