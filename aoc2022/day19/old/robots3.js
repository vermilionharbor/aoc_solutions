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
    elapsedTime: 0
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
    elapsedTime: 0
}
let maxGeodes = 0;
let maxObsidian = 0;
let maxClay = 0;
let maxOre = 0;

const indexToString = (oreP, clayP, obP, geoP, time) => {
    return `${oreP}_${clayP}_${obP}_${geoP}_${time}`;
}

const solutions = {}
const simulate = (sim) => {

    if (sim.elapsedTime >= simulationMaxTime) {
        const key = indexToString(sim.oreProductionRate, sim.clayProductionRate, sim.obsidianProductionRate, sim.geodeProductionRate, sim.elapsedTime);
        solutions[key] = sim.geode;
        // console.log(`here ${Object.keys(solutions).length}`);

        if (sim.geode > maxGeodes) {
            maxGeodes = sim.geode;
            console.log(`found new geode max ${maxGeodes}`);
            console.log(JSON.stringify(sim));
        }
        if (sim.obsidian > maxObsidian) {
            maxObsidian = sim.obsidian;
            console.log(`found new obsidian max ${maxObsidian}`);
            console.log(JSON.stringify(sim));
        }
        if (sim.geodeProductionRate > 1) {
            console.log(JSON.stringify(sim));
        }
        return sim.geode;
    }

    // // do the material production first
    // sim.ore += sim.oreProductionRate;
    // sim.clay += sim.clayProductionRate;
    // sim.obsidian += sim.obsidianProductionRate;
    // sim.geode += sim.geodeProductionRate;
    // sim.elapsedTime ++;

    // simulate out how many of each robot to build
    let maxOreRobots, maxClayRobots, maxObsidianRobots, maxGeodeRobots;
    let ore, clay, obsidian, geode;
    maxOreRobots = Math.floor(sim.ore / sim.oreRobotOreCost);
    for (ore=0; ore<=maxOreRobots; ore++) {
        let oreOnHand = sim.ore - ore*sim.oreRobotOreCost;
        maxClayRobots = Math.floor(oreOnHand / sim.clayRobotOreCost);
        for (clay = 0; clay<=maxClayRobots; clay++) {
            let oreOnHandForObsidian = oreOnHand - clay*sim.clayRobotOreCost;
            let maxAffordedByOre = Math.floor(oreOnHandForObsidian / sim.obsidianRobotOreCost);
            let maxAffordedByClay = Math.floor (sim.clay / sim.obsidianRobotClayCost);
            maxObsidianRobots = maxAffordedByOre > maxAffordedByClay ? maxAffordedByClay : maxAffordedByOre;
            // console.log(`${maxAffordedByOre} ${maxAffordedByClay} ${maxObsidianRobots} ${sim.elapsedTime}`)
            for (obsidian = 0; obsidian <= maxObsidianRobots; obsidian++) {
                let oreOnHandForGeode = oreOnHandForObsidian - obsidian*sim.obsidianRobotOreCost;
                let maxGeodeAffordedByOre = Math.floor(oreOnHandForGeode / sim.geodeRobotOreCost);
                let maxGeodeAffordedByObsidian = Math.floor(sim.obsidian / sim.geodeRobotObsidianCost );
                maxGeodeRobots = maxGeodeAffordedByOre > maxGeodeAffordedByObsidian ? maxGeodeAffordedByObsidian : maxGeodeAffordedByOre;
                for (geode = 0; geode <= maxGeodeRobots; geode++) {
                    let nextState = {...sim};

                    // do the material production first
                    nextState.ore += nextState.oreProductionRate;
                    nextState.clay += nextState.clayProductionRate;
                    nextState.obsidian += nextState.obsidianProductionRate;
                    nextState.geode += nextState.geodeProductionRate;
                    nextState.elapsedTime ++;

                    // consume resources
                    nextState.ore -= ore*nextState.oreRobotOreCost;
                    nextState.ore -= clay*nextState.clayRobotOreCost;
                    nextState.ore -= obsidian*nextState.obsidianRobotOreCost;
                    nextState.ore -= geode*nextState.geodeRobotOreCost;
                    nextState.clay -= obsidian*nextState.obsidianRobotClayCost;
                    nextState.obsidian -= geode*nextState.geodeRobotObsidianCost;

                    // increase the production rate for the next round
                    // if (obsidian > 0) {
                    //     console.log(`${maxOreRobots} ${maxClayRobots} ${maxObsidianRobots} ${maxGeodeRobots}`);
                    //     console.log(`made ${ore} ore ${clay} clay ${obsidian} obs ${geode} geo, ${sim.elapsedTime}  `)
                    // }
                    nextState.oreProductionRate += ore;
                    nextState.clayProductionRate += clay;
                    nextState.obsidianProductionRate += obsidian;
                    nextState.geodeProductionRate += geode;

                    const key = indexToString(nextState.oreProductionRate, nextState.clayProductionRate, nextState.obsidianProductionRate, nextState.geodeProductionRate, nextState.elapsedTime);
                    if (solutions[key] !== undefined) {
                        // console.log(`repeat ${key}`)
                        return solutions[key];
                    } else {
                        // console.log(`here2 ${nextState.elapsedTime}`)
                        simulate(nextState);
                        // console.log(Object.keys(solutions).length)
                    }
                }
            }
        }
        // console.log('done3');
    }
    // console.log('done2');

    // simulate(sim);
}

simulate(simulation2);