const fs = require('fs');

const lines = fs.readFileSync("testinput.txt").toString();

console.log(lines);

let fish = lines.split(',').map(term => parseInt(term, 10));

console.log(fish);

const simulateDay = (fish) => {
    let births = 0;
    fish.forEach((f, index) => {
        if (f === 0) {
            births++;
            fish[index] = 6;
        } else {
            fish[index] --;
        }
    })
    while (births > 0) {
        fish.push(8);
        births--;
    }
    return fish;
}

let day;
for (day=0; day<80; day++) {
    fish = simulateDay(fish);
    // console.log(fish.reduce((acc, val) => {
    //     return acc + val + ',';
    // }, ''));
    console.log(`day ${day+1} ${fish.length} fish`);
}

