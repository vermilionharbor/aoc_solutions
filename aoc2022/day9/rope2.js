const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const indexToString = (x, y) => {
    return `${x}_${y}`;
}

const simulateNext = (rope, index, tailMap) => {
    const head = rope[index-1];
    const tail = rope[index];
    const deltaX = head.x - tail.x;
    const deltaY = head.y - tail.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if ((absX <= 1) && (absY <= 1)) {
        // tail stays the same
        // console.log(`tail does not move`);
    } else if (head.x === tail.x) {
        // x is equal so move up and down
        if (deltaY > 0) {
            tail.y += 1;
        } else {
            tail.y -= 1;
        }
    } else if (head.y === tail.y) {
        // y is equal move left and right
        if (deltaX > 0) {
            tail.x += 1;
        } else {
            tail.x -= 1;
        }
    } else {
        // move diagonally
        if (deltaX > 0) {
            tail.x += 1;
        } else {
            tail.x -= 1;
        }
        if (deltaY > 0) {
            tail.y += 1;
        } else {
            tail.y-= 1;
        }
    }

    if (index === rope.length-1) {
        tailMap[indexToString(tail.x, tail.y)] = 1;
    }
}

const simulate = (s, rope, tailMap) => {
    const terms = s.split(' ');
    const steps = parseInt(terms[1], 10);
    let i, j;
    const numStages = rope.length;
    const head = rope[0];

    switch (terms[0]) {
        case 'L':
            console.log(`left ${steps}`);
            for (i=0; i<steps; i++) {
                head.x -= 1;
                for (j=1; j<numStages; j++) {
                    simulateNext(rope, j, tailMap);
                }
            }
            break;
        case 'R':
            console.log(`right ${steps}`);
            for (i=0; i<steps; i++) {
                head.x += 1;
                for (j=1; j<numStages; j++) {
                    simulateNext(rope, j, tailMap);
                }
            }
            break;
        case 'U':
            console.log(`up ${steps}`);
            for (i=0; i<steps; i++) {
                head.y += 1;
                for (j=1; j<numStages; j++) {
                    simulateNext(rope, j, tailMap);
                }
            }
            break;
        case 'D':
            console.log(`down ${steps}`);
            for (i=0; i<steps; i++) {
                head.y -= 1;
                for (j=1; j<numStages; j++) {
                    simulateNext(rope, j, tailMap);
                }
            }
            break;
        default:
            console.log(`FAIL here`);
            break;
    }
    //  console.log(`head is at ${head.x} ${head.y}`);
}

const head =  {
    x: 0,
    y: 0
}

const tail = {
    x: 0,
    y: 0
}

// const rope = [head, tail];
const rope = [
    {...head}, // H
    {...head}, // 1
    {...head}, // 2
    {...head}, // 3
    {...head}, // 4
    {...head}, // 5
    {...head}, // 6
    {...head}, // 7
    {...head}, // 8
    {...head}  // 9
]
const tailMap = {}

lines.forEach(l => {
    // console.log(l);
    simulate(l, rope, tailMap);
});

console.log(tailMap);
console.log(`Total ${Object.keys(tailMap).length} places`);
console.log('done');
