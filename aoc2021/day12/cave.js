const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

const cave = {}

lines.forEach(l => {
    const terms = l.split('-');
    // console.log(`${terms[0]} ${terms[1]}`)

    if (cave[terms[0]] === undefined) {
        cave[terms[0]] = [terms[1]];
    } else {
        cave[terms[0]].push(terms[1]);
    }
    if (cave[terms[1]] === undefined) {
        cave[terms[1]] = [terms[0]];
    } else {
        cave[terms[1]].push(terms[0]);
    }
});

console.log(cave);

const searchCave = (cave, visited, path, solutions, smallVisited) => {
    const current = path[path.length-1];

    if (current === 'end') {
        console.log(`${path}`);
        solutions.numPaths ++;
        return;
    }

    let i;
    for (i=0; i<cave[current].length; i++) {
        const candidate = cave[current][i];
        const isSmall = (candidate.toLowerCase() === candidate) && (candidate !== 'start')
        if ((visited[candidate] === undefined) || (isSmall && (smallVisited === false))) {
            const nextPath = [...path]
            nextPath.push(candidate);
            const nextVisited = {
                ...visited
            }
            let nextSmallVisited = smallVisited;
            if (isSmall) {
                // console.log(`adding ${candidate}`)
                if (nextVisited[candidate] !== undefined) {
                    nextSmallVisited = true;
                }
                nextVisited[candidate] = 1;
            }
//            console.log(`nextvisited ${JSON.stringify(nextVisited)}`);
            searchCave(cave, nextVisited, nextPath, solutions, nextSmallVisited);
        }
    }
}

console.log("");
console.log('** solutions **');
const solutions = {numPaths: 0};
searchCave(cave, {'start': 1}, ['start'], solutions, false)
console.log(`total paths ${solutions.numPaths}`);