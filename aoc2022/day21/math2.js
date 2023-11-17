const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const monkeys = {}

lines.forEach(l => {
    const terms = l.split(': ');
    const equations = terms[1].split(' ');
    if (equations.length === 1) {
        monkeys[terms[0]] = parseInt(equations[0], 10);
    } else if (equations.length === 3) {
        monkeys[terms[0]] = {
            left: equations[0],
            right: equations[2],
            op: equations[1]
        }
    } else {
        console.log('something weird')
    }
});

// console.log(JSON.stringify(monkeys));

const evaluate = (monkeys) => {
    let numSubs;
    do {
        let nextMonkeys = {};
        numSubs = 0;
        for (const[key, val] of Object.entries(monkeys)) {
            if (typeof val === 'object') {
                // try to evaluate it
                // const left = monkeys[val.left];
                // const right = monkeys[val.right];
                let left, right;
                if (typeof val.left === 'number') {
                    left = val.left;
                } else {
                    left = monkeys[val.left];
                    if (typeof left === 'number') {
                        val.left = left;
                        numSubs++;
                    }
                }
                if (typeof val.right === 'number') {
                    right = val.right;
                } else {
                    right = monkeys[val.right];
                    if (typeof right === 'number') {
                        val.right = right;
                        numSubs++;
                    }
                }
                if ((typeof left === 'number') && (typeof right === 'number')) {
                    console.log(`computing ${left} ${val.op} ${right}`);
                    let temp;
                    switch (val.op) {
                        case '+':
                            temp = left + right;
                            break;
                        case '-':
                            temp = left - right;
                            break;
                        case '*':
                            temp = left * right;
                            break;
                        case '/':
                            temp = left / right;
                            break;
                        default:
                            console.log(`fishy op ${val.op}`);
                            break;
                    }
                    nextMonkeys[key] = temp;
                    numSubs ++;
                } else {
                    nextMonkeys[key] = val;
                }
            } else {
                // it's a number
                nextMonkeys[key] = val;
            }
        }
        monkeys = nextMonkeys
    } while (numSubs > 0);

    // console.log(`root ${monkeys['root']}`);
    for (const [key, val] of Object.entries(monkeys)) {
        console.log(`${key}: ${JSON.stringify(val)}`);
    }

    const rootObj = monkeys['root'];
    let acc;
    let cur;
    if (typeof rootObj.left === 'number') {
        acc = rootObj.left;
        cur = monkeys[rootObj.right];
    } else if (typeof rootObj.right === 'number') {
        acc = rootObj.right;
        cur = monkeys[rootObj.left];
    } else {
        console.log(`unexpected ${JSON.stringify(rootObj)}`);
    }

    // while ((cur.left !== "foo") && (cur.right !== "foo")) {
    while (typeof cur !== 'string') {
        let expression, immediate;
        console.log(`.. ${JSON.stringify(cur)}`);
        if (typeof cur.left === 'number') {
            immediate = cur.left;
            expression = cur.right;
            switch (cur.op) {
                case "+":
                    acc = acc - immediate;
                    console.log(`undoing + ${acc}`)
                    break;
                case "-":
                    acc = immediate - acc;
                    console.log(`undoing - left ${acc}`)
                    break;
                case '*':
                    acc = acc / immediate;
                    console.log(`undoing * ${acc}`)
                    break;
                case '/':
                    acc = immediate / acc;
                    console.log(`undoing / left ${acc}`)
                    break;
            }
        } else if (typeof cur.right === 'number') {
            immediate = cur.right;
            expression = cur.left;
            switch (cur.op) {
                case "+":
                    acc = acc - immediate;
                    console.log(`undoing + ${acc}`);
                    break;
                case "-":
                    acc = acc + immediate;
                    console.log(`undoing - right ${acc}`);
                    break;
                case '*':
                    acc = acc / immediate;
                    console.log(`undoing * ${acc}`);
                    break;
                case '/':
                    acc = acc * immediate;
                    console.log(`undoing / right ${acc}`);
                    break;
            }
        } else {
            console.log(`something is off ${JSON.stringify(cur)}`);
        }
        // console.log(`expression ${expression}`);
        cur = monkeys[expression];
    }

    console.log(`acc ${acc}`);

}

monkeys['humn'] = 'foo';
evaluate(monkeys);