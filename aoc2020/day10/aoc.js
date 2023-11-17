const example2 = [
28,
33,
18,
42,
31,
14,
46,
20,
48,
47,
24,
23,
49,
45,
19,
38,
39,
11,
1,
32,
25,
35,
8,
17,
7,
9,
4,
2,
34,
10,
3
];

const example1 = [
16,
10,
15,
5,
1,
11,
7,
19,
6,
12,
4
];

const testData = [
118,
14,
98,
154,
71,
127,
38,
50,
36,
132,
66,
121,
65,
26,
119,
46,
2,
140,
95,
133,
15,
40,
32,
137,
45,
155,
156,
97,
145,
44,
153,
96,
104,
58,
149,
75,
72,
57,
76,
56,
143,
11,
138,
37,
9,
82,
62,
17,
88,
33,
5,
10,
134,
114,
23,
111,
81,
21,
103,
126,
18,
8,
43,
108,
120,
16,
146,
110,
144,
124,
67,
79,
59,
89,
87,
131,
80,
139,
31,
115,
107,
53,
68,
130,
101,
22,
125,
83,
92,
30,
39,
102,
47,
109,
152,
1,
29,
86
];

const findAnswer = (adapters) => {
  adapters.push(0);
  adapters.sort((a,b) => a-b);
  adapters.push(adapters[adapters.length-1]+3);
  console.log(adapters);

  let diff1 = 0;
  let diff3 = 0;
  for (let i=1; i<adapters.length; i++) {
    const diff = adapters[i] - adapters[i-1];
    if (diff === 1) {
      diff1++;
    } else if (diff === 3) {
      diff3++;
    } else if (diff > 3) {
      console.log('bad input', diff);
    }
  }

  console.log(`diff1 ${diff1} diff3 ${diff3}`);
  return diff1 * diff3;
}

const findPaths = (adapters, index, amo) => {
  let numPaths = 0;
  if (index >= adapters.length-1) {
    return 1;
  }

  if ((index+1 < adapters.length) && (adapters[index+1]-adapters[index] < 4)) {
    if (amo[index+1] === null) {
      amo[index+1] = findPaths(adapters, index+1, amo);
    }
    numPaths += amo[index+1];
  }
  if ((index+2 < adapters.length) && (adapters[index+2] - adapters[index] < 4)) {
    if (amo[index+2] === null) {
      amo[index+2] = findPaths(adapters, index+2, amo);
    }
    numPaths += amo[index+2];
  }
  if ((index+3 < adapters.length) && (adapters[index+3] - adapters[index] < 4)) {
    if (amo[index+3] === null) {
      amo[index+3] = findPaths(adapters, index+3, amo);
    }
    numPaths += amo[index+3];
  }

  return numPaths;
}

const padInputs = (adapters) => {
  adapters.push(0);
  adapters.sort((a,b) => a-b);
  adapters.push(adapters[adapters.length-1]+3);
}

const adapters = testData; 
console.log(`the answer is ${findAnswer(adapters)}`);
//padInputs(example2);
console.log(`the number of paths ${findPaths(adapters, 0, adapters.map(x=>null))}`);

