const fs = require('fs');

const crabs = fs.readFileSync("input.txt").toString().split(',').map(val => parseInt(val, 10));

console.log(crabs);

let i;
let min = crabs[0];
let max = crabs[0];
for (i=1; i<crabs.length; i++) {
    if (crabs[i] < min) {
        min = crabs[i];
    }
    if (crabs[i] > max) {
        max = crabs[i];
    }
}

console.log(`min: ${min} max: ${max}`);
const findFuel = (crabs, pos) => {
    const fuel = crabs.reduce((acc, c) => {
        return acc + Math.abs(c - pos);
    }, 0);
    return fuel;
}

const fuelSum = (distance) => {
    let sum = 0;
    let i;
    for (i=1; i<=distance; i++) {
        sum += i;
    }
    return sum;
}

const findFuel2 = (crabs, pos) => {
    const fuel = crabs.reduce((acc, c) => {
        let temp = fuelSum(Math.abs(c-pos));
        // console.log(temp);
        return acc + temp;
    }, 0);
    return fuel;
}

let minFuel = -1;
for (i=min; i<= max; i++) {
    const fuel = findFuel2(crabs, i);
    console.log(`${i}: ${fuel}`);
    if ((minFuel === -1) || (fuel < minFuel)) {
        minFuel = fuel;
    }
}

console.log(`min fuel: ${minFuel}`);


