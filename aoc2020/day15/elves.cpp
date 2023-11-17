//const elf = (starters, finalRound) => {
//    map = {};
//
//    // map[a] = 1;
//    // map[b] = 2;
//    // map[c] = 3;
//    starters.forEach((v, index) => {
//        map[v] = index + 1;
//    });
//
//    let turn = starters.length + 1;
//    let lastTurn = finalRound;
//    let nextVal = 0;
//    let curVal;
//    while (turn <= lastTurn) {
//        curVal = nextVal;
//        if (turn % 10000 === 0) {
//            console.log(`${turn} ${curVal}`);
//            console.log(`*${Object.keys(map).length}`);
//        }
//        // console.log(`*${findLargest(map)}`);
//        // console.log(map);
//        if (map[curVal] === undefined) {
//            nextVal = 0;
//        } else {
//            nextVal = turn - map[curVal];
//        }
//        map[curVal] = turn;
//        turn += 1;
//    }
//    return curVal;
//}
#include <stdio.h>
#include <stdlib.h>

int elf(int *starters, int numStarters, int finalRound) {
    int *map = (int *) malloc(finalRound * sizeof(int));
    int i;
    for (i=0; i<finalRound; i++) {
        map[i] = -1;
    }

    for (i=0; i<numStarters; i++) {
        map[starters[i]] = i+1;
    }

    int turn = numStarters + 1;
    int lastTurn = finalRound;
    int nextVal = 0;
    int curVal;
    while (turn <= lastTurn) {
        curVal = nextVal;
//        if (turn % 50000 == 0) {
//            printf("turn %d\n", turn);
//        }
        if (map[curVal] == -1) {
            nextVal = 0;
        } else {
            nextVal = turn - map[curVal];
        }
        map[curVal] = turn;
        turn += 1;
    }

    free(map);
    return curVal;
}

int main() {
    int a[3] = {0, 3, 6};
    int finalRound = 30000000;
    int result = elf(a, 3, finalRound);
    printf("Hello Elves, %d\n", result);

    a[0] = 1;
    a[1] = 3;
    a[2] = 2;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    a[0] = 2;
    a[1] = 1;
    a[2] = 3;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    a[0] = 1;
    a[1] = 2;
    a[2] = 3;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    a[0] = 2;
    a[1] = 3;
    a[2] = 1;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    a[0] = 3;
    a[1] = 2;
    a[2] = 1;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    a[0] = 3;
    a[1] = 1;
    a[2] = 2;
    result = elf(a, 3, finalRound);
    printf("Hello Elves {%d, %d, %d}, %d\n", a[0], a[1], a[2], result);

    int b[7] = {0, 13, 16, 17, 1, 10, 6};
    result = elf(b, 7, finalRound);
    printf("Hello Elves {final}, %d\n", result);
    return 0;
}