const fs = require('fs');


const readProgram = (file) => {
    const lines = fs.readFileSync(file).toString().split('\n');

    // lines.forEach(l => {
    //     const terms = l.split (' ');
    //     console.log(terms);
    // })

    let commands = lines.map(l => {
        return l.split(' ');
    })

    return commands;
}


const parseParam = (cpu, param) => {
    if ((param === 'w') || (param === 'x') || (param === 'y') || (param === 'z')) {
        return cpu[param];
    }

    return parseInt(param, 10);
}

const runProgram = (commands, inputs) => {
    const cpu = {
        w: 0,
        x: 0,
        y: 0,
        z: 0,
    }

    let opA, opB;
    let index = 0;
    commands.forEach(c => {
        const op = c[0];
        switch (op) {
            case 'inp':
                opA = c[1];
                cpu[opA] = inputs[index++];
                break;
            case 'add':
                opA = c[1];
                opB = parseParam(cpu, c[2]);
                cpu[opA] = cpu[opA] + opB;
                break;
            case 'mul':
                opA = c[1];
                opB = parseParam(cpu, c[2]);
                cpu[opA] = cpu[opA] * opB;
                break;
            case 'div':
                opA = c[1];
                opB = parseParam(cpu, c[2]);
                if (opB === 0) {
                    throw ('divide by zero');
                }
                cpu[opA] = Math.floor(cpu[opA] / opB);
                break;
            case 'mod':
                opA = c[1];
                opB = parseParam(cpu, c[2]);
                if (opB === 0) {
                    throw ('divide by zero');
                }
                cpu[opA] = cpu[opA] % opB;
                break;
            case 'eql':
                opA = c[1];
                opB = parseParam(cpu, c[2]);
                cpu[opA] = (cpu[opA] === opB) ? 1 : 0;
                break;
            default:
                console.log(`*** illegal instruction ${op} ****`);
                break;
        }
    });

    // console.log(`ran ${i} instructions ${JSON.stringify(cpu)}`);
    return cpu;
}

const testProgram1 = () => {

    const input = [14];
    const commands = readProgram('testinput.txt');
    const cpu = runProgram(commands, input);

    console.log(cpu);
}

