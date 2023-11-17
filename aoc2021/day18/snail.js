const fs = require('fs');

const lines = fs.readFileSync('testinput.txt').toString().split('\n');

let id = 0;
const getUniqueId = () => {
    return id++;
}

const parseSnailEnhanced = (line) => {
    let i = 0;
    let stack = [];
    let current;
    let temp;
    let numBuffer = '';
    let snailMap = {};
    let depth = 0;
    while (i < line.length) {
        switch (line[i]) {
            case '[':
                depth++;
                current = {
                    isLeft: true,
                    key: getUniqueId(),
                    depth: depth,
                }
                snailMap[current.key] = current;
                stack.push(current);
                break;
            case ']':
                if (numBuffer !== '') {
                    temp = parseInt(numBuffer, 10);
    //              console.log(temp);
                    current.right = temp;
                    numBuffer = '';
                }
//              console.log(`pop`);
                depth--;
                temp = stack.pop();
                if (stack.length > 0) {
                    current = stack[stack.length-1];
                    if (current.isLeft) {
                        current.left = temp;
                    } else {
                        current.right = temp;
                    }
                }
                break;
            case ',':
                if (numBuffer !== '') {
                    temp = parseInt(numBuffer, 10);
    //                console.log(temp);
                    current.left = temp;
                    numBuffer = '';
                }
                current.isLeft = false;
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                numBuffer += line[i];
                break;
        }
        i++;
    }
    snailMap['top'] = current;
    return [current, snailMap];
}

const parseSnail = (line) => {
    const [snail, snailMap] = parseSnailEnhanced(line);
    return snail;
}

const prettyPrintHelper = (snail) => {
    let buffer = '[';
//    console.log(`helper ${JSON.stringify(snail)}`);
    if (typeof snail.left === 'number') {
        buffer += snail.left.toString();
    } else {
        buffer += prettyPrintHelper(snail.left);
    }
    buffer += ',';
    if (typeof snail.right === 'number') {
        buffer += snail.right.toString();
    } else {
        buffer += prettyPrintHelper(snail.right);
    }
    buffer += ']';
    return buffer;
}

const printDepths = (snail, depth) => {
    if (typeof snail.left === 'number') {
        console.log(`${snail.left}, ${depth}`);
    } else {
        printDepths(snail.left, depth+1);
    }
    if (typeof snail.right === 'number') {
        console.log(`${snail.right}, ${depth}`);
    } else {
        printDepths(snail.right, depth+1);
    }
}

const findExplosion = (snail, depth, index) => {
    let tempResult;
    if (typeof snail.left !== 'number') {
        tempResult = findExplosion(snail.left, depth+1, index);
        if (tempResult.explosion === true) {
            if (tempResult.depth === depth+1) {
                snail.left = 0;
            }
            return tempResult;
        }
        index = tempResult.index;
    } else {
        index++;
    }

    if ((depth > 4) && (typeof snail.left === 'number') && (typeof snail.right === 'number')) {
        return {
            explosion: true,
            left: snail.left,
            right: snail.right,
            index: index-1,
            depth: depth,
        }
    }

    if (typeof snail.right !== 'number') {
        tempResult = findExplosion(snail.right, depth+1, index);
        if (tempResult.explosion === true) {
            if (tempResult.depth === depth+1) {
                snail.right = 0;
            }
            return tempResult;
        }
        index = tempResult.index;
    } else {
        index++;
    }

    return {
        explosion: false,
        index: index,
    }
}

