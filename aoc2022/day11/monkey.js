// Monkey 0:
// Starting items: 79, 98
// Operation: new = old * 19
// Test: divisible by 23
// If true: throw to monkey 2
// If false: throw to monkey 3
//
// Monkey 1:
// Starting items: 54, 65, 75, 74
// Operation: new = old + 6
// Test: divisible by 19
// If true: throw to monkey 2
// If false: throw to monkey 0
//
// Monkey 2:
// Starting items: 79, 60, 97
// Operation: new = old * old
// Test: divisible by 13
// If true: throw to monkey 1
// If false: throw to monkey 3
//
// Monkey 3:
// Starting items: 74
// Operation: new = old + 3
// Test: divisible by 17
// If true: throw to monkey 0
// If false: throw to monkey 1

const monkey = [
    [79, 98],
    [54, 65, 75, 74],
    [79, 60, 97],
    [74]
]

const numInspected = [0, 0, 0, 0];

const simulate = (monkey, numInspected) => {
    let i, j;
    let numItems;
    for (i=0; i<monkey.length; i++) {
        if (i === 0) {
            numItems = monkey[0].length;
            for (j=0; j<numItems; j++) {
                let curItem = monkey[0].shift();
                curItem = curItem * 19;
                curItem = Math.floor(curItem / 3);
                if (curItem % 23 === 0) {
                    monkey[2].push(curItem);
                } else {
                    monkey[3].push(curItem);
                }
                numInspected[0]++;
            }
        } else if (i === 1) {
            numItems = monkey[1].length;
            for (j=0; j<numItems; j++) {
                let curItem = monkey[1].shift();
                curItem = curItem + 6;
                curItem = Math.floor(curItem / 3);
                if (curItem % 19 === 0) {
                    monkey[2].push(curItem);
                } else {
                    monkey[0].push(curItem);
                }
                numInspected[1]++;
            }
        } else if (i === 2) {
            numItems = monkey[2].length;
            for (j=0; j<numItems; j++) {
                let curItem = monkey[2].shift();
                curItem = curItem * curItem;
                curItem = Math.floor(curItem / 3);
                if (curItem % 13 === 0) {
                    monkey[1].push(curItem);
                } else {
                    monkey[3].push(curItem);
                }
                numInspected[2]++;
            }
        } else if (i === 3) {
            numItems = monkey[3].length;
            for (j=0; j<numItems; j++) {
                let curItem = monkey[3].shift();
                curItem = curItem + 3;
                curItem = Math.floor(curItem / 3);
                if (curItem % 17 === 0) {
                    monkey[0].push(curItem);
                } else {
                    monkey[1].push(curItem);
                }
                numInspected[3]++;
            }
        } else {
            console.log('fail');
        }
    }
}

let numRounds;
for (numRounds = 0; numRounds < 20; numRounds++) {
    simulate(monkey, numInspected);
}

console.log(monkey);
console.log(numInspected);
sortedInspected = numInspected.sort((a, b) => b - a);
console.log(sortedInspected);
console.log(sortedInspected[0] * sortedInspected[1]);
