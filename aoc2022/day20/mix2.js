const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const decryptionKey = 811589153;
let head;
let current;
let numMap = [];
let numItems = 0;
let numbers = [];
let zeroIndex;
lines.forEach((l, index) => {
    let val = parseInt(l, 10) * decryptionKey;
    if (val === 0) {
        console.log(`found 0 at index ${index}`);
        zeroIndex = index;
    }
    numbers.push(val);
    let newNode = {
        val: val,
        prev: current,
    }
    numMap.push(newNode);
    if (current !== undefined) {
        current.next = newNode;
    }
    current = newNode;
    if (head === undefined) {
        head = newNode;
    }
    numItems ++;
});

head.prev = current;
current.next = head;

// let i;
// current = head;
// for (i=0; i<10; i++) {
//     console.log(current.val);
//     current = current.next;
// }
// console.log('backward');
// current = head;
// for (i=0; i<10; i++) {
//     console.log(current.val);
//     current = current.prev;
// }

const rotate = (index) => {
    let val = numbers[index];
    if (val === 0) {
        return;
    }
    // console.log(`rotate ${val}`)
    let current = numMap[index];
    current.next.prev = current.prev;
    current.prev.next = current.next;

    let orphan = current;
    if (val > 0) {
        let i;
        // console.log(`before ${current.val}`);
        val %= (numMap.length -1);
        for (i=0; i<val; i++) {
            current = current.next;
            // console.log(`move ${current.val}`)
        }
        // console.log(`here ${current.val}`);
        let temp = current.next;
        current.next = orphan;
        orphan.next = temp;
        orphan.next.prev = orphan;
        orphan.prev = current;
    } else {
        let i;
        let numIter = Math.abs(val);
        numIter %= (numMap.length-1);
        for (i=0; i<numIter; i++) {
            current = current.prev;
        }
        let temp = current.prev;
        current.prev = orphan;
        orphan.prev = temp;
        orphan.prev.next = orphan;
        orphan.next = current;
    }
}

const getNumber = (index) => {
    let current = numMap[zeroIndex];
    let i;
    for (i=0; i<index; i++) {
        current = current.next
    }
    return current.val;
}

const prettyPrint = () => {
    let current = numMap[zeroIndex];
    let i =0;
    let buf ="";
    while (i<numItems) {
        buf+= current.val + ", ";
        i++;
        current=current.next;
    }
    console.log(buf);
}

const mix = (numbers) => {
    let i;
    for (i=0; i<numbers.length; i++) {
        // console.log(`rotating ${numbers[i]}`)
        rotate(i);
        // prettyPrint(numMap[0]);
    }
}

console.log('mixing');
// console.log(numbers);
let i;
for (i=0; i<10; i++) {
    mix(numbers);
    // console.log(`after ${i+1} rounds..`);
    // prettyPrint();
}


const x1000 = getNumber(1000);
const x2000 = getNumber(2000);
const x3000 = getNumber(3000);
let sum = x1000 + x2000 +x3000;
console.log(`${x1000} ${x2000} ${x3000} => ${sum}`);