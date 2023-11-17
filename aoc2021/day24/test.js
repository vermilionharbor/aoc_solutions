const a = 99999999999999
const b = 10000000000000

console.log(Math.floor(a/b));

let i;
let iter = 0;
for (i=0; i<a; i++) {
   iter++
   if (iter > 10000) {
       console.log(i);
       iter = 0;
   }
}

console.log('done');
