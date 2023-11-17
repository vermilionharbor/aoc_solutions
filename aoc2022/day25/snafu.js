const fs = require('fs');

const readSnafu = (s) => {
    let acc = 0;
    let power = 1;
    let negAcc = 0;

    let i = s.length-1;
    while (i >= 0) {
        // console.log(`${s[i]} ${acc} ${power}`)
        switch (s[i]) {
            case '0':
            case '1':
            case '2':
                acc += parseInt(s[i], 10) * power;
                if (negAcc) {
                    acc -= power;
                }
                negAcc = 0;
                break;
            case '-':
                acc += power*5-1*power;
                if (negAcc) {
                    acc -= power;
                }
                negAcc = 1;
                break;
            case '=':
                acc += power*5-2*power;
                if (negAcc) {
                    acc -= power;
                }
                negAcc = 1;
                break;
        }
        power *= 5;
        i--;
    }

    return acc;
}

const toSnafu = (val) => {
    const baseFive = val.toString(5);
    let line = "";
    let i = baseFive.length-1;
    let carry = 0;
    while (i >= 0) {
        let digit = parseInt(baseFive[i], 10);
        let digit2;
        if (carry > 0) {
            digit2 = (digit + carry) % 5;
            if (digit + carry >= 5) {
                carry = 1;
            } else {
                carry = 0;
            }
        } else {
            digit2 = digit;
        }
        switch (digit2) {
            case 0:
            case 1:
            case 2:
                line = digit2.toString() + line;
                break;
            case 3:
                line = "="+line;
                carry++;
                break;
            case 4:
                line = "-" + line;
                carry++;
                break;
            default:
                console.log(`funny digit ${digit2}`);
                throw new Error("funny digit");
        }
        i--;
    }

    if (carry === 1) {
        line = "1" + line;
    }
    return line;
}

console.log(readSnafu("1=-0-2"));

const doTest1 = () => {
    const theLines = fs.readFileSync('test1.txt').toString().split('\n');
    theLines.forEach(l => {
        const terms = l.split(",");
        const val = readSnafu(terms[0]);
        const control = parseInt(terms[1], 10);
        console.log(`${val} ${control} ${val === control ? "pass" : "fail"}`);
    })
}

doTest1();

const doTest2 = () => {
    const theLines = fs.readFileSync('test2.txt').toString().split('\n');
    theLines.forEach(l => {
        const terms = l.split(",");
        const control = terms[1];
        const val = parseInt(terms[0], 10);
        let answer = toSnafu(val);
        console.log(`${answer} ${control} ${answer === control ? "pass" : "fail"}`);
    })
}

console.log(toSnafu(2022));
doTest2();

const doPart1 = () => {
    const lines = fs.readFileSync('input.txt').toString().split('\n');
    let sum = 0;
    lines.forEach(l => {
        const val = readSnafu(l);
        console.log(`${l} ${val}`)
        sum += val;
    });
    console.log(`sum ${sum}`);
    console.log(toSnafu(sum));
}

doPart1();