const patchExplosion = (snail, explosion, index, results) => {
    if (typeof snail.left === 'number') {
        if (index === explosion.leftIndex) {
            snail.left += explosion.left;
            results.leftKey = snail.key;
            results.leftKeyisLeft = true;
        } else if (index === explosion.rightIndex) {
            snail.left += explosion.right;
            results.rightKey = snail.key;
            results.rightKeyisLeft = true;
        }
        // console.log(`index ${index}`)
        index ++;
    } else {
        index = patchExplosion(snail.left, explosion, index, results);
    }
    if (typeof snail.right === 'number') {
        if (index === explosion.leftIndex) {
            snail.right += explosion.left;
            results.leftKey = snail.key;
            results.leftKeyisLeft = false;
        } else if (index === explosion.rightIndex) {
            snail.right += explosion.right;
            results.rightKey = snail.key;
            results.rightKeyisLeft = false;
        }
        // console.log(`index ${index}`)
        index ++;
    } else {
        index = patchExplosion(snail.right, explosion, index, results);
    }
    return index;
}

const handleExplosionEfficient = (snail, explosion, snailMap) => {
    const explosionResults = {};
    patchExplosion(snail, explosion, 0, explosionResults);
    // after patching the explosion is done
    const result = snailToString(snail);
    console.log(`efficient explosion: ${result}`)
//    if (explosionResults.leftKey !== undefined) {
//        // we added something leftward
//        // handle any splits
//        handleSplitEfficient(snailMap[explosionResults.leftKey], explosionResults.leftKeyisLeft, snailMap);
//    }
//    if (explosionResults.rightKey !== undefined) {
//        // we added something rightward
//        // handle any splits
//        handleSplitEfficient(snailMap[explosionResults.rightKey], explosionResults.rightKeyisLeft, snailMap);
//    }
}

const handleExplosion = (snail, snailMap) => {
    let didExplode = findExplosion(snail, 1, 0);
    if (didExplode.explosion === true) {
        didExplode.leftIndex = didExplode.index - 1;
        didExplode.rightIndex = didExplode.index + 1;
        console.log(`handle explosion ${JSON.stringify(didExplode)}`)
        handleExplosionEfficient(snail, didExplode, snailMap);
        return true;
    }
    return false;
}

const handleSplit = (snail) => {
    if (typeof snail.left !== 'number') {
        const leftResult = handleSplit(snail.left);
        if (leftResult === true) return leftResult;
    } else {
        if (snail.left > 9) {
            const leftVal = Math.floor(snail.left/2);
            const rightVal = Math.ceil(snail.left/2);
            snail.left = {
                left: leftVal,
                right: rightVal,
            }
            return true;
        }
    }
    if (typeof snail.right !== 'number') {
        const rightResult = handleSplit(snail.right);
        if (rightResult === true) return rightResult;
    } else {
        if (snail.right > 9) {
            const leftVal = Math.floor(snail.right/2);
            const rightVal = Math.ceil(snail.right/2);
            snail.right = {
                left: leftVal,
                right: rightVal,
            }
            return true;
        }
    }
    return false;
}

