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
    while (typeof monkeys['root'] !== 'number') {
        let nextMonkeys = {};
        for (const[key, val] of Object.entries(monkeys)) {
            if (typeof val === 'object') {
                // try to evaluate it
                const left = monkeys[val.left];
                const right = monkeys[val.right];
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
                } else {
                    nextMonkeys[key] = val;
                }
            } else {
                // it's a number
                nextMonkeys[key] = val;
            }
        }
        monkeys = nextMonkeys
    }

    console.log(`root ${monkeys['root']}`);
}

evaluate(monkeys);