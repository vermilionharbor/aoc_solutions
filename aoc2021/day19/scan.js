const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let scanners = []
let scanner = {};
lines.forEach(l => {
    if (l.startsWith('---')) {
        // new scanner
        scanner = {
            name: l,
            points: [],
        };
        scanners.push(scanner);
    } else if (l.length > 0) {
        const terms = l.split(',');
        let point = {
            x: parseInt(terms[0], 10),
            y: parseInt(terms[1], 10),
            z: parseInt(terms[2], 10),
        }
        scanner.points.push(point);
    }
});
let numScanners = scanners.length;

const getOrientation = (point, orientation) => {
    let newPoint;
    let x = point.x;
    let y = point.y;
    let z = point.z;

    switch (orientation) {
        case 0:
            newPoint = {
                x: x,
                y: y,
                z: z,
            }
            break;
        case 1:
            newPoint = {
                x: x,
                y: -z,
                z: y,
            }
            break;
        case 2:
            newPoint = {
                x: x,
                y: -y,
                z: -z,
            }
            break;
        case 3:
            newPoint = {
                x: x,
                y: z,
                z: -y,
            }
            break;
        case 4:
            newPoint = {
                x: y,
                y: -x,
                z: z,
            }
            break;
        case 5:
            newPoint = {
                x: y,
                y: -z,
                z: -x,
            }
            break;
        case 6:
            newPoint = {
                x: y,
                y: x,
                z: -z,
            }
            break;
        case 7:
            newPoint = {
                x: y,
                y: z,
                z: x,
            }
            break;
        case 8:
            newPoint = {
                x: -x,
                y: -y,
                z: z,
            }
            break;
        case 9:
            newPoint = {
                x: -x,
                y: -z,
                z: -y,
            }
            break;
        case 10:
            newPoint = {
                x: -x,
                y: y,
                z: -z,
            }
            break;
        case 11:
            newPoint = {
                x: -x,
                y: z,
                z: y
            }
            break;
        case 12:
            newPoint = {
                x: -y,
                y: x,
                z: z,
            }
            break;
        case 13:
            newPoint = {
                x: -y,
                y: z,
                z: -x,
            }
            break;
        case 14:
            newPoint = {
                x: -y,
                y: -x,
                z: -z,
            }
            break;
        case 15:
            newPoint = {
                x: -y,
                y: -z,
                z: x,
            }
            break;
        case 16:
            newPoint = {
                x: z,
                y: -x,
                z: -y,
            }
            break;
        case 17:
            newPoint = {
                x: z,
                y: -y,
                z: x,
            }
            break;
        case 18:
            newPoint = {
                x: z,
                y: x,
                z: y,
            }
            break;
        case 19:
            newPoint = {
                x: z,
                y: y,
                z: -x,
            }
            break;
        case 20:
            newPoint = {
                x: -z,
                y: x,
                z: -y,
            }
            break;
        case 21:
            newPoint = {
                x: -z,
                y: y,
                z: x,
            }
            break;
        case 22:
            newPoint = {
                x: -z,
                y: -x,
                z: y,
            }
            break;
        case 23:
            newPoint = {
                x: -z,
                y: -y,
                z: -x,
            }
    }
    return newPoint;
}

const indexToString = (x, y, z) => {
    return `${x}_${y}_${z}`
}

const countOverlap = (map, points) => {
    let overlaps = 0;
    points.forEach(p => {
        const key = indexToString(p.x, p.y, p.z);
        if (map[key] !== undefined) {
            overlaps ++;
        }
    });
    return overlaps;
}