const handleSplitImproved = (snail, snailMap) => {
    if (typeof snail.left !== 'number') {
        const leftResult = handleSplitImproved(snail.left, snailMap);
        if (leftResult === true) return leftResult;
    } else {
        if (snail.left > 9) {
            const leftVal = Math.floor(snail.left/2);
            const rightVal = Math.ceil(snail.left/2);
            const tempSnail = {
                left: leftVal,
                right: rightVal,
                key: getUniqueId(),
                depth: snail.depth + 1,
            }
            console.log(`splitting L ${JSON.stringify(tempSnail)}`)
            snail.left = tempSnail;
            snailMap[tempSnail.key] = tempSnail;
            const snailString = snailToString(snailMap['top']);
            console.log(`split improved ${snailString}`)
//            if (tempSnail.depth > 4) {
//                // check for explosion
//                // set the parent to an impossible value
//                snail.left = -1;
//                const result = {}
//                findIndex(snailMap['top'], 0, result);
//                const explosionIndex = result.index;
//                const explosion = {
//                    explosion: true,
//                    left: leftVal,
//                    right: rightVal,
//                    index: explosionIndex,
//                    leftIndex: explosionIndex-1,
//                    rightIndex: explosionIndex+1,
//                }
//                console.log(`handling split to explosion ${JSON.stringify(explosion)} ${snail.depth} ${tempSnail.depth}`);
//                handleExplosionEfficient(snailMap['top'], explosion, snailMap);
//            }
            return true;
        }
    }
    if (typeof snail.right !== 'number') {
        const rightResult = handleSplitImproved(snail.right, snailMap);
        if (rightResult === true) return rightResult;
    } else {
        if (snail.right > 9) {
            const leftVal = Math.floor(snail.right/2);
            const rightVal = Math.ceil(snail.right/2);
            const tempSnail = {
                left: leftVal,
                right: rightVal,
                key: getUniqueId(),
                depth: snail.depth + 1,
            }
            console.log(`splitting R ${JSON.stringify(tempSnail)}`)
            snail.right = tempSnail;
            snailMap[tempSnail.key] = tempSnail;
            const snailString = snailToString(snailMap['top']);
            console.log(`split improved ${snailString}`)
//            if (tempSnail.depth > 4) {
//                // check for explosion
//                // set the parent to an impossible value
//                snail.right = -1;
//                const result = {}
//                findIndex(snailMap['top'], 0, result);
//                const explosionIndex = result.index;
//                const explosion = {
//                    explosion: true,
//                    left: leftVal,
//                    right: rightVal,
//                    index: explosionIndex,
//                    leftIndex: explosionIndex-1,
//                    rightIndex: explosionIndex+1,
//                }
//                console.log(`handling split to explosion ${JSON.stringify(explosion)} ${snail.depth} ${tempSnail.depth}`);
//                handleExplosionEfficient(snailMap['top'], explosion, snailMap);
//            }
            return true;
        }
    }
    return false;
}

const findIndex = (snail, index, result) => {
    if (typeof snail.left === 'number') {
        if (snail.left === -1) {
            // we found our special marker
            snail.left = 0;
            result.index = index;
        }
        index++;
    } else {
        index = findIndex(snail.left, index, result);
    }

    if (typeof snail.right === 'number') {
        if (snail.right === -1) {
            // found special marker
            snail.right = 0;
            result.index = index;
        }
        index ++;
    } else {
        index = findIndex(snail.right, index, result);
    }
    return index;
}

const handleSplitEfficient = (snail, isLeft, snailMap) => {
    // snail is a sub-snail for this function
    if (isLeft === true) {
        if (snail.left > 9) {
            const leftVal = Math.floor(snail.left/2);
            const rightVal = Math.ceil(snail.left/2);
            // creating a new snail
            const tempSnail = {
                left: leftVal,
                right: rightVal,
                key: getUniqueId(),
                depth: snail.depth + 1,
            }
            snail.left = tempSnail;
            snailMap[tempSnail.key] = tempSnail;
            const snailString = snailToString(snailMap['top']);
            console.log(`split efficient ${snailString}`)
            if (tempSnail.depth > 4) {
                // check for explosion
                // set the parent to an impossible value
                snail.left = -1;
                const result = {}
                findIndex(snailMap['top'], 0, result);
                const explosionIndex = result.index;
                const explosion = {
                    explosion: true,
                    left: leftVal,
                    right: rightVal,
                    index: explosionIndex,
                    leftIndex: explosionIndex-1,
                    rightIndex: explosionIndex+1,
                }
                console.log(`handling split to explosion ${JSON.stringify(explosion)} ${snail.depth} ${tempSnail.depth}`);
                handleExplosionEfficient(snailMap['top'], explosion, snailMap);
            }
        }
    } else {
        if (snail.right > 9) {
            const leftVal = Math.floor(snail.right/2);
            const rightVal = Math.ceil(snail.right/2);
            // creating a new snail
            const tempSnail = {
                left: leftVal,
                right: rightVal,
                key: getUniqueId(),
                depth: snail.depth + 1,
            }
            snail.right = tempSnail;
            snailMap[tempSnail.key] = tempSnail;
            const snailString = snailToString(snailMap['top']);
            console.log(`split efficient ${snailString}`)
            if (tempSnail.depth > 4) {
                // check for explosion
                // set the parent to an impossible value
                snail.right = -1;
                const result = {}
                findIndex(snailMap['top'], 0, result);
                const explosionIndex = result.index;
                const explosion = {
                    explosion: true,
                    left: leftVal,
                    right: rightVal,
                    index: explosionIndex,
                    leftIndex: explosionIndex-1,
                    rightIndex: explosionIndex+1,
                }
                console.log(`handling split to explosion ${JSON.stringify(explosion)} ${snail.depth} ${tempSnail.depth}`);
                handleExplosionEfficient(snailMap['top'], explosion, snailMap);
            }
        }
    }
}

