// Monkey 0:
// Starting items: 74, 73, 57, 77, 74
// Operation: new = old * 11
// Test: divisible by 19
// If true: throw to monkey 6
// If false: throw to monkey 7
//
// Monkey 1:
// Starting items: 99, 77, 79
// Operation: new = old + 8
// Test: divisible by 2
// If true: throw to monkey 6
// If false: throw to monkey 0
//
// Monkey 2:
// Starting items: 64, 67, 50, 96, 89, 82, 82
// Operation: new = old + 1
// Test: divisible by 3
// If true: throw to monkey 5
// If false: throw to monkey 3
//
// Monkey 3:
// Starting items: 88
// Operation: new = old * 7
// Test: divisible by 17
// If true: throw to monkey 5
// If false: throw to monkey 4
//
// Monkey 4:
// Starting items: 80, 66, 98, 83, 70, 63, 57, 66
// Operation: new = old + 4
// Test: divisible by 13
// If true: throw to monkey 0
// If false: throw to monkey 1
//
// Monkey 5:
// Starting items: 81, 93, 90, 61, 62, 64
// Operation: new = old + 7
// Test: divisible by 7
// If true: throw to monkey 1
// If false: throw to monkey 4
//
// Monkey 6:
// Starting items: 69, 97, 88, 93
// Operation: new = old * old
// Test: divisible by 5
// If true: throw to monkey 7
// If false: throw to monkey 2
//
// Monkey 7:
// Starting items: 59, 80
// Operation: new = old + 6
// Test: divisible by 11
// If true: throw to monkey 2
// If false: throw to monkey 3

const monkey = [
    [74, 73, 57, 77, 74], // 0
    [99, 77, 79], // 1
    [64, 67, 50, 96, 89, 82, 82], // 2
    [88], // 3
    [80, 66, 98, 83, 70, 63, 57, 66], // 4
    [81, 93, 90, 61, 62, 64], // 5
    [69, 97, 88, 93], // 6
    [59, 80]    // 7
]

const numInspected = [0, 0, 0, 0, 0, 0, 0, 0];

const divider = 19*2*3*17*13*7*5*11;

const simulate = (monkey, numInspected) => {
    let i, j;
    let numItems;
    for (i=0; i<monkey.length; i++) {
        // Operation: new = old * 11
        // Test: divisible by 19
        // If true: throw to monkey 6
        // If false: throw to monkey 7
        if (i === 0) {
            numItems = monkey[0].length;
            for (j=0; j<numItems; j++) {
                let curItem = monkey[0].shift();
                curItem = curItem * 11;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 19 === 0) {
                    monkey[6].push(curItem);
                } else {
                    monkey[7].push(curItem);
                }
                numInspected[0]++;
            }
        } else if (i === 1) {
            numItems = monkey[1].length;
            // Operation: new = old + 8
            // Test: divisible by 2
            // If true: throw to monkey 6
            // If false: throw to monkey 0
            for (j=0; j<numItems; j++) {
                let curItem = monkey[1].shift();
                curItem = curItem + 8;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 2 === 0) {
                    monkey[6].push(curItem);
                } else {
                    monkey[0].push(curItem);
                }
                numInspected[1]++;
            }
        } else if (i === 2) {
            numItems = monkey[2].length;
            // Operation: new = old + 1
            // Test: divisible by 3
            // If true: throw to monkey 5
            // If false: throw to monkey 3
            for (j=0; j<numItems; j++) {
                let curItem = monkey[2].shift();
                curItem = curItem + 1;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 3 === 0) {
                    monkey[5].push(curItem);
                } else {
                    monkey[3].push(curItem);
                }
                numInspected[2]++;
            }
        } else if (i === 3) {
            numItems = monkey[3].length;
            // Operation: new = old * 7
            // Test: divisible by 17
            // If true: throw to monkey 5
            // If false: throw to monkey 4
            for (j=0; j<numItems; j++) {
                let curItem = monkey[3].shift();
                curItem = curItem * 7;
                curItem %= divider;
                // curItem = Math.floor(curItem / 3);
                if (curItem % 17 === 0) {
                    monkey[5].push(curItem);
                } else {
                    monkey[4].push(curItem);
                }
                numInspected[3]++;
            }
        } else if (i === 4) {
            numItems = monkey[4].length;
            // Operation: new = old + 4
            // Test: divisible by 13
            // If true: throw to monkey 0
            // If false: throw to monkey 1
            for (j=0; j<numItems; j++) {
                let curItem = monkey[4].shift();
                curItem = curItem + 4;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 13 === 0) {
                    monkey[0].push(curItem);
                } else {
                    monkey[1].push(curItem);
                }
                numInspected[4]++;
            }
        } else if (i === 5) {
            numItems = monkey[5].length;
            // Operation: new = old + 7
            // Test: divisible by 7
            // If true: throw to monkey 1
            // If false: throw to monkey 4
            for (j=0; j<numItems; j++) {
                let curItem = monkey[5].shift();
                curItem = curItem + 7;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 7 === 0) {
                    monkey[1].push(curItem);
                } else {
                    monkey[4].push(curItem);
                }
                numInspected[5]++;
            }
        } else if (i === 6) {
            numItems = monkey[6].length;
            // Operation: new = old * old
            // Test: divisible by 5
            // If true: throw to monkey 7
            // If false: throw to monkey 2
            for (j=0; j<numItems; j++) {
                let curItem = monkey[6].shift();
                curItem = curItem * curItem;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 5 === 0) {
                    monkey[7].push(curItem);
                } else {
                    monkey[2].push(curItem);
                }
                numInspected[6]++;
            }
        } else if (i === 7) {
            numItems = monkey[7].length;
            // Operation: new = old + 6
            // Test: divisible by 11
            // If true: throw to monkey 2
            // If false: throw to monkey 3
            for (j=0; j<numItems; j++) {
                let curItem = monkey[7].shift();
                curItem = curItem + 6;
                // curItem = Math.floor(curItem / 3);
                curItem %= divider;
                if (curItem % 11 === 0) {
                    monkey[2].push(curItem);
                } else {
                    monkey[3].push(curItem);
                }
                numInspected[7]++;
            }
        } else {
            console.log('fail');
        }

        // console.log(`simulate monkey ${i}`);
        // console.log(monkey);
    }
}

let numRounds;
for (numRounds = 0; numRounds < 10000; numRounds++) {
    simulate(monkey, numInspected);
}

console.log('here');
console.log(monkey);
console.log(numInspected);
sortedInspected = numInspected.sort((a, b) => b - a);
console.log(sortedInspected);
console.log(sortedInspected[0] * sortedInspected[1]);