const testAlgo = (aPoints, scannerB) => {
    // insert all of scanner A's points into our world map
    const world = {}
    aPoints.forEach(p => {
        const key = indexToString(p.x, p.y, p.z);
        world[key] = {...p};
    });
    // console.log(world);
    // test scanner 0, test countOverlap

    // assume point 0 in scanner 1 matches point 0 in scanner 1
    // we need to create a set of points whose coords are scan0pt0 + scan1ptX - scan1pt0
    // and test them against the worldmap to count the overlaps


    let i, j, o;
    o = 0;
    let bestFitMatches = -1;
    let bestFitOrientation = -1;
    let bestFitVector = {x: 0, y:0, z:0};
    // iterate through all orientations
    for (o=0; o<24; o++) {
        let scanPoints = scanners[scannerB].points.map(p => {
            return getOrientation(p, o);
        })
        // if ((scanPoints.x === -618) && (scanPoints.y === -824) && (scanPoints.z === -621)) {
        //     console.log(`orientation, ${o} matched`);
        // }
        // console.log(`getting orientation ${o}`);
        // console.log(scanPoints);


        // iterate through all points in scanner 0
        for (j = 0; j < aPoints.length; j++) {
            const basePoint = aPoints[j];

            let targetIndex = 0;
            // iterate through all points in searched scanner
            for (targetIndex = 0; targetIndex < scanPoints.length; targetIndex++) {
                let transformedPoints = [];
                let numOverlaps = 1;
                for (i = 0; i < scanPoints.length; i++) {
                    // console.log('here');
                    if (i !== targetIndex) {
                        let transformedPoint = {
                            x: basePoint.x + scanPoints[i].x - scanPoints[targetIndex].x,
                            y: basePoint.y + scanPoints[i].y - scanPoints[targetIndex].y,
                            z: basePoint.z + scanPoints[i].z - scanPoints[targetIndex].z,
                        };
                        transformedPoints.push(transformedPoint)
                        // console.log(transformedPoint);
                        // if (transformedPoint.x === -618) {
                        //     console.log(transformedPoint);
                        // }
                    }
                }
                numOverlaps += countOverlap(world, transformedPoints);
                if (numOverlaps > 1) {
                    // console.log(`${numOverlaps} for basepoint ${j} of scanner0 => scanner1 point${targetIndex} orientation ${o}`);
                    let scannerVector = {
                        x: basePoint.x - scanPoints[targetIndex].x,
                        y: basePoint.y - scanPoints[targetIndex].y,
                        z: basePoint.z - scanPoints[targetIndex].z,
                    }
                    // console.log(`B is located at ${JSON.stringify(scannerVector)}`);
                    if (numOverlaps > bestFitMatches) {
                        bestFitMatches = numOverlaps;
                        bestFitOrientation = o;
                        bestFitVector = scannerVector;
                    }
                }
            }
        }
    }

    // console.log(`bestMatches ${bestFitMatches} at orientation ${bestFitOrientation}`)
    return [bestFitMatches, bestFitOrientation, bestFitVector];
}

const applyTransform = (points, orientation, vector) => {
    let newPoints = points.map(p => {
        return getOrientation(p, orientation);
    }).map(p => {
        return {
            x: p.x + vector.x,
            y: p.y + vector.y,
            z: p.z + vector.z
        }
    });
    return newPoints;
}

// console.log(JSON.stringify(scanners));
// testAlgo(scanners[1].points, 3);
let i, j;
let matchedScannerMap = {};
matchedScannerMap[0] = {
    base: 0,
    orientation: 0,
    vector: {x:0, y:0, z:0}
};

const insertWorld = (world, points) => {
    points.forEach(p => {
        const key = indexToString(p.x, p.y, p.z);
        world[key] = {...p}
    });
}

const testOrientations = () => {
    let point = {
        x: 2,
        y: 3,
        z: 1,
    }

    let o;
    const myMap = {};
    for (o=0; o<24; o++) {
        let t = getOrientation(point, o);
        const key = indexToString(t.x, t.y, t.z);
        if (myMap[key] !== undefined) {
            console.log(`orientation ${o} repeated ${JSON.stringify(myMap[key])}`);
        }
        myMap[key] = {...t, orientation: o};
    }
    console.log(`testing got ${Object.keys(myMap).length}`);
}

const indexTo2DKey = (i, j) => {
    return `${i}_${j}`;
}

