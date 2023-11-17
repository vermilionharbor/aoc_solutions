const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let i = 0;
let pairs = [];
let items = [];
while (i < lines.length) {
    const pair = {
        left: JSON.parse(lines[i]),
        right: JSON.parse(lines[i+1]),
    }
    pairs.push(pair);
    items.push(pair.left);
    items.push(pair.right);
    i+= 3;
}

const compare = (left, right) => {
    if (Array.isArray(left) && Array.isArray(right)) {
        let result = 0;
        let numItems = (left.length <= right.length) ? left.length : right.length;
        let i = 0;
        while ((i < numItems) && (result === 0)) {
            result = compare(left[i], right[i]);
            if (result !== 0) {
                return result;
            }
            i++;
        }
        if (left.length < right.length) {
            return -1;
        } else if (left.length > right.length) {
            return 1;
        } else {
            if (left.length !== right.length) {
                console.log('something weird here');
            }
            return 0;
        }
    } else if (Array.isArray(left)) {
        // left is array, right is not
        return compare(left, [right]);
    } else if (Array.isArray(right)) {
        // right is array, left is not
        return compare([left], right);
    } else {
        // neither is array
        if (left < right) {
            return -1;
        } else if (left > right) {
            return 1;
        } else if (left === right) {
            return 0;
        }
    }
    console.log('something weird here?');
    return 0;
}

let index = 1;
let sum = 0;
pairs.forEach(p => {
    console.log(`${JSON.stringify(p.left)} ${typeof p.left}`);
    console.log(`${JSON.stringify(p.right)} ${typeof p.right}`);
    const result = compare(p.left, p.right);
    if (result === 1) {
        console.log(`summing ${index}`);
        sum += index;
    }
    console.log("");
    index ++;
});

console.log(`the sum is ${sum}`)

items.push(JSON.parse('[[2]]'));
items.push(JSON.parse('[[6]]'));
items.sort((a, b) => compare(a, b));
let index2, index6;
index = 1;
items.forEach((i) => {
    let lineString = JSON.stringify(i);
    console.log(lineString);
    if (lineString === '[[2]]') {
        console.log (`index2 is ${index}`);
        index2 = index;
    }
    if (lineString === '[[6]]') {
        console.log(`index6 is ${index}`);
        index6 = index;
    }
    index ++;
});

console.log(`the product is ${index2*index6}`);

