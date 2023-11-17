const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let i=0;
let fields = {};
while (lines[i] !== "") {
    // console.log(lines[i]);
    let terms = lines[i].split(": ");
    // console.log(`${terms[0]} ${terms[1]}`);
    let ranges = terms[1].split(" or ");
    fields[terms[0]] = [];
    ranges.forEach(r => {
        let bounds = r.split("-");
        fields[terms[0]].push({
            low: parseInt(bounds[0], 10),
            high: parseInt(bounds[1], 10)
        });
    });
    i++;
}

console.log(fields);
i+=2;

const checkValidField = (val, field) => {
    for (let i=0; i<field.length; i++) {
        if (val >= field[i].low && val <= field[i].high) {
            return true;
        }
    }
    return false;
}
const checkValid = (val, fields) => {
    let valueValid = false;
    let j = 0;
    let fieldItems = Object.entries(fields);
    while ((j < fieldItems.length) && (valueValid === false)) {
        if (checkValidField(val, fieldItems[j][1])) {
            valueValid = true;
        }
        j++;
    }

    return valueValid;
}

// your ticket
let myTicket;
while (lines[i] !== "") {
    console.log(lines[i]);
    myTicket = lines[i];
    i++;
}
let myTicketValues = myTicket.split(",").map(v => v*1);

i+=2;

let invalidSum = 0;
let nearbyTickets = [];
// nearby tickets
while (i < lines.length) {
    // console.log(lines[i]);
    nearbyTickets.push(lines[i]);
    // let ticketVals = lines[i].split(",");
    // ticketVals = ticketVals.map(v => v*1);
    // for (let i=0; i<ticketVals.length; i++) {
    //     if (checkValid(ticketVals[i], fields) === false) {
    //         console.log(`invalid`, ticketVals[i]);
    //         invalidSum += ticketVals[i];
    //     }
    // }
    i++;
}

// console.log(`invalid sum ${invalidSum}`);

console.log(`total nearby: ${nearbyTickets.length}`);
nearbyTickets = nearbyTickets.filter(t => {
    let ticketVals = t.split(",");
    ticketVals = ticketVals.map(v => v*1);
    return !ticketVals.some(v => checkValid(v, fields) === false);
})

// console.log(nearbyTickets);
console.log(nearbyTickets.length)

// table of fieldnames to positions
let fieldMap = {};
let numFields = Object.keys(fields).length;
for (let k of Object.keys(fields)) {
    fieldMap[k] = Array(numFields).fill(1);
}
// console.log(fieldMap);
nearbyTickets.forEach(t => {
    let ticketVals = t.split(",");
    ticketVals = ticketVals.map(v => v*1);
    let fieldItems = Object.entries(fields);

    ticketVals.forEach ((tv, tvIndex) => {
        let j = 0;
        while (j < fieldItems.length) {
            if (checkValidField(tv, fieldItems[j][1]) === false) {
                // flag table as false
                fieldMap[fieldItems[j][0]][tvIndex] = 0;
            }
            j++;
        }
    });
});

console.log(fieldMap);
let fieldMapEntries = Object.entries(fieldMap);
fieldMapEntries.forEach(entry => {
    console.log(`${entry[0]} ${entry[1].reduce((acc, val) => {
        return val === 0 ? acc : acc + 1;
    }, 0)}`);
})

let fieldMapArray = fieldMapEntries.map(entry => {
    return {
        name: entry[0],
        map: entry[1],
        numValid: entry[1].reduce((acc, val) => {
            return val === 0 ? acc : acc + 1;
        }, 0)
    }
}).sort((a, b) => { return a.numValid - b.numValid });

console.log(fieldMapArray);

i=0;
while (i < fieldMapArray.length && fieldMapArray[i].numValid === 1) {
    console.log(`processing ${fieldMapArray[i].name}`);
    // find the index of the one
    let oneIndex = 0;
    while (fieldMapArray[i].map[oneIndex] !== 1) {
        oneIndex ++;
    }

    let j=i+1;
    while(j < fieldMapArray.length) {
        fieldMapArray[j].map[oneIndex] = 0;

        // recompute numValid;
        fieldMapArray[j].numValid = fieldMapArray[j].map.reduce((acc, val) => {
            return val === 0 ? acc : acc + 1;
        }, 0)
        j++;
    }

    i++;
}

console.log(fieldMapArray);

let fieldIndex = fieldMapArray.map(field => {
    let oneIndex = 0;
    while (field.map[oneIndex] !== 1) {
        oneIndex ++;
    }

    return {
        name: field.name,
        index: oneIndex
    }
}).sort((a, b) => { return a.index - b.index});

console.log(fieldIndex);
let departureFields = fieldIndex.filter(f => f.name.startsWith("departure"));
console.log(`departureFields`, departureFields);
console.log(myTicketValues);
let myDepartureValues = departureFields.map(df => {
    return myTicketValues[df.index];
})
console.log(myDepartureValues);
let answer = myDepartureValues.reduce((acc, val) => {
    return acc * val;
}, 1);
console.log(`answer ${answer}`);