const fs = require('fs');

const priority = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26,

    'A': 27,
    'B': 28,
    'C': 29,
    'D': 30,
    'E': 31,
    'F': 32,
    'G': 33,
    'H': 34,
    'I': 35,
    'J': 36,
    'K': 37,
    'L': 38,
    'M': 39,
    'N': 40,
    'O': 41,
    'P': 42,
    'Q': 43,
    'R': 44,
    'S': 45,
    'T': 46,
    'U': 47,
    'V': 48,
    'W': 49,
    'X': 50,
    'Y': 51,
    'Z': 52,
}

const lines = fs.readFileSync('input.txt').toString().split('\n');

const getPriority = (l) => {
    const numItems = l.length;
    const bag = {}
    let i = 0;
    while (i<numItems/2) {
        bag[l[i]] = 1;
        i++;
    }

    while (i < numItems) {
        if (bag[l[i]] === 1) {
            // console.log(bag[l[i]]);
            return priority[l[i]];
        }
        i++;
    }
}

let sum = 0;
lines.forEach(l => {
    // console.log(l);
    const result = getPriority(l);
    sum += result;
    console.log(`result ${result} sum ${sum}`);
});

console.log(`the sum is ${sum}`);

const findBadge = (a, b, c) => {
    let i;
    const bagCheck = {}
    const bagCheck2 = {}
    for (i=0; i<a.length; i++) {
        bagCheck[a[i]] = 1;
    }
    for (i=0; i<b.length; i++) {
        if (bagCheck[b[i]] === 1) {
            bagCheck2[b[i]] = 1;
        }
    }
    i = 0;
    while (i < c.length) {
        if (bagCheck2[c[i]] === 1) {
            return c[i];
        }
        i++;
    }
}

const result = findBadge('vJrwpWtwJgWrhcsFMMfFFhFp',
'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
'PmmdzqPrVvPwwTWBwg');
console.log(result);

const result2 = findBadge('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
'ttgJtRGJQctTZtZT',
'CrZsJsPPZsGzwwsLwLmpwMDw');
console.log(result2);

sum = 0;
let i = 0;
while (i<lines.length) {
    const badge = findBadge(lines[i], lines[i+1], lines[i+2]);
    sum += priority[badge];
    console.log(`Badge ${badge} sum ${sum}`)
    i+=3;
}

console.log(`sum ${sum}`);

