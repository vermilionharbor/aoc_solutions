const numbers = [
35,
20,
15,
25,
47,
40,
62,
55,
65,
95,
102,
117,
150,
182,
127,
219,
299,
277,
309,
576
];

const wsize = 5;
const map = {};

const mapContains = (m, n) => {
  let keys = Object.keys(m);
  for (let i=0; i<keys.length; i++) {
    if (m[keys[i]].some(x => x === n)) {
      return true;
    }
  }
  return false;
}

const mapAdd  = (m, index) => {
  let newEntry = [];
  Object.keys(m).forEach(n => {
    newEntry.push(n*1 + index);
  })
  map[index] = newEntry;
}

for (let i=0; i<wsize; i++) {
  let index = numbers[i];
  // let newEntry = [];
  // Object.keys(map).forEach(n => {
  //   newEntry.push(n*1 + index);
  // })
  // map[index] = newEntry;
  mapAdd(map, index);
}

// console.log(map);
// console.log(mapContains(map, 40));
let i = wsize;
let firstFailure = 0;

while (i < numbers.length) {
  delete map[numbers[i-wsize]];
  if (mapContains(map, numbers[i])) {
    mapAdd(map, numbers[i])
  } else {
    firstFailure = numbers[i];
    break;
  }
  i++;
}

const findWeakness = (n, f) => {
  let i=0;
  while (i < n.length) {
    let sum=n[i];
    let j=i+1;
    let smallest = n[i];
    let largest = n[i];

    while (j < n.length && sum < f) {
      sum += n[j];
      if (n[j] > largest) {
        largest = n[j];
      }
      if (n[j] < smallest) {
        smallest = n[j];
      }

      j++;
    }

    if ((j !== i+1) && sum === f) {
      console.log(`${n[i]} to ${n[j-1]}`)
      console.log(smallest + largest);
    }

    i++
  }
}

console.log(`first failure ${firstFailure}`);

findWeakness(numbers, firstFailure);
