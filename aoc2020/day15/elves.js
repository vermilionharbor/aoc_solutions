
const findLargest = (map) => {
    let largest = 0;
    for (const[key, val] of Object.entries(map)) {
        if (val > largest) {
            largest = val;
        }
    }
    return largest;
}
const findSmallest = (map) => {
    let smallest = 2020;
    for (const[key, val] of Object.entries(map)) {
        if (val < smallest) {
            smallest = val;
        }
    }
    return smallest;
}

let map;
const elf = (starters, finalRound) => {
    map = {};

    // map[a] = 1;
    // map[b] = 2;
    // map[c] = 3;
    starters.forEach((v, index) => {
        map[v] = index + 1;
    });

    let turn = starters.length + 1;
    let lastTurn = finalRound;
    let nextVal = 0;
    let curVal;
    while (turn <= lastTurn) {
        curVal = nextVal;
        if (turn % 10000 === 0) {
            console.log(`${turn} ${curVal}`);
            console.log(`*${Object.keys(map).length}`);
        }
        // console.log(`*${findLargest(map)}`);
        // console.log(map);
        if (map[curVal] === undefined) {
            nextVal = 0;
        } else {
            nextVal = turn - map[curVal];
        }
        map[curVal] = turn;
        turn += 1;
    }
    return curVal;
}

let finalRound = 2020;
console.log(`elf(0,3,6) = ${elf([0,3,6], finalRound)}`);
// console.log(`elf(1,3,2) = ${elf([1,3,2], finalRound)}`);
// console.log(`elf(2,1,3) = ${elf([2,1,3], finalRound)}`);
// console.log(`elf(1,2,3) = ${elf([1,2,3], finalRound)}`);
// console.log(`elf(2,3,1) = ${elf([2,3,1], finalRound)}`);
// console.log(`elf(3,2,1) = ${elf([3,2,1], finalRound)}`);
// console.log(`elf(3,1,2) = ${elf([3,1,2], finalRound)}`);

// console.log(elf([0,13,16,17,1,10,6], 2020));
// console.log(map);
// console.log(findSmallest(map));
finalRound = 30000000;
console.log(`elf(0,3,6) = ${elf([0,3,6], finalRound)}`);
// console.log(`elf(1,3,2) = ${elf([1,3,2], finalRound)}`);
// console.log(`elf(2,1,3) = ${elf([2,1,3], finalRound)}`);
// console.log(`elf(1,2,3) = ${elf([1,2,3], finalRound)}`);
// console.log(`elf(2,3,1) = ${elf([2,3,1], finalRound)}`);
// console.log(`elf(3,2,1) = ${elf([3,2,1], finalRound)}`);
// console.log(`elf(3,1,2) = ${elf([3,1,2], finalRound)}`);
//
// console.log(elf([0,13,16,17,1,10,6], finalRound));