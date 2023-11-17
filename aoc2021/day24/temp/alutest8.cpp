#include <stdio.h>
#include <assert.h>

int runProgramOptimized (int *inputs) {
    int x, y, z, w;
    int temp1, temp2;
//    if (((((  ( ((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) % 26) + -8) == inputs[3]) {
//        temp1 = (((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26;
//        // optimized out temp2 = (temp1 % 26) + 11;
//    } else {
//        temp1 = ((((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26) * 26) + (inputs[3] + 3));
//        // optimized out temp2 = (temp1 % 26) +11;
//    }
    if (inputs[2] == inputs[3]) {
        temp1 = (((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26;
    } else {
        temp1 = ((((((((inputs[0] + 12) * 26) + (inputs[1] + 9)) * 26) + inputs[2] + 8) / 26) * 26) + (inputs[3] + 3));
    }


    int temp3;

    // this is optimized out ***************
    // if (temp2 == inputs[4]) {
    //     temp3 = temp1;
    //     console.log('here')
    // } else {
    //     temp3 = (temp1 * 26 + inputs[4]);
    // }
    // ************************************
    // replaced with
    temp3 = (temp1 * 26 + inputs[4]);

    int temp4;

    // this is optimized out ******************
    // if (x == inputs[5]) {
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
    int temp5;
    // this is optimized out ************************
    // if ((((temp3 + temp4) % 26) + 14) == inputs[6]) {
    //     temp5 = temp3 + temp4;
    // } else {
    //     temp5 = ((temp3 + temp4) * 26) + (inputs[6] + 10);
    // }
    // ***********************************************
    // replaced with
    temp5 = ((temp3 + temp4) * 26) + (inputs[6] + 10);

    // input 7, do not optimize this
    int temp6;
//    if (((temp5 % 26) + -11) == inputs[7]) {
//        temp6 = (temp5 / 26);
//    } else {
//        temp6 = ((temp5 / 26) * 26) + (inputs[7] + 13);
//    }
    if (inputs[6] == (inputs[7] +1)) {
        temp6 = (temp5 / 26);
    } else {
        temp6 = ((temp5 / 26) * 26) + (inputs[7] + 13);
    }

    // input 8
    int temp7;
    int temp8;
    // this is optimized out **************************************
    // if ( ((temp6 % 26) + 14) == inputs[8] ) {
    //     // this never runs
    //     temp8 = Math.floor(temp6 / 26);
    //     temp7 = (temp6 % 26) + -1;
    // } else {
    //     temp8 = Math.floor((temp6 * 26 + (inputs[8] + 3)) / 26)
    //     temp7 = ((temp6 * 26 + (inputs[8] + 3)) % 26) + -1;
    // }
    // ************************************************************
    // replaced with
    temp8 = ((temp6 * 26 + (inputs[8] + 3)) / 26);
    temp7 = ((temp6 * 26 + (inputs[8] + 3)) % 26) + -1;

    // if (temp8 > globals.max1) {
    //     globals.max1 = temp8;
    // }
    // if ((globals.min1 == undefined) || (temp8 < globals.min1)) {
    //     globals.min1 = temp8;
    // }
    // if (temp7 > globals.max2) {
    //     globals.max2 = temp7;
    // }
    // if ((globals.min2 == undefined) || (temp7 < globals.min2))
    // {
    //     globals.min2 = temp7;
    // }
    // if (globals.temp8map == undefined) {
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
    int temp10, temp11;
    // if (temp7 == inputs[9]) {
    if (inputs[8] + 2 == inputs[9]) {
        // temp10 14..4
        temp10 = (temp8 % 26) - 8;
        // temp11 > 9049
        temp11 = (temp8 / 26);
    } else {
        // temp10 11..19
        temp10 = (((temp8 * 26) + (inputs[9] + 10)) % 26) - 8;
        // temp 11 is really big
        temp11 = (((temp8 * 26) + (inputs[9] + 10))/26);
    }


    int temp12;
    if (temp10 == inputs[10]) {
        // temp12 something big, >9049 or really big
        temp12 = temp11;
    } else {
        // temp12 is big
        temp12 = temp11 * 26 + (inputs[10] + 10);
    }

    int temp13, temp14, temp15;
    if ( ((temp12 % 26) + -5) == inputs[11] ) {
        // 13 is positive
        temp13 = (temp12 / 26);
        // 13 is positive
        temp15 = (temp13 / 26);
        temp14 = temp13 % 26 - 16;
    } else {
        temp13 = ((temp12 / 26) * 26) + (inputs[11] + 14);
        temp15 = (temp13 / 26);
        temp14 = temp13 % 26 - 16;
    }

    int temp16;
    if (temp14 == inputs[12]) {
        temp16 = temp15;
    } else {
        temp16 = (temp15 * 26) + (inputs[12] + 6);
    }

    int temp17 = (temp16 / 26);
    if (((temp16 % 26) - 6) == inputs[13]) {
        z = temp17;
    } else {
        z = temp17 * 26 + inputs[13] + 5;
    }

    return z;
}

void runProgram() {
    int a, b, c, d, e, f, g, h, i, j, k, l, m, n;
    int inputs[20];
    // for (a=9; a> 0; a--) {
    a = 8;
        for (b=9; b> 0; b--) {
            for (c=9; c> 0; c--) {
                for (d=9; d> 0; d--) {
                    for (e=9; e> 0; e--) {
                        for (f=9; f> 0; f--) {
                            // console.log(`running ${a}${b}${c}${d}${e}${f}...`);
                            for (g=9; g> 0; g--) {
                                // console.log(`running ${a}${b}${c}${d}${e}${f}${g}...`);
                                printf("running %d%d%d%d%d%d%d\n", a, b, c, d, e, f, g);
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
//                                                            inputs = [a, b, c, d, e, f, g, h, i, j, k, l, m, n];
                                                            inputs[0] = a;
                                                            inputs[1] = b;
                                                            inputs[2] = c;
                                                            inputs[3] = d;
                                                            inputs[4] = e;
                                                            inputs[5] = f;
                                                            inputs[6] = g;
                                                            inputs[7] = h;
                                                            inputs[8] = i;
                                                            inputs[9] = j;
                                                            inputs[10] = k;
                                                            inputs[11] = l;
                                                            inputs[12] = m;
                                                            inputs[13] = n;


                                                            //inputs = [n, m, l, k, j, i, h, g, f, e, d, c, b, a];
                                                            // const cpu = runProgram(commands, inputs);
                                                            // if (cpu.z == 0) {
                                                            //     console.log(`*** found solution ****`);
                                                            //     console.log(inputs);
                                                            //     throw ("answer found");
                                                            // }

                                                            // const z = runProgramFast(inputs);
                                                            // if (z == 0) {
                                                            //     console.log(`*** found solution ****`);
                                                            //     console.log(inputs);
                                                            //     throw ("answer found");
                                                            // }

                                                            int zo = runProgramOptimized(inputs);

                                                            // if (z !== zo) {
                                                            //     console.log(`mismatch ${JSON.stringify(inputs)} ${z} ${zo}`);
                                                            //     throw("mismatch");
                                                            // }

                                                            if (zo == 0) {
                                                                printf("*** found solution ****");
                                                                printf("%d%d%d%d%d%d%d%d%d%d%d%d%d%d", a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                                                                assert(false);
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
//    }
}

int main() {
    printf("Hello World\n");
    runProgram();
    return 0;
}