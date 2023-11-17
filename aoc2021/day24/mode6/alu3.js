const fs = require('fs');

const globals = {
    max1: 0,
    max2: 0,
};

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
    let a, b, c, d, e, f, g, h, i, j, k, l, m, n;
    a = 1;
    b = 1;
    c = 1;
    d = 1;
    e = 1;
    f = 1;
    g = 1;
    h = 1;
    i = 1;
    j = 1;
    k = 1;
    l = 1;
    m = 1;
    n = 1;
    let inputs;
    // for (a=9; a> 0; a--) {
    //     for (b=9; b> 0; b--) {
    //         for (c=9; c> 0; c--) {
                for (d=9; d> 0; d--) {
                    for (e=9; e> 0; e--) {
                        for (f=9; f> 0; f--) {
                            // console.log(`running ${a}${b}${c}${d}${e}${f}...`);
                            for (g=9; g> 0; g--) {
                                console.log(`running ${a}${b}${c}${d}${e}${f}${g}...`);
                                for (h=9; h> 0; h--) {
                                    for (i=9; i> 0; i--) {
                                        // console.log(`running ${a}${b}${c}${d}${e}${f}${g}${h}${i}...`);
                                        for (j=9; j> 0; j--) {
                                            // console.log(`running ${j}${i}${h}...`);
                                            for (k=9; k> 0; k--) {
                                                for (l=9; l> 0; l--) {
                                                    for (m=9; m> 0; m--) {
                                                        for (n=9; n> 0; n--) {
                                                            // console.log(`running ${n}${m}${l}${k}${j}${i}${h}...`);
                                                            // inputs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n];
                                                            inputs = [n, m, l, k, j, i, h, g, f, e, d, c, b, a];
                                                            // const cpu = runProgram(commands, inputs);
                                                            // if (cpu.z === 0) {
                                                            //     console.log(`*** found solution ****`);
                                                            //     console.log(inputs);
                                                            //     throw ("answer found");
                                                            // }

                                                            // one solution
                                                            // inputs = [3,9,9,9,9,6,9,8,7,9,9,4,2,9];
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

                                                            if (zo === 0) {
                                                                console.log(`*** found solution ****`);
                                                                console.log(inputs);
                                                                throw ("answer found");
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
    //         }
    //     }
    // }
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
    // oddball logic here replaced below
    // if (((((  ( ((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) % 26) + -8) === inputs[3]) {
    //     // console.log(`${inputs[0]}${inputs[1]}${inputs[2]}  ${inputs[3]}`)
    //     // if (inputs[2] !== inputs[3]) {
    //     //     console.log('oddball');
    //     // }
    //     temp1 = Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26);
    //     // optimized out temp2 = (temp1 % 26) + 11;
    // } else {
    //     // if (inputs[2] === inputs[3]) {
    //     //     console.log('oddball');
    //     //     console.log(`---> ${inputs[0]}${inputs[1]}${inputs[2]}  ${inputs[3]}`)
    //     // }
    //     temp1 = ((Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26) * 26) + (inputs[3] + 3));
    //     // optimized out temp2 = (temp1 % 26) +11;
    // }

    // replaced with
    if (inputs[2] === inputs[3]) {
        temp1 = Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26);
    } else {
        temp1 = ((Math.floor((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26) * 26) + (inputs[3] + 3));
    }


    let temp3;

    // this is optimized out ***************
    // if (temp2 === inputs[4]) {
    //     temp3 = temp1;
    //     console.log('here')
    // } else {
    //     temp3 = (temp1 * 26 + inputs[4]);
    // }
    // ************************************
    // replaced with
    temp3 = (temp1 * 26 + inputs[4]);

    let temp4;

    // this is optimized out ******************
    // if (x === inputs[5]) {
    //     // doesn't get here so inputs[5] doesnt not matter
    //     temp4 = 0;
    //     console.log(`${x} ${inputs[5]}`)
    // } else {
    //     temp3 = temp3 * 26;
    //     temp4 = inputs[5] + 11;
        // console.log(`${x}, ${inputs[5]} ${inputs[4]} ${inputs[3]} ${inputs[2]} ${inputs[1]} ${inputs[0]}`)
    // }
    // ****************************************
    // replaced with
    temp3 = temp3 * 26;
    temp4 = inputs[5] + 11;

    // input 6
    let temp5;
    // this is optimized out ************************
    // if ((((temp3 + temp4) % 26) + 14) === inputs[6]) {
    //     temp5 = temp3 + temp4;
    // } else {
    //     temp5 = ((temp3 + temp4) * 26) + (inputs[6] + 10);
    // }
    // ***********************************************
    // replaced with
    temp5 = ((temp3 + temp4) * 26) + (inputs[6] + 10);

    // input 7, do not optimize this
    let temp6;

    // digit 6 + 1 ==> digit 7
    // if (((temp5 % 26) + -11) === inputs[7]) {
    //     // if (inputs[6] !== inputs[7]+1) {
    //     //     console.log(`oddball ${inputs[4]}${inputs[5]}${inputs[6]}${inputs[7]}`)
    //     // }
    //     // console.log(`${inputs[4]}${inputs[5]}${inputs[6]}${inputs[7]}`)
    //     temp6 = Math.floor(temp5 / 26);
    // } else {
    //     // if (inputs[6] === inputs[7]+1) {
    //     //     console.log(`oddballioio ${inputs[4]}${inputs[5]}${inputs[6]}${inputs[7]}`)
    //     // }
    //     // console.log(`${inputs[4]}${inputs[5]}${inputs[6]}${inputs[7]}`)
    //     temp6 = (Math.floor(temp5 / 26) * 26) + (inputs[7] + 13);
    // }
    // replaced with
    if (inputs[6] === inputs[7] + 1) {
        temp6 = Math.floor(temp5 / 26);
    } else {
        temp6 = (Math.floor(temp5 / 26) * 26) + (inputs[7] + 13);
    }

    // input 8
    let temp7;
    let temp8;
    // this is optimized out **************************************
    // if ( ((temp6 % 26) + 14) === inputs[8] ) {
    //     // this never runs
    //     temp8 = Math.floor(temp6 / 26);
    //     temp7 = (temp6 % 26) + -1;
    // } else {
    //     temp8 = Math.floor((temp6 * 26 + (inputs[8] + 3)) / 26)
    //     temp7 = ((temp6 * 26 + (inputs[8] + 3)) % 26) + -1;
    // }
    // ************************************************************
    // replaced with
    temp8 = Math.floor((temp6 * 26 + (inputs[8] + 3)) / 26)
    temp7 = ((temp6 * 26 + (inputs[8] + 3)) % 26) + -1;

    // if (temp8 > globals.max1) {
    //     globals.max1 = temp8;
    // }
    // if ((globals.min1 === undefined) || (temp8 < globals.min1)) {
    //     globals.min1 = temp8;
    // }
    // if (temp7 > globals.max2) {
    //     globals.max2 = temp7;
    // }
    // if ((globals.min2 === undefined) || (temp7 < globals.min2))
    // {
    //     globals.min2 = temp7;
    // }
    // if (globals.temp8map === undefined) {
    //     globals.temp8map = {}
    // }
    // const modit = temp8 % 26;
    // globals.temp8map[modit] = 1;
    // if ((temp8 < 0) || (temp7 < 0)) {
    //     throw("less than zero");
    // }

    // temp8 min is 235286
    // temp8 % 26 is min 12
    // temp7 is [11...3]
    // input 9 do not optimize this
    let temp10, temp11;

    // this branch passes true when inputs[8] + 2 === inputs[9]
    // if (temp7 === inputs[9]) {
    //     // if (globals.someMap === undefined) {
    //     //     globals.someMap = {};
    //     // }
    //     // if (globals.someMap[`${inputs[8]}${inputs[9]}`] === undefined) {
    //     //     console.log(`${inputs[8]}${inputs[9]}`);
    //     // }
    //     //
    //     // globals.someMap[`${inputs[8]}${inputs[9]}`] = 1
    //
    //     // temp10 14..4
    //     temp10 = (temp8 % 26) - 8
    //     // temp11 > 9049
    //     temp11 = Math.floor(temp8 / 26);
    // } else {
    //     // if (globals.someMap === undefined) {
    //     //     globals.someMap = {};
    //     // }
    //     // if (globals.someMap[`${inputs[8]}${inputs[9]}`] === undefined) {
    //     //     console.log(`${inputs[8]}${inputs[9]}`);
    //     // }
    //     //
    //     // globals.someMap[`${inputs[8]}${inputs[9]}`] = 1
    //
    //     // temp10 11..19
    //     temp10 = (((temp8 * 26) + (inputs[9] + 10)) % 26) - 8;
    //     // temp 11 is really big
    //     temp11 = Math.floor(((temp8 * 26) + (inputs[9] + 10))/26);
    // }

    // replaced with inputs[8] + 2 === inputs[9]
    if (inputs[8] + 2 === inputs[9]) {
        temp10 = (temp8 % 26) - 8
        temp11 = Math.floor(temp8 / 26);
    } else {
        temp10 = (((temp8 * 26) + (inputs[9] + 10)) % 26) - 8;
        temp11 = Math.floor(((temp8 * 26) + (inputs[9] + 10))/26);
    }

    let temp12;
    if (temp10 === inputs[10]) {
        // temp12 something big, >9049 or really big
        temp12 = temp11;
    } else {
        // temp12 is big
        temp12 = temp11 * 26 + (inputs[10] + 10);
    }

    let temp13, temp14, temp15;
    if ( ((temp12 % 26) + -5) === inputs[11] ) {

        // const key = `${inputs[10]}${inputs[11]}`
        // if (globals.someMap === undefined) {
        //     globals.someMap = {};
        // }
        // if (globals.someMap[key] === undefined) {
        //     console.log(key);
        // }
        //
        // globals.someMap[key] = 1

        // 13 is positive
        temp13 = Math.floor(temp12 / 26);
        // 13 is positive
        temp15 = Math.floor(temp13 / 26);
        temp14 = temp13 % 26 - 16;
    } else {
        // this division might be extra
        // temp13 = (Math.floor(temp12 / 26) * 26) + (inputs[11] + 14);
        // temp15 = Math.floor(temp13 / 26);
        // temp14 = temp13 % 26 - 16;

        const key = `${inputs[8]}${inputs[9]}${inputs[10]}${inputs[11]}`
        // if (globals.someMap === undefined) {
        //     globals.someMap = {};
        // }
        // if (globals.someMap[key] === undefined) {
        //     console.log(key);
        // }
        //
        // globals.someMap[key] = 1

        // next line simplifies
        temp15 = Math.floor(temp12 / 26);
        temp14 = inputs[11] + 14 - 16;
    }

    let temp16;
    if (temp14 === inputs[12]) {
        temp16 = temp15;
    } else {
        temp16 = (temp15 * 26) + (inputs[12] + 6);
    }

    let temp17 = Math.floor(temp16 / 26);
    if (((temp16 % 26) - 6) === inputs[13]) {
        z = temp17;
    } else {
        z = temp17 * 26 + inputs[13] + 5;
    }

    return z;
}
// translateProgram();
// testProgram1();
runProgram2();
console.log(JSON.stringify(globals));