const snailToString = prettyPrintHelper;

const prettyPrint = (snail) => {
    const temp = prettyPrintHelper(snail);
    console.log(temp);
}

const isLegal = (snail, depth) => {
    if ((depth >= 4) && ((typeof snail.left !== 'number') || (typeof snail.right !== 'number'))) {
        return false;
    }
    if (typeof snail.left === 'number') {
        if (snail.left > 9) {
            return false;
        }
    } else {
        const leftResult = isLegal(snail.left, depth+1);
        if (leftResult === false) {
            return false;
        }
    }
    if (typeof snail.right === 'number') {
        if (snail.right > 9) {
            return false;
        }
    } else {
        const rightResult = isLegal(snail.right, depth+1);
        if (rightResult === false) {
            return false;
        }
    }
    return true;
}

const isLegalSnail = (snail) => {
    return isLegal(snail, 1);
}

const reduce = (snail, snailMap, verbose=false) => {

    let foundExplosion;
    while (isLegalSnail(snail) === false) {
        do {
            // find explosion
            foundExplosion = handleExplosion(snail, snailMap);
            if (foundExplosion === true && verbose === true) {
                const state = snailToString(snail);
                console.log(`after explode: ${state}`);
            }
        } while (foundExplosion === true);
        let foundSplit;

        foundSplit = handleSplitImproved(snail, snailMap);
        if ((foundSplit === true) && (verbose === true)) {
            const state = snailToString(snail);
            console.log(`after split: ${state}`)
        }
    }

}

const add = (a, aMap, b, bMap) => {
    const sum = {
        left: a,
        right: b,
        key: getUniqueId(),
        depth: 1
    }
    const sumMap = {}
    sumMap[sum.key] = sum;

    for (const[key, val] of Object.entries(aMap)) {
        val.depth ++;
        sumMap[key] = val;
    }
    for (const [key, val] of Object.entries(bMap)) {
        val.depth ++;
        sumMap[key] = val;
    }

    sumMap['top'] = sum;
    const temp = snailToString(sum);
    console.log(`adding.. ${temp}`)
    reduce(sum, sumMap, true);
    return sum;
}

const snailToValue = (snail) => {
    const leftVal = (typeof snail.left === 'number') ? snail.left : snailToValue(snail.left);
    const rightVal = (typeof snail.right === 'number') ? snail.right : snailToValue(snail.right);
    return 3*leftVal + 2*rightVal;
}

lines.forEach(l => {
    console.log(l);
    const result = parseSnail(l);
    //    console.log(result);
    //    prettyPrint(result);
    //    printDepths(result, 1);
})

const testExplosion = () => {
    console.log('** testExplosion **');
    const theLines = fs.readFileSync('testexplosion.txt').toString().split('\n');
    const solutions = fs.readFileSync('testexplosion_solutions.txt').toString().split('\n');
    theLines.forEach((l, index) => {
        const [snail, snailMap] = parseSnailEnhanced(l);
        prettyPrint(snail);
        handleExplosion(snail, snailMap);
        console.log(`is legal ${isLegalSnail(snail)}`)
        const answer = snailToString(snail);
        console.log(answer);
        if (answer === solutions[index]) {
            console.log('pass')
        } else {
            console.log(`*** fail ***, expected ${solutions[index]}`);
        }
        console.log('');
    })
}

