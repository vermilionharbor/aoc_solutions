const fs = require("fs");


//const l = "1 + 2 * 3 + 4 * 5 + 6"
// const l = "1 + (2 * 3) + (4 * (5 + 6))";
// const l = "2 * 3 + (4 * 5)";
// const l = "5 + (8 * 3 + 9 + 3 * 4 * 3)";
// const l = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))";
// const l = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2";

const evaluate = (l) => {
    let i = 0;
    let stack = [{}];
    let stackIndex = 0;
    let frame = stack[stackIndex];
    let acc;

    const compute = (val) => {
        if (frame.left === undefined) {
            frame.left = val;
        } else if (frame.op === '+') {
            frame.op = undefined;
            frame.left = frame.left + val;
        } else if (frame.op === '*') {
            // frame.op = undefined;
            // frame.left = frame.left * val;
            stackIndex ++;
            stack[stackIndex] = {};
            frame = stack[stackIndex];
            frame.isParen = false;
            frame.left = val;
        } else {
            throw new Error("parse error", val);
        }
    }

    while (i < l.length) {
        switch (l[i]) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                acc = parseInt(l.slice(i, l.length), 10);
                // console.log(val);
                i += acc.toString().length;
                compute(acc);
                break;
            case ' ':
                i++;
                break;
            case '+':
                // console.log('+');
                frame.op = "+";
                i++;
                break;
            case '*':
                // console.log('*');
                frame.op = "*";
                i++;
                break;
            case "(":
                stackIndex++;
                stack[stackIndex] = {};
                frame = stack[stackIndex];
                frame.isParen = true;
                i++;
                break;
            case ")":
                // console.log(")");
                acc = frame.left;
                while ((stackIndex > 0) && (frame.isParen !== true)) {
                    // console.log(`popping ${stackIndex} ${JSON.stringify(frame)}`);
                    stackIndex--;
                    frame = stack[stackIndex];
                    if (frame.op === "*") {
                        acc = frame.left * acc;
                    } else if (frame.op === "+") {
                        acc = frame.left + acc;
                    } else {
                        throw new Error("here");
                    }
                }
                i++;
                // console.log(acc, JSON.stringify(frame));
                stackIndex--;
                frame = stack[stackIndex];
                compute(acc);
                break;
        }
    }

    // console.log(stack);
    // console.log(`acc ${acc}`);
    // console.log(`stackindex ${stackIndex}`);

    acc = frame.left;
    while (stackIndex > 0) {
        //console.log(stackIndex);
        stackIndex--;
        frame = stack[stackIndex];
        if (frame.op === "*") {
            acc = frame.left * acc;
        }
    }
    return acc;
}

// console.log(evaluate(l));

const lines = fs.readFileSync("input.txt").toString().split("\n");
let sum = 0;
lines.forEach(l => {
    let lineVal = evaluate(l);
    console.log(lineVal);
    sum += lineVal;
})

console.log(`sum of all ${sum}`);