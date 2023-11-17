const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');


let sum = 0;

const dumpCycle = (cycle, x) => {
    // console.log(`cycle ${cycle} ${x}`);
    switch (cycle) {
        case 20:
        case 60:
        case 100:
        case 140:
        case 180:
        case 220:
            const signalStrength = x * cycle;
            sum += signalStrength;
            console.log(`cycle ${cycle} signal strength is ${signalStrength} ${sum}`);
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