for (i=0; i<scanners.length; i++) {
    for (j=i+1; j<scanners.length; j++) {
        console.log(`comparing ${i} to ${j}`);
        let [numMatches, orientation, vector] = testAlgo(scanners[i].points, j);
        if (numMatches >= 12) {
            console.log(`${i} matches ${j} in ${numMatches} locations`);
            let key = indexTo2DKey(i, j);
            matchedScannerMap[key] = {
                dest: i,
                source: j,
                orientation: orientation,
                vector: vector,
            };

            // gotta reverse it
            key = indexTo2DKey(j, i);
            let [dummy, revOrientation, revVector] = testAlgo(scanners[j].points, i);
            matchedScannerMap[key] = {
                dest: j,
                source: i,
                orientation: revOrientation,
                vector: revVector,
            };
        }
    }
}

console.log(matchedScannerMap);
// console.log(`${Object.keys(world).length} points`);
// testOrientations();

const findAllPoints = (scanMap, visited, reached, zone) => {
    console.log(`findAllSets ${zone}`);
    let i;
    const numScanners = scanners.length;
    const allPoints = [];

    for (i=1; i<numScanners; i++) {
        if (i !== zone) {
            const key = indexTo2DKey(zone, i);
            if ((scanMap[key] !== undefined) && (visited[i] === undefined)) {
                const transform = scanMap[key];
                visited[i] = 1;
                reached[i] = 1;
                let subPoints = findAllPoints(scanMap, visited, reached, i);
                subPoints = applyTransform(subPoints, transform.orientation, transform.vector);
                allPoints.push(...subPoints);
            }
        } else {
            allPoints.push(...scanners[zone].points);
        }
    }
    return allPoints;
}
const findPoints = (scanMap) => {
    const world = {}
    insertWorld(world, scanners[0].points);
    console.log(world);
    console.log(`${Object.keys(world).length} points`);

    const worldMap = {}
    const reached = {}

    const subPoints = findAllPoints( scanMap, worldMap, reached,0 );
    // console.log(subPoints);
    insertWorld(world, subPoints);
    console.log(reached);
    console.log(`${Object.keys(world).length} points`);
}

const findScanners = (scanMap, visited, zone) => {
    // console.log(`findAllSets ${zone}`);
    let i;
    const numScanners = scanners.length;
    const allPoints = [];

    for (i=1; i<numScanners; i++) {
        if (i !== zone) {
            const key = indexTo2DKey(zone, i);
            if ((scanMap[key] !== undefined) && (visited[i] === undefined)) {
                const transform = scanMap[key];
                visited[i] = 1;
                let subPoints = findScanners(scanMap, visited, i);
                console.log(`subPoints b4 transform ${JSON.stringify(subPoints)}`);
                subPoints = applyTransform(subPoints, transform.orientation, transform.vector);
                console.log(`subPoints  after transform ${JSON.stringify(subPoints)}`);
                allPoints.push(...subPoints);
            }
        } else {
            allPoints.push( {x: 0, y: 0, z: 0} );
        }
    }
    console.log(`allPoints ${JSON.stringify(allPoints)}`)
    return allPoints;
}

const manhattan = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

const findAllScanners = (scanMap) => {
    const world = {};
    insertWorld(world,[{x: 0, y: 0, z: 0}]);

    const worldMap = {}

    const subPoints = findScanners( scanMap, worldMap,0 );
    // console.log(subPoints);
    insertWorld(world, subPoints);
    console.log(`${Object.keys(world).length} scanners`);

    const cameras = [];
    for (const [key, val] of Object.entries(world)) {
        cameras.push(val);
    }

    let maxDistance = 0;
    const numCameras = cameras.length;
    let i, j;
    for (i=0; i<numCameras; i++) {
        for (j=i; j<numCameras; j++) {
            const distance = manhattan(cameras[i], cameras[j]);
            if (distance > maxDistance) {
                maxDistance = distance;
            }
        }
    }
    console.log(`max manhattan distance ${maxDistance}`);
}

findPoints(matchedScannerMap);
console.log('finding scanners');
findAllScanners(matchedScannerMap);