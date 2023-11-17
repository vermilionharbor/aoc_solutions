const input = "389125467";
// const input = "157623984";

let head;
let current;
for (let i=0; i<input.length; i++) {
    if (head === undefined) {
        head = {
            val: input[i]*1
        };
        current = head;
    } else {
        current.next = {
            val: input[i]*1,
        };
        current = current.next;
    }
}
current.next = head;

current = head;
do {
    console.log(current.val);
    current = current.next;
} while (current !== head);

const prettyPrint = (head) => {
    let buffer = [];
    let current = head;
    do {
        buffer.push(current.val);
        current = current.next;
    } while (current !== head)

    console.log(buffer);
}

const formatAnswer = (head) => {
    let cur = head;
    let buffer = '';
    while (cur.val !== 1) {
        cur = cur.next;
    }
    cur = cur.next;
    while (cur.val !== 1) {
        buffer = buffer + cur.val.toString();
        cur = cur.next;
    }
    return buffer;
}

current = head;
const numMoves = 10;
for (let m=0; m<numMoves; m++) {
    console.log(`-- move ${m+1} -- `);
    console.log("");
    prettyPrint(current);
    console.log(`current ${current.val}`);
    let remove3 = current.next;
    current.next = current.next.next.next.next;
    let map = [].fill(false, 0, 10);
    map[remove3.val] = true;
    map[remove3.next.val] = true;
    map[remove3.next.next.val] = true;
    console.log(`pick up: ${remove3.val} ${remove3.next.val} ${remove3.next.next.val}`);

    const highest  = 9;
    const lowest =  1;
    const findNextDestination = (cur) => {
        let candidate = cur;
        do {
            candidate = (candidate - 1) < lowest ? highest : candidate - 1;
        } while (map[candidate] === true);
        return candidate;
    }

    let nextDestinationLabel = findNextDestination((current.val));
    console.log(`destination ${nextDestinationLabel}`);
    let nextDestination = current;
    while (nextDestination.val !== nextDestinationLabel) {
        nextDestination = nextDestination.next;
    }

    // insert the removed sequence
    let temp = nextDestination.next;
    nextDestination.next = remove3;
    remove3.next.next.next = temp;

    current = current.next;

}

console.log('--- final ---');
prettyPrint(current);
console.log(`current ${current.val}`);
console.log(`answer ${formatAnswer(current)}`);