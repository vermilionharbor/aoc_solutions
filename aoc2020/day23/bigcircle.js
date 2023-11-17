// const input = "389125467";
const input = "157623984";

let head;
let current;

const highest = 1000000+1;
const lowest =  1;
let cups = [].fill(0, 0, highest);
for (let i=0; i<input.length; i++) {
    if (head === undefined) {
        head = input[i]*1;
        current = head;
    } else {
        cups[current] = input[i]*1;
        current = cups[current];
    }
}


console.log(`packing to ${highest}`);
for (let i=10; i< highest; i++) {
    cups[current] = i;
    current = cups[current];
}

cups[current] = head;
console.log(`done packing to ${highest}`);

console.log('integrity check');
let count = 0;
let c = head;
do {
    count ++;
    c = cups[c];
} while (c !== head);
console.log(`done integrity check ${count}`);

for (let i=0; i<20; i++) {
    console.log(`${i} ${cups[i]}`);
}
current = head;
// do {
//     console.log(current);
//     current = cups[current];
// } while (current !== head);


const prettyPrint = (head) => {
    let buffer = [];
    let current = head;
    do {
        buffer.push(current);
        current = cups[current];
    } while (current !== head)

    console.log(buffer);
}

const formatAnswer = (head) => {
    let cur = head;
    let buffer = '';
    while (cur !== 1) {
        cur = cups[cur];
    }
    cur = cups[cur];
    while (cur !== 1) {
        buffer = buffer + cur.toString();
        cur = cups[cur];
    }
    return buffer;
}

const formatBigAnswer = (head) => {
    let cur = head;
    while (cur !== 1) {
        cur = cups[cur];
    }
    cur = cups[cur];
    return [cur, cups[cur]];
}

current = head;
const numMoves = 10000000;

const start_time = new Date();
for (let m=0; m<numMoves; m++) {
    if (m % 10000 === 0) {
        const end_time = new Date();
        console.log(`-- move ${m + 1} -- ${end_time - start_time}`);
    }
    // prettyPrint(current);
    // console.log(`current ${current}`);
    let remove3 = cups[current];
    // current.next = current.next.next.next.next;
    cups[current] = cups[cups[cups[cups[current]]]];

    const val1 = remove3;
    const val2 = cups[remove3];
    const val3 = cups[cups[remove3]];
    // console.log(`pick ${val1} ${val2} ${val3}`)

    const findNextDestination = (cur) => {
        let candidate = cur;
        do {
            candidate = (candidate - 1) < lowest ? highest-1 : candidate - 1;
        } while (candidate === val1 || candidate === val2 || candidate === val3);
        return candidate;
    }

    let nextDestinationLabel = findNextDestination((current));
    // console.log(`destination ${nextDestinationLabel}`);
    // let nextDestination = current;
    // while (nextDestination !== nextDestinationLabel) {
    //     nextDestination = cups[nextDestination];
    // }

    // insert the removed sequence
    // let temp = cups[nextDestination];
    let temp = cups[nextDestinationLabel];
    // cups[nextDestination] = remove3;
    cups[nextDestinationLabel] = remove3;
    cups[cups[cups[remove3]]] = temp;

    current = cups[current];

}

console.log('--- final ---');
// prettyPrint(current);
console.log(`current ${current}`);
// console.log(`answer ${formatAnswer(current)}`);
const [val1, val2] = formatBigAnswer(current);
console.log(`done ${val1}, ${val2}`);
console.log(`product ${val1*val2}`);
