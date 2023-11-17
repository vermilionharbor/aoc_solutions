const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString();

console.log(lines);

let fish = lines.split(',').map(term => parseInt(term, 10));

console.log(fish);

const fishBins = [0, 0, 0, 0, 0, 0, 0, 0, 0];
fish.forEach(f => {
   fishBins[f] ++;
});

const simulateDay = (fishBins) => {
    const births = fishBins[0];
    fishBins[0] = fishBins[1];
    fishBins[1] = fishBins[2];
    fishBins[2] = fishBins[3];
    fishBins[3] = fishBins[4];
    fishBins[4] = fishBins[5];
    fishBins[5] = fishBins[6];
    fishBins[6] = fishBins[7] + births;
    fishBins[7] = fishBins[8];
    fishBins[8] = births;
}

const countFish = (fishBins) => {
    return fishBins.reduce((acc, bin) => {
        return acc + bin;
    }, 0)
}


let day;
for (day=0; day<256; day++) {
    simulateDay(fishBins);
    console.log(`day ${day+1} ${countFish(fishBins)} fish`);
}

