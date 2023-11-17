const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let i;
const start = lines[0];
const rules = [];
for (i=2; i<lines.length; i++) {
    const term = lines[i].split(' ');
    // console.log(lines[i]);
    console.log(`${term[0]} ${term[2]}`);
    rules.push({
        pattern: term[0],
        value: term[2],
    })
}

const polymerize = (start, rules) => {
    const addMap = {}
    rules.forEach(r => {
        let i;
        for (i=0; i<(start.length-1); i++) {
            if ((start[i] === r.pattern[0]) && (start[i+1] === r.pattern[1])) {
                addMap[i] = r.value;
            }
        }
    })
    let molecule = '';
    let i;
    for (i=0; i<start.length; i++) {
        molecule += start[i];
        if (addMap[i] !== undefined) {
            molecule += addMap[i];
        }
    }
    return molecule;
}

const efficientPolymerize = (pairMap, rules) => {
    const newPairs = {};
    rules.forEach(r => {
        // check each rule to see if the pattern is in the pairMap
        if (pairMap[r.pattern] !== undefined) {
            // each insertion creates 2 pairs
            const pair0 = r.pattern[0] + r.value;
            const pair1 = r.value + r.pattern[1];
            if (newPairs[pair0] === undefined) {
                newPairs[pair0] = pairMap[r.pattern];
            } else {
                newPairs[pair0] += pairMap[r.pattern];
            }
            if (newPairs[pair1] === undefined) {
                newPairs[pair1] = pairMap[r.pattern];
            } else {
                newPairs[pair1] += pairMap[r.pattern];
            }

            // delete this entry because of all of the pairs are annihilated
            delete pairMap[r.pattern];
        }
    });

    // merge the maps
    for (const [key, val] of Object.entries(newPairs)) {
        if (pairMap[key] === undefined) {
            pairMap[key] = val;
        } else {
            pairMap[key] += val;
        }
    }
}

const score = (molecule) => {
    const elementMap = {}
    let i;
    for (i=0; i<molecule.length; i++) {
        if (elementMap[molecule[i]] === undefined) {
            elementMap[molecule[i]] = 1;
        } else {
            elementMap[molecule[i]] ++;
        }
    }
//    console.log(JSON.stringify(elementMap));
//    console.log(Object.entries(elementMap));
    const counts = [];
    for (const [key, val] of Object.entries(elementMap)) {
        counts.push(val);
    }
    counts.sort((a, b) => b-a);
//    console.log(counts);
    return (counts[0] - counts[counts.length-1] );
}

const efficientScore = (pairMap) => {
    const elementMap = {};
    for (const [key, val] of Object.entries(pairMap)) {
        const element = key[0];
        if (elementMap[element] === undefined) {
            elementMap[element] = val;
        } else {
            elementMap[element] += val;
        }
    }

    const counts = [];
    for (const [key, val] of Object.entries(elementMap)) {
        counts.push(val);
    }
    counts.sort((a, b) => b-a);
//    console.log(counts);
    return (counts[0] - counts[counts.length-1] );
}

const countLength = (pairMap) => {
    let length = 0;
    for (const [key, val] of Object.entries(pairMap)) {
        length += val;
    }
    return length;
}

const insertPairs = (molecule) => {
    let i = 0;
    const pairMap = {}
    for (i=0; i<molecule.length-1; i++) {
        const pair = molecule[i] + molecule[i+1];
        if (pairMap[pair] === undefined) {
            pairMap[pair] = 1;
        } else {
            pairMap[pair] ++;
        }
    }
    const dummyPair = molecule[molecule.length-1] + '_';
    pairMap[dummyPair] = 1;
    return pairMap;
}

i = 0;
//let molecule = start;
//while (i<10) {
//    molecule = polymerize(molecule, rules);
//    i++;
//    console.log(`step ${i}, length ${molecule.length}, score ${score(molecule)}`)
//
//}
//const pairMap = insertPairs(start);
//console.log(pairMap);
//console.log(countLength(pairMap));
let molecule = start;
const pairMap = insertPairs(start);
while (i<40) {
    efficientPolymerize(pairMap, rules);
    i++;
    console.log(`step ${i}, length ${countLength(pairMap)}, score ${efficientScore(pairMap)}`);
}