const runProgram2 = () => {
    const commands = readProgram('input.txt');
    console.log(commands);
    let a, b, c, d, e, f, g, h, i, j, k, l, m, n;
    let inputs;
    for (a=9; a> 0; a--) {
        for (b=9; b> 0; b--) {
            for (c=9; c> 0; c--) {
                for (d=9; d> 0; d--) {
                    for (e=9; e> 0; e--) {
                        for (f=9; f> 0; f--) {
                            for (g=9; g> 0; g--) {
                                for (h=9; h> 0; h--) {
                                    console.log(`running ${a}${b}${c}${d}${e}${f}${g}${h}...`);
                                    for (i=9; i> 0; i--) {
                                        for (j=9; j> 0; j--) {
                                            for (k=9; k> 0; k--) {
                                                for (l=9; l> 0; l--) {
                                                    for (m=9; m> 0; m--) {
                                                        for (n=9; n> 0; n--) {
                                                            // inputs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n];
                                                            inputs = [n, m, l, k, j, i, h, g, f, e, d, c, b, a];
                                                            // const cpu = runProgram(commands, inputs);
                                                            // if (cpu.z === 0) {
                                                            //     console.log(`*** found solution ****`);
                                                            //     console.log(inputs);
                                                            //     throw ("answer found");
                                                            // }

                                                            const z = runProgramFast(inputs);
                                                            if (z === 0) {
                                                                console.log(`*** found solution ****`);
                                                                console.log(inputs);
                                                                throw ("answer found");
                                                            }

                                                            const zo = runProgramOptimized(inputs);

                                                            if (z !== zo) {
                                                                console.log(`mismatch ${JSON.stringify(inputs)} ${z} ${zo}`);
                                                                throw("mismatch");
                                                            }

                                                            // if (zo === 0) {
                                                            //     console.log(`*** found solution ****`);
                                                            //     console.log(inputs);
                                                            //     throw ("answer found");
                                                            // }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


const translateProgram = () => {
    const commands = readProgram('input.txt');

    commands.forEach(c => {
        const op = c[0];
        const opA = c[1];
        const opB = c[2];
        switch (op) {
            case 'inp':
                console.log(`${opA} = inputs[index]++;`);
                // opA = c[1];
                // cpu[opA] = inputs[index++];
                break;
            case 'add':
                console.log(`${opA} = ${opA} + ${opB};`)
                // opA = c[1];
                // opB = parseParam(cpu, c[2]);
                // cpu[opA] = cpu[opA] + opB;
                break;
            case 'mul':
                console.log(`${opA} = ${opA} * ${opB};`)
                // opA = c[1];
                // opB = parseParam(cpu, c[2]);
                // cpu[opA] = cpu[opA] * opB;
                break;
            case 'div':
                console.log(`${opA} = Math.floor(${opA} / ${opB});`)
                // opA = c[1];
                // opB = parseParam(cpu, c[2]);
                // if (opB === 0) {
                //     throw ('divide by zero');
                // }
                // cpu[opA] = Math.floor(cpu[opA] / opB);
                break;
            case 'mod':
                console.log(`${opA} = ${opA} % ${opB};`)
                // opA = c[1];
                // opB = parseParam(cpu, c[2]);
                // if (opB === 0) {
                //     throw ('divide by zero');
                // }
                // cpu[opA] = cpu[opA] % opB;
                break;
            case 'eql':
                console.log(`${opA} = (${opA} === ${opB}) ? 1 : 0;`)
                // opA = c[1];
                // opB = parseParam(cpu, c[2]);
                // cpu[opA] = (cpu[opA] === opB) ? 1 : 0;
                break;
            default:
                console.log(`*** illegal instruction ${op} ****`);
                break;
        }
    });
}

const runProgramFast = (inputs) => {
    let x, y, z, w;
    let index = 0;
    x = 0;
    y = 0;
    z = 0;
    w = 0;

    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 14;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 12;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 10;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 9;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 13;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 8;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -8;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 3;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 11;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 0;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 11;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 11;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 14;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 10;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -11;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 13;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 1);
    x = x + 14;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 3;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -1;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 10;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -8;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 10;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -5;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 14;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -16;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 6;
    y = y * x;
    z = z + y;
    w = inputs[index++];
    x = x * 0;
    x = x + z;
    x = x % 26;
    z = Math.floor(z / 26);
    x = x + -6;
    x = (x === w) ? 1 : 0;
    x = (x === 0) ? 1 : 0;
    y = y * 0;
    y = y + 25;
    y = y * x;
    y = y + 1;
    z = z * y;
    y = y * 0;
    y = y + w;
    y = y + 5;
    y = y * x;
    z = z + y;

    return z;
}

const runProgramOptimized = (inputs) => {
    let x, y, z, w;
    let temp1, temp2;
    if (((((  ( ((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) % 26) + -8) === inputs[3]) {
        temp1 = Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26);
        temp2 = (temp1 % 26) + 11;
    } else {
        temp1 = ((Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26) * 26) + (inputs[3] + 3));
        temp2 = (temp1 % 26) +11;
    }

    let temp3;
    if (temp2 === inputs[4]) {
        temp3 = temp1;
        x = (temp1 % 26) + 11;
    } else {
        temp3 = (temp1 * 26 + inputs[4]);
        x = ((temp1 * 26) % 26) + 11;
    }

    let temp4;
    if (x === inputs[5]) {
        temp4 = 0;
    } else {
        temp3 = temp3 * 26;
        temp4 = inputs[5] + 11;
    }

    let temp5;
    if ((((temp3 + temp4) % 26) + 14) === inputs[6]) {
        temp5 = temp3 + temp4;
    } else {
        temp5 = ((temp3 + temp4) * 26) + (inputs[6] + 10);
    }

    let temp6;
    if (((temp5 % 26) + -11) === inputs[7]) {
        temp6 = Math.floor(temp5 / 26);
    } else {
        temp6 = (Math.floor(temp5 / 26) * 26) + (inputs[7] + 13);
    }

    let temp7;
    let temp8;
    if ( ((temp6 % 26) + 14) === inputs[8] ) {
        temp8 = Math.floor(temp6 / 26);
        temp7 = (temp6 % 26) + -1;
    } else {
        temp8 = Math.floor((temp6 * 26 + (inputs[8] + 3)) / 26)
        temp7 = ((temp6 * 26 + (inputs[8] + 3)) % 26) + -1;
    }

    let temp9, temp10, temp11;
    if (temp7 === inputs[9]) {
        temp10 = (temp8 % 26) - 8
        temp11 = Math.floor(temp8 / 26);
    } else {
        temp9 = (temp8 * 26) + (inputs[9] + 10);
        temp10 = (temp9 % 26) - 8;
        temp11 = Math.floor(temp9/26);
    }


    let temp12;
    if (temp10 === inputs[10]) {
        z = temp11
        y = 0;
        temp12 = temp11;
    } else {
        y = inputs[10] + 10;
        temp12 = temp11 * 26 + (inputs[10] + 10);
    }

    let temp13, temp14, temp15;
    if ( ((temp12 % 26) + -5) === inputs[11] ) {
        temp13 = Math.floor(temp12 / 26);
        temp15 = Math.floor(temp13 / 26);
        temp14 = temp13 % 26 - 16;
    } else {
        temp13 = (Math.floor(temp12 / 26) * 26) + (inputs[11] + 14);
        temp15 = Math.floor(temp13 / 26);
        temp14 = temp13 % 26 - 16;
    }

    let temp16;
    if (temp14 === inputs[12]) {
        temp16 = temp15;
    } else {
        temp16 = (temp15 * 26) + (inputs[12] + 6);
    }

    w = inputs[13];

    let temp17 = Math.floor(temp16 / 26);
    if (((temp16 % 26) - 6) === inputs[13]) {
        z = temp17;
        y = 0;
    } else {
        y = inputs[13] + 5;
        z = temp17 * 26 + inputs[13] + 5;
    }

    z = z + y;

    return z;
}
// translateProgram();
// testProgram1();
runProgram2();

