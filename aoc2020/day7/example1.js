const fs = require('fs');

const infile = fs.readFileSync("input2.txt").toString();


const standardizeBag = (bag => {
    let result = bag.trim();
    if (result.endsWith('.')) {
        result = result.slice(0, result.length-1);
    }
    if (result.endsWith('s')) {
        result = result.slice(0, result.length-1);
    }
    return result;
})

const stripNumber = bag => {
    let result = bag;
    const firstSpace = result.indexOf(' ');
    result = result.slice(firstSpace+1, result.length);
    return result;
}

const splitNumber = bag => {
    let terms = bag.split(' ');
    let quantity = terms[0]*1;
    return [quantity, stripNumber(bag)];
}

const lines = infile.split('\n');
let map = {};
let map2 = {};

lines.forEach(l => {
    // console.log(`*${l}`);
    const entities = l.split(' contain ');
    if (entities.length === 2) {
        const keyBag = standardizeBag(entities[0]);
        if (map[keyBag] === undefined) {
            map[keyBag] = {
                entry: [],
                visited: false
            }
        }
        console.log(`${keyBag} holds:`)
        map2[keyBag] = [];
        const object = entities[1];
        if (object === 'no other bags.') {
            console.log('none');
        } else {
            const objectTerms = object.split(',');
            objectTerms.forEach(ot => {
                let [quantity, containedBag] = splitNumber(standardizeBag(ot));
                console.log(`{quantity} ${containedBag}`);

                if (map[containedBag] === undefined) {
                    map[containedBag] = {
                        entry: [],
                        visited: false
                    };
                }
                map[containedBag].entry.push(keyBag);

                map2[keyBag].push({
                    bag: containedBag,
                    quantity: quantity
                });
            })
        }
    }
})

console.log('** map **');
console.log(map);
console.log('** map2 **');
console.log(map2);

const countContainingBags = (bagName, map) => {
    // console.log('visiting', bagName);
    if (map[bagName].visited === true) {
        return 0;
    }
    map[bagName].visited = true;
    let result = 1;
    console.log('counting', bagName);
    // if (map[bagName].entry.length === 0) {
    //     console.log('leaf', bagName);
    // }
    map[bagName].entry.forEach(b => {
        result += countContainingBags(b, map);
    })
    return result;
}

const topLevelContainingBags = (bagName, map) => {
    for (const[key, val] of Object.entries(map)) {
        val.visited = false;
        console.log(`key ${key} val ${JSON.stringify(val)}`);
    }

    return countContainingBags(bagName, map) - 1;
}

const countInteriorBags = (bagName, map) => {
    // count itself
    let result = 1;

    map[bagName].forEach(b => {
        result += b.quantity * countInteriorBags(b.bag, map);
    })

    return result;
}

const answer = topLevelContainingBags('shiny gold bag', map);
console.log(`answer ${answer}`);

const answer2 = countInteriorBags('shiny gold bag', map2) -1;
console.log(`gold contains ${answer2} bags`);
