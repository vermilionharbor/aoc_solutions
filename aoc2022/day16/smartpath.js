const fs = require('fs');
console.log(`reading ${process.argv[2]}`);
const lines = fs.readFileSync(process.argv[2]).toString().split('\n');

const valves = {};
const valveStates = {};
const TotalSimulationTime = 30;
let maxFlow = 0;
let usefulValves = [];

lines.forEach(l => {
    const statements = l.split("; ");
    const valveTerms = statements[0].split(" ");
    const valveName = valveTerms[1];
    const valveRate =  parseInt(valveTerms[4].slice(5), 10);
    const childTerms = statements[1].slice(22).trim().split(", ");

    console.log(`valve ${valveName} rate ${valveRate}, children ${JSON.stringify(childTerms)}`);
    valves[valveName] = {
        rate: valveRate,
        next: childTerms,
    }
    if (valveRate > 0) {
        usefulValves.push(valveName);
    }

    valveStates[valveName] = 0;
});

usefulValves.forEach(v => {
    console.log(`${v}: ${valves[v].rate}`);
});

const findShortestPath = (a, b, maxDepth = 30) => {

    let shortestPath;
    const searchPath = (curValve, target, visited, depth) => {
        if (depth > maxDepth) {
            return;
        }
        depth = depth + 1;
        if (curValve.next.indexOf(target) !== -1) {
            if ((shortestPath === undefined) || (depth < shortestPath)) {
                // console.log(`found path of length ${depth}`);
                shortestPath = depth;
            }
        }
        curValve.next.forEach(path => {
            if (visited[path] === 0) {
                visited[path] = 1;
                searchPath(valves[path], target, visited, depth);
                visited[path] = 0;
            }
        });
    }

    let cur = valves[a];
    const visited = {...valveStates};
    searchPath(cur, b, visited, 0);
    // console.log(`shortestPath ${shortestPath}`);
    return shortestPath;
}


// make a map which shows the path lengths from AA to each scoring valve
const aaMap = {};
usefulValves.forEach(v => {
    console.log(`finding path from AA to ${v}`);
    aaMap[v] = findShortestPath('AA', v, 30) + 1;
});

// console.log(JSON.stringify(aaMap));

// find the shortest path from each scoring valve to every other scoring valve
const topMap = {};
topMap['AA'] = aaMap;
usefulValves.forEach(origin => {
    console.log(`** finding paths from origin ${origin} `);
    let destMap = {}
    usefulValves.forEach(destination => {
        if (destination !== origin) {
            let shortest = findShortestPath(origin, destination, 30);
            console.log(`shortest to ${destination}: ${shortest}`);
            destMap[destination] = shortest + 1;
        }
    });
    topMap[origin] = destMap;
});

console.log(JSON.stringify(topMap));

const simulation = {
    elapsedTime: 0,
    flow: 0,
    totalFlow: 0,
    location: 'AA',
    cooldown: 0,
    visitedMap: {},
    actions: []
}

const copySimulation = (simulation) => {
    return {
        ...simulation,
        visitedMap: {...simulation.visitedMap},
        actions: [...simulation.actions]
    }
}

const simulate = (simulation) => {
    if (simulation.elapsedTime >= TotalSimulationTime) {
        if (simulation.totalFlow > maxFlow) {
            maxFlow = simulation.totalFlow;
            console.log(`found new max ${maxFlow}`);
            console.log(simulation.actions);
            console.log(JSON.stringify(simulation));
        }
        return;
    }

    // simulate this second
    if (simulation.location !== 'AA') {
        simulation.totalFlow += simulation.flow;
        simulation.elapsedTime++;
        simulation.actions.push(`${simulation.elapsedTime}s ${simulation.totalFlow}`)
        if (simulation.cooldown > 0) {
            simulation.cooldown--;
        }
    }
    if (simulation.cooldown === 0) {
        // arrived and finished opening valve
        if (simulation.visitedMap[simulation.location] !== 1) {
            simulation.visitedMap[simulation.location] = 1;
            simulation.flow += valves[simulation.location].rate;
        }
        // pick a different valve to go to
        const candidateMap = topMap[simulation.location];
        const candidates = Object.keys(candidateMap);
        let branchesVisited = 0;
        candidates.forEach(destination => {
            const nextState = copySimulation(simulation);
            if (nextState.visitedMap[destination] !== 1) {
                // nextState.visitedMap[destination] = 1;
                nextState.location = destination;
                nextState.cooldown = candidateMap[destination];
                branchesVisited ++;
                nextState.actions.push(destination);
                simulate(nextState);
            }
        });
        if (branchesVisited === 0) {
            // keep driving the simulation in case there's no valid paths left
            simulate(simulation);
        }
    } else {
        simulate(simulation);
    }
}

simulate(simulation);

