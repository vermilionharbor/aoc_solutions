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

const runProgramFast = (inputs) => {
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 14
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 12
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 10
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 9
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 13
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 8
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -8
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 3
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 11
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 0
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 11
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 11
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 14
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 10
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -11
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 13
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 1
    // add x 14
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 3
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -1
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 10
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -8
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 10
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -5
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 14
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -16
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 6
    // mul y x
    // add z y
    // inp w
    // mul x 0
    // add x z
    // mod x 26
    // div z 26
    // add x -6
    // eql x w
    // eql x 0
    // mul y 0
    // add y 25
    // mul y x
    // add y 1
    // mul z y
    // mul y 0
    // add y w
    // add y 5
    // mul y x
    // add z y
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
                                                            inputs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n];
                                                            const cpu = runProgram(commands, inputs);
                                                            if (cpu.z === 0) {
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
            }
        }
    }
}

const runProgram2Up = () => {
    const commands = readProgram('input.txt');
    let a, b, c, d, e, f, g, h, i, j, k, l, m, n;
    let inputs;
    for (a=1; a<10; a++) {
        for (b=1; b<10; b++) {
            for (c=1; c<10; c++) {
                for (d=1; d<10; d++) {
                    for (e=1; e<10; e++) {
                        for (f=1; f<10; f++) {
                            for (g=1; g<10; g++) {
                                for (h=1; h<10; h++) {
                                    for (i=1; i<10; i++) {
                                        for (j=1; j<10; j++) {
                                            console.log(`running ${a}${b}${c}${d}${e}${f}${g}${h}${i}${j}...`);
                                            for (k=1; k<10; k++) {
                                                for (l=1; l<10; l++) {
                                                    for (m=1; m<10; m++) {
                                                        for (n=1; n<10; n++) {
                                                            inputs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n];
                                                            const cpu = runProgram(commands, inputs);
                                                            if (cpu.z === 0) {
                                                                console.log(`*** found solution ****`);
                                                                console.log(inputs);
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
}

const translateProgram = () => {

}


// translateProgram();
// testProgram1();
runProgram2();
// runProgram2Up();
// fastProgram2();