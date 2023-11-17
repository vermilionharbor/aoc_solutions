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
const simulate = (sim) => {
    if (sim.elapsedTime >= simulationMaxTime) {
        // console.log(`finish ${sim.geode}`);
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
        // if (sim.clay > maxClay) {
        //     maxClay = sim.clay;
        //     console.log(`found new clay max ${maxClay}`);
        //     console.log(JSON.stringify(sim));
        // }
        return;
    }

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
            let maxObsidianRobots = maxAffordedByOre > maxAffordedByClay ? maxAffordedByClay : maxAffordedByOre;
            for (obsidian = 0; obsidian <= maxObsidianRobots; obsidian++) {
                let oreOnHandForGeode = oreOnHandForObsidian - obsidian*sim.obsidianRobotOreCost;
                let maxGeodeAffordedByOre = Math.floor(oreOnHandForGeode / sim.geodeRobotOreCost);
                let maxGeodeAffordedByObsidian = Math.floor(sim.obsidian / sim.geodeRobotObsidianCost );
                let maxGeodeRobots = maxGeodeAffordedByOre > maxGeodeAffordedByObsidian ? maxGeodeAffordedByObsidian : maxGeodeAffordedByOre;
                for (geode = 0; geode <= maxGeodeRobots; geode++) {
                    let nextState = {...sim};
                    // do the material production first
                    nextState.ore += nextState.oreProductionRate;
                    nextState.clay += nextState.clayProductionRate;
                    nextState.obsidian += nextState.obsidianProductionRate;
                    nextState.geode += nextState.geodeProductionRate;
                    nextState.elapsedTime ++;
                    if (nextState.elapsedTime === 20) {
                        console.log(`${nextState.ore} ${nextState.clay} ${nextState.obsidian} ${nextState.geode} ${ore} ${clay} ${obsidian} ${geode}`)
                    }

                    // consume resources
                    nextState.ore -= ore*nextState.oreRobotOreCost;
                    nextState.ore -= clay*nextState.clayRobotOreCost;
                    nextState.ore -= obsidian*nextState.obsidianRobotOreCost;
                    nextState.ore -= geode*nextState.geodeRobotOreCost;
                    nextState.clay -= obsidian*nextState.obsidianRobotClayCost;
                    nextState.obsidian -= geode*nextState.geodeRobotObsidianCost;

                    // increase the production rate for the next round
                    nextState.oreProductionRate += ore;
                    nextState.clayProductionRate += clay;
                    nextState.obsidianProductionRate += obsidian;
                    nextState.geodeProductionRate += geode;

                    simulate(nextState)
                }
            }
        }
    }


    // simulate(sim);
}

simulate(simulation2);