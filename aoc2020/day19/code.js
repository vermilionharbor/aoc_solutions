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
    // console.log(rule);
}

console.log(rules)

let numMatches = 0;
const matches = match(rules, 0);

while (i < lines.length) {
    if (lines[i].length > 0) {
        // console.log(`matching word ${lines[i]} ${matchWord(lines[i], rules)}`);
        let isMatch = matchWord(lines[i], matches);
        console.log(`matching word ${lines[i]} ${isMatch}`);
        if (isMatch) {
            numMatches++;
        }
    }
    i++;
}

console.log(`totalPatterns ${matches.length} numMatches ${numMatches}`);