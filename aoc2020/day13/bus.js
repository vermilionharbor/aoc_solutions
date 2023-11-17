const fs = require('fs');

const input = fs.readFileSync("test.txt").toString().split("\n");

console.log(input[0]);
console.log(input[1]);

const routes = input[1].split(",");

const mytime = parseInt(input[0], 10);

const wait = (time, bus) => {
    if (time % bus === 0) {
        return 0;
    } else {
        return bus - (time % bus);
    }
}

// let minWait;
// let minBus;
//
// routes.forEach(r => {
//     if (r !== "x") {
//         let bus = parseInt(r, 10);
//         let waitTime = wait(mytime, bus);
//         if ((minWait === undefined) || (waitTime < minWait)) {
//             minWait = waitTime;
//             minBus = bus;
//         }
//         console.log(`bus ${r} ${waitTime}`);
//     }
// })
//
// console.log(`minWait ${minWait} ${minWait*minBus}`);

// const manualInput = "67,7,59,61";
// const manualInput = "67,x,7,59,61";
// const manualInput = "67,7,x,59,61";
// const manualInput = "1789,37,47,1889";
const manualInput = "17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,643,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29,x,433,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,19";
const manualRoutes = manualInput.split(",");

let step = 1;
let cycle = 1;
let firstMulter = 0;
let multer;
let modder;

manualRoutes.forEach((r, index) => {
    if (r !== "x") {
        let bus = parseInt(r, 10);
        if (multer === undefined) {
            multer = bus;
            firstMulter = bus;
        } else {
            modder = bus;
            while ((((cycle * multer) + index) % modder) !== 0) {
                cycle += step;
            }
            // console.log(cycle);
            step *= modder;
        }
    }
})

console.log(`cycle ${cycle} time ${cycle*firstMulter}`);

// console.log('** testing **');
// cycle = 1;
// step = 1;
// while ((((cycle * 7) + 1) % 13) !== 0) {
//     cycle += step;
// }
//
// console.log(`cycle ${cycle} ${7*cycle} ${7*cycle+1}`);
//
// step = 13;
// while ((((cycle * 7) + 4) % 59) !== 0) {
//     cycle += step;
// }
//
// step = step
//
//
// console.log(`cycle ${cycle} ${7*cycle} ${7*cycle+1} ${7*cycle+4}`);