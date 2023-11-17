// Blueprint 1:
// Each ore robot costs 4 ore.
//     Each clay robot costs 2 ore.
//     Each obsidian robot costs 3 ore and 14 clay.
//     Each geode robot costs 2 ore and 7 obsidian.

const simulationMaxTime = 24;

const simulation = {
    oreProductionRate: 1,
    clayProductionRate: 0,
    obsidianProductionRate: 0,
    geodeProductionRate: 0,
    oreRobotOreCost: 4,
    clayRobotOreCost: 2,
    obsidianRobotOreCost: 3,
    obsidianRobotClayCost: 14,
    geodeRobotOreCost: 2,
    geodeRobotObsidianCost: 7,
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
    elapsedTime: 1,
    history: [],
}

// Blueprint 2:
// Each ore robot costs 2 ore.
//     Each clay robot costs 3 ore.
//     Each obsidian robot costs 3 ore and 8 clay.
//     Each geode robot costs 3 ore and 12 obsidian.
const simulation2 = {
    oreProductionRate: 1,
    clayProductionRate: 0,
    obsidianProductionRate: 0,
    geodeProductionRate: 0,
    oreRobotOreCost: 2,
    clayRobotOreCost: 3,
    obsidianRobotOreCost: 3,
    obsidianRobotClayCost: 8,
    geodeRobotOreCost: 3,
    geodeRobotObsidianCost: 12,
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
    elapsedTime: 1,
    history: [],
}
let maxGeodes = 0;
let maxObsidian = 0;

const indexToString = (oreP, clayP, obP, geoP, ore, clay, ob, geo, time) => {
    return `${oreP}_${clayP}_${obP}_${geoP}_${ore}_${clay}_${ob}_${geo}_${time}`;
}

const solutions = {}
let numReturns = 0;

const copySimulation = (sim) => {
    return {
        ...sim,
        history: [...sim.history]
    }
}
const prettyPrint = (sim) => {
    console.log(JSON.stringify(sim));
    sim.history.forEach(l => {
        console.log(l);
    });
}
const simulate = (sim) => {
    // const key = indexToString(sim.oreProductionRate, sim.clayProductionRate, sim.obsidianProductionRate, sim.geodeProductionRate,
    //     sim.ore, sim.clay, sim.obsidian, sim.geode, sim.elapsedTime);
    // if (solutions[key] !== undefined) {
    //     numReturns ++;
    //     if(numReturns % 100000 === 0) {
    //         console.log(`numReturns ${numReturns} ${Object.keys(solutions).length}`);
    //     }
    //     return;
    // }

    if (sim.elapsedTime > simulationMaxTime) {
        // console.log(JSON.stringify(sim));
        // solutions[key] = 1;
        if (sim.geode > maxGeodes) {
            maxGeodes = sim.geode;
            console.log(`found new geode max ${maxGeodes}`);
            // console.log(JSON.stringify(sim));
            prettyPrint(sim);
        }
        if (sim.obsidian > maxObsidian) {
            maxObsidian = sim.obsidian;
            // console.log(`found new obsidian max ${maxObsidian}`);
            // console.log(JSON.stringify(sim));
        }
        // if (sim.geodeProductionRate > 1) {
        //     console.log(JSON.stringify(sim));
        // }
        return sim.geode;
    }

    if ((sim.ore >= sim.geodeRobotOreCost) && (sim.obsidian >= sim.geodeRobotObsidianCost)) {
        const nextState = copySimulation(sim);
        nextState.ore -= nextState.geodeRobotOreCost;
        nextState.obsidian -= nextState.geodeRobotObsidianCost;

        nextState.history.push(`geode at time ${sim.elapsedTime}`)
        // do the material production
        nextState.ore += nextState.oreProductionRate;
        nextState.clay += nextState.clayProductionRate;
        nextState.obsidian += nextState.obsidianProductionRate;
        nextState.geode += nextState.geodeProductionRate;
        nextState.history.push(`o ${nextState.ore}, c ${nextState.clay}, ob ${nextState.obsidian}, g ${nextState.geode}, ${nextState.elapsedTime} s`);
        nextState.elapsedTime ++;

        nextState.geodeProductionRate++;
        simulate(nextState);
    }

    if ((sim.ore >= sim.obsidianRobotOreCost) && (sim.clay >= sim.obsidianRobotClayCost)) {
        const nextState = copySimulation(sim);
        nextState.ore -= nextState.obsidianRobotOreCost;
        nextState.clay -= nextState.obsidianRobotClayCost;

        nextState.history.push(`obsidian at time ${sim.elapsedTime}`)
        // do the material production
        nextState.ore += nextState.oreProductionRate;
        nextState.clay += nextState.clayProductionRate;
        nextState.obsidian += nextState.obsidianProductionRate;
        nextState.geode += nextState.geodeProductionRate;
        nextState.history.push(`o ${nextState.ore}, c ${nextState.clay}, ob ${nextState.obsidian}, g ${nextState.geode}, ${nextState.elapsedTime} s`);

        nextState.elapsedTime ++;
        nextState.obsidianProductionRate++;
        simulate(nextState);
    }

    if (sim.ore >= sim.clayRobotOreCost) {
        const nextState = copySimulation(sim);
        nextState.ore -= nextState.clayRobotOreCost;
        nextState.history.push(`clay at time ${sim.elapsedTime}`)
        // do the material production
        nextState.ore += nextState.oreProductionRate;
        nextState.clay += nextState.clayProductionRate;
        nextState.obsidian += nextState.obsidianProductionRate;
        nextState.geode += nextState.geodeProductionRate;
        nextState.history.push(`o ${nextState.ore}, c ${nextState.clay}, ob ${nextState.obsidian}, g ${nextState.geode}, ${nextState.elapsedTime} s`);
        nextState.elapsedTime ++;
        nextState.clayProductionRate++;
        simulate(nextState);
    }

    if (sim.ore >= sim.oreRobotOreCost) {
        const nextState = copySimulation(sim);
        nextState.ore -= nextState.oreRobotOreCost;

        nextState.history.push(`ore at time ${sim.elapsedTime}`)
        // do the material production
        nextState.ore += nextState.oreProductionRate;
        nextState.clay += nextState.clayProductionRate;
        nextState.obsidian += nextState.obsidianProductionRate;
        nextState.geode += nextState.geodeProductionRate;
        nextState.history.push(`o ${nextState.ore}, c ${nextState.clay}, ob ${nextState.obsidian}, g ${nextState.geode}, ${nextState.elapsedTime} s`);
        nextState.elapsedTime ++;
        nextState.oreProductionRate++;
        simulate(nextState);
    }

    const nextState = copySimulation(sim);
    // do the material production
    nextState.ore += nextState.oreProductionRate;
    nextState.clay += nextState.clayProductionRate;
    nextState.obsidian += nextState.obsidianProductionRate;
    nextState.geode += nextState.geodeProductionRate;
    nextState.history.push(`o ${nextState.ore}, c ${nextState.clay}, ob ${nextState.obsidian}, g ${nextState.geode}, ${nextState.elapsedTime} s`);
    nextState.elapsedTime ++;
    simulate(nextState);
}

simulate(simulation2);