const testSplit = () => {
    console.log('test split');
    const val = '[[[[0,7],4],[15,[0,13]]],[1,1]]';
    const snail = parseSnail(val);
    prettyPrint(snail);
    console.log(`legal ${isLegalSnail(snail)}`);
    handleSplit(snail);
    prettyPrint(snail);
    handleSplit(snail);
    console.log(`legal ${isLegalSnail(snail)}`);
    const answer = snailToString(snail);
    console.log(answer);
    if (answer !== '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]') {
        console.log(`** fail **, expected [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]`)
    } else {
        console.log('pass');
    }

}

const testReduce = () => {
    console.log('testing Reduce');
    const data = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]';
    const [snail, snailMap] = parseSnailEnhanced(data);
    reduce(snail, snailMap, true);
    const answer = snailToString(snail);
    const solution = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
    if (answer === solution) {
        console.log('pass');
    } else {
        console.log(`** fail **, expected ${solution}`)
    }
}

const testAdd = () => {
    console.log('testing add')
    const [a, aMap] = parseSnailEnhanced('[[[[4,3],4],4],[7,[[8,4],9]]]');
    const [b, bMap] = parseSnailEnhanced('[1,1]');
    const snail = add(a, aMap, b, bMap);
    const answer = snailToString(snail);
    const solution = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]';
    console.log(answer);
    if (answer === solution) {
        console.log('pass');
    } else {
        console.log(`** fail **, expected ${solution}`);
    }
}

const testMagnitude = () => {
    console.log('testing magnitude')
    const tests = [
    { test: '[[1,2],[[3,4],5]]', solution: 143 },
    { test: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', solution: 1384},
    { test: '[[[[1,1],[2,2]],[3,3]],[4,4]]', solution: 445},
    { test: '[[[[3,0],[5,3]],[4,4]],[5,5]]', solution: 791},
    { test: '[[[[5,0],[7,4]],[5,5]],[6,6]]', solution: 1137},
    { test: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', solution: 3488},
    ];
    tests.forEach(t => {
        const snail = parseSnail(t.test);
        const answer = snailToValue(snail);
        console.log(`${snailToString(snail)} ${answer}, ${t.solution} ${answer===t.solution ? '**PASS**': '**FAIL**'}`);
    });
}

const doHomework = (filename) => {
    const lines = fs.readFileSync(filename).toString().split('\n');
    let [snail, snailMap] = parseSnailEnhanced(lines[0]);
    let i;
    console.log('*** homework ***');
    let snailString = snailToString(snail);
    console.log(`start ${snailString}`);
    for (i=1; i<lines.length; i++) {
        const [newSnail, newSnailMap] = parseSnailEnhanced(lines[i]);
        snailString = snailToString(newSnail);
        console.log(`adding.. ${snailString}`);
        snail = add(snail, snailMap, newSnail, newSnailMap);
        prettyPrint(snail);
    }
    console.log(`final snail ${snailToString(snail)}`);
    console.log(`final value ${snailToValue(snail)}`);
}

const doHomeworkPart2 = (filename) => {
    const lines = fs.readFileSync(filename).toString().split('\n');
    let i, j;
    console.log('*** homework part 2 ***');
    let maxSum = 0;
    for (i=0; i<lines.length; i++) {
        for (j=0; j<lines.length; j++) {
            if (i !== j) {
                const [a, aMap] = parseSnailEnhanced(lines[i]);
                const [b, bMap] = parseSnailEnhanced(lines[j]);
                const sum = add(a, aMap, b, bMap);
                const val = snailToValue(sum);
                console.log(`sum ${val}`)
                if (val > maxSum) {
                    maxSum = val;
                }
            }
        }
    }
    console.log(`max sum ${maxSum}`);
}

testExplosion();
testSplit();
testReduce();
testAdd();
testMagnitude();
//doHomework('homework1.txt');
//doHomework('homework2.txt');
// doHomework('input.txt');
doHomeworkPart2('input.txt');

