const fs = require('fs');


// boat starts facing east, make that positive X in cartesian coordinates
const eastChart = {
    x: 1,
    y: 0
}

const northChart = {
    x: 0,
    y: 1
}

const westChart = {
    x: -1,
    y: 0
}

const southChart = {
    x: 0,
    y: -1
}

const boatChart = [
    northChart, // 0
    eastChart,
    southChart,
    westChart
];

const turnBoat = (deg, leftright, direction) => {
    const degrees = deg*1;
    if (leftright === 'L') {
        //console.log('turning left', degrees)
        direction = (direction + 360 - degrees) % 360;
    } else if (leftright === 'R') {
        // console.log('turning right', degrees, (direction + degrees), (direction + degrees) % 360)
        direction = (direction + degrees) % 360;
        // console.log('new direction', direction)
    }
    return direction;
}

const turnNav = (deg, leftright, navX, navY) => {
    let degrees = deg*1;
    if (leftright === 'L') {
        degrees = 360 - degrees;
    }
    let resultX, resultY;
    switch (degrees) {
        case 90:
            // right 90
            resultX = navY;
            resultY = -navX;
            break;
        case 180:
            // right 180
            resultX = -navX;
            resultY = -navY;
            break;
        case 270:
            // right 270
            resultX = -navY;
            resultY = navX;
            break;
        default:
            throw new Error(`Unexpected angle ${degrees} ${deg} ${leftright}`);
    }

    return [resultX, resultY];
}

let boat = {
    direction: 90,
    x: 0,
    y: 0
}

const nav = fs.readFileSync("input2.txt").toString().split('\n');

nav.forEach(command => {
    // console.log(command);
    if (command.length > 0) {
        const instruction = command[0];
        const instructionValue = command.slice(1, command.length);
        let currentChart;
        let chartIndex;
        console.log(`${instruction} ${instructionValue}`);
        switch (instruction) {
            case 'L':
            case 'R':
                boat.direction = turnBoat(instructionValue, instruction, boat.direction);
                break;
            case 'F':
                chartIndex = boat.direction / 90;
                currentChart = boatChart[chartIndex];
                boat.x = boat.x + currentChart.x * instructionValue;
                boat.y = boat.y + currentChart.y * instructionValue;
                break;
            case 'N':
                currentChart = northChart;
                boat.x = boat.x + currentChart.x * instructionValue;
                boat.y = boat.y + currentChart.y * instructionValue;
                break;
            case 'S':
                currentChart = southChart;
                boat.x = boat.x + currentChart.x * instructionValue;
                boat.y = boat.y + currentChart.y * instructionValue;
                break;
            case 'E':
                currentChart = eastChart;
                boat.x = boat.x + currentChart.x * instructionValue;
                boat.y = boat.y + currentChart.y * instructionValue;
                break;
            case 'W':
                currentChart = westChart;
                boat.x = boat.x + currentChart.x * instructionValue;
                boat.y = boat.y + currentChart.y * instructionValue;
                break;
            default:
                console.log('**** failure *****', command, instruction, instructionValue);
                throw new Error(`unexpected instruction ${command}`)
                break;
        }
    }
    console.log(boat);
});

console.log(`manhattan value ${Math.abs(boat.x) + Math.abs(boat.y)}`);

let wayPoint = {
    x: 10,
    y: 1
}

boat = {
    x: 0,
    y: 0
}

nav.forEach(command => {
    // console.log(command);
    if (command.length > 0) {
        const instruction = command[0];
        const instructionValue = command.slice(1, command.length)*1;
        let currentChart;
        let chartIndex;
        let newX, newY;
        console.log(`${instruction} ${instructionValue}`);
        switch (instruction) {
            case 'L':
            case 'R':
                boat.direction = turnBoat(instructionValue, instruction, boat.direction);
                [newX, newY] = turnNav(instructionValue, instruction, wayPoint.x, wayPoint.y );
                wayPoint.x = newX;
                wayPoint.y = newY;
                break;
            case 'F':
                boat.x = boat.x + wayPoint.x * instructionValue;
                boat.y = boat.y + wayPoint.y * instructionValue;
                break;
            case 'N':
                wayPoint.y = wayPoint.y + instructionValue;
                break;
            case 'S':
                wayPoint.y = wayPoint.y - instructionValue;
                break;
            case 'E':
                wayPoint.x = wayPoint.x + instructionValue;
                break;
            case 'W':
                wayPoint.x = wayPoint.x - instructionValue;
                break;
            default:
                console.log('**** failure *****', command, instruction, instructionValue);
                throw new Error(`unexpected instruction ${command}`)
                break;
        }
    }
    console.log("waypoint", wayPoint);
    console.log("boat", boat);
});

console.log(`manhattan value ${Math.abs(boat.x) + Math.abs(boat.y)}`);

