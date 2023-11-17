const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');


let sum = 0;
let displayBuffer = [];
let lineBuffer = "";
let pixIndex = 0;

const dumpCycle = (cycle, x) => {
    // console.log(`cycle ${cycle} ${x}`);
    if((x === pixIndex) || ((x+1) === pixIndex ) || ((x-1) === pixIndex)) {
        lineBuffer += "#";
    } else {
        lineBuffer += ".";
    }
    switch (cycle) {
        // case 20:
        // case 60:
        // case 100:
        // case 140:
        // case 180:
        // case 220:
        case 40:
        case 80:
        case 120:
        case 160:
        case 200:
        case 240:
            const signalStrength = x * cycle;
            sum += signalStrength;
            console.log(`cycle ${cycle} signal strength is ${signalStrength} ${sum}`);
            pixIndex = 0;
            displayBuffer.push(lineBuffer);
            lineBuffer = "";
            break;
        default:
            pixIndex++;
            break;
    }
}

let x = 1;
let cycle = 1;

lines.forEach(l => {
    // console.log(l);
    const terms = l.split(' ');
    if (terms[0] === 'noop') {
        // console.log('noop');
        dumpCycle(cycle, x);
        cycle ++;
    } else {
        // addx
        const imm = parseInt(terms[1], 10);
        // console.log(`addx ${imm}`);
        dumpCycle(cycle, x);
        cycle ++;

        dumpCycle(cycle, x);
        cycle ++;
        x += imm;
    }
});

displayBuffer.forEach(l => {
    console.log(l);
});


