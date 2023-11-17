const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let i=0;

let rules = {};

const match = (rules, index) => {
    // console.log(`${JSON.stringify(rules[index])}`);
    if (rules[index].literal !== undefined) {
        // console.log("here", rules[index].literal)
        return [rules[index].literal];
    } else {
        let totalMatches = [];
        rules[index].sub.forEach(subChoice => {
            let subrule = subChoice;
            let matches = [""];
            let i = 0;
            while (i < subrule.length) {
                let partialMatch = match(rules, subrule[i]);
                let nextMatches = [];
                matches.forEach(m => {
                    partialMatch.forEach(pm => {
                        nextMatches.push(m + pm);
                    })
                })
                matches = nextMatches;
                i++;
            }
            matches.forEach(m => {
                totalMatches.push(m);
            });
        })
        return totalMatches;
    }
}

const matchWord = (word, matches) => {
    return (matches.some(w => w === word));
}

while (i < lines.length && lines[i].length > 0) {
    const [key, val] = lines[i].split(":");
    // console.log(`${key} ${val}`);

    let rule = [];
    // see if there's an or |
    if (val.indexOf("|") !== -1) {
        const leftRightFields = val.split("|");
        let left = leftRightFields[0].trim();
        let right = leftRightFields[1].trim();
        let leftTerms = left.split(" ");
        let rightTerms = right.split(" ");
        // console.log("left terms");
        rule = {
            sub: [[], []],
        };
        leftTerms.forEach(r => {
            // console.log(r*1);
            rule.sub[0].push(r*1);
        })
        // console.log("right terms");
        rightTerms.forEach(r => {
            // console.log(r*1);
            rule.sub[1].push(r*1);
        })
        // console.log(rule);
    } else if (val.indexOf('"') !== -1) {
        // console.log(`literal ${val}`)
        rule = {
            literal: val.trim().replace(/["]/g, '')
        }
        // console.log(rule);
    } else {
        // simple rule set
        let terms = val.trim().split(" ");
        // console.log("simple rule set")
        // console.log(terms);
        rule = {
            sub: [[]]
        };
        terms.forEach(r => {
            // console.log(r*1);
            rule.sub[0].push(r*1);
        })
        // console.log(rule);
    }
    rules[key] = rule;
    i++;
    console.log(rule);
}


console.log('describing 42');
let min42 = 100;
let max42 = 0;
const matches42 = match(rules, 42);
console.log(matches42);
console.log(matches42.length)
matches42.forEach(m => {
    if (m.length > max42) {
        max42 = m.length;
    }
    if (m.length < min42) {
        min42 = m.length;
    }
});
console.log(`min42 ${min42} max42 ${max42}`);


let min31 = 100;
let max31 = 0;
const matches31 = match(rules, 31);
console.log(matches31);
console.log(matches31.length);
matches31.forEach(m => {
    if (m.length > max31) {
        max31 = m.length;
    }
    if (m.length < min31) {
        min31 = m.length;
    }
});
console.log(`min31 ${min31} max31 ${max31}`);

const matchLeft8 = (word) => {
    // rule 8 is "42 | 42 8"
    if (matches42.some(v => v === word)) {
        return true;
    } else {
        // walk through all of matches42 and find the beginning matches
        // strip them off and call recursively
        for (let i=0; i<matches42.length; i++) {
            let v = matches42[i];
            if (word.startsWith(v)) {
                let right = word.slice(v.length, word.length);
                let matchRight = matchLeft8(right);
                if (matchRight === true)
                {
                    return true;
                }
            }
        }
    }
}

const matchRight11 = (word) => {
    // console.log("matchRight11", word)
    // rule 11 is "42 31 | 42 11 31"

    // first slice it into 2 and see if it fits 42 31 case
    // console.log('matchRight11: test first part', word);
    for (let i=1; i<word.length; i++) {
        let left = word.slice(0, i);
        let right = word.slice(i, word.length);
        // console.log(`AAA ${left} ${right}`);

        // left must match rule 42
        if (matches42.some(v => v === left) === true) {
            if (matches31.some(v => v === right) === true) {
                return true;
            }
        }
    }

    // console.log('matchRight11: test second part', word);
    // slice it into 3 and see if it fits 42 11 31 case
    for (let i=1; i<word.length-1; i++) {
        for (let j=i+1; j<word.length; j++) {
            let left = word.slice(0, i);
            let mid = word.slice(i, j);
            let right = word.slice(j, word.length);
            // console.log(`BBB ${left} ${mid} ${right}`)
            if (matches42.some(v => v === left) === true) {
                if (matches31.some(v => v === right) === true) {
                    let matchMid = matchRight11(mid);
                    return matchMid;
                }
            }

        }
    }
    // console.log('matchRight11: done', word)

    return false;
}

const matchWordPart2 = (word) => {
    for (let i=1; i<word.length; i++) {

        // split into left and right components to match rule 0
        // rule 0 is "8 11"
        let left = word.slice(0, i);
        let right = word.slice(i, word.length);
        // console.log(`${left} ${right}`);

        // left must match rule 8
        // console.log("matchLeft8")
        if (matchLeft8(left) === true) {

            // console.log("matchRight11")
            // right must match rule 11
            if (matchRight11(right) === true) {
                return true;
            }
        }
    }

    return false;
}

// for (let [key, val] of Object.entries(rules)) {
//     if (val.sub !== undefined) {
//         val.sub.forEach(option => {
//             if (option.some(v => v === 8)) {
//                 console.log(`key ${key} contains 8 ${JSON.stringify(val)} ${option}`);
//             }
//             if (option.some(v => v === 11)) {
//                 console.log(`key ${key} contains 11 ${JSON.stringify(val)} ${option}`);
//             }
//         })
//     }
// }

console.log('testing input');
let numMatches = 0;
while (i < lines.length) {
    if (lines[i].length > 0) {
        let lineResult = matchWordPart2(lines[i]);
        console.log(`${lines[i]} ${lineResult}`);
        if (lineResult === true) {
            numMatches ++;
        }
    }
    i++;
}

console.log(`numMatches ${numMatches}`);