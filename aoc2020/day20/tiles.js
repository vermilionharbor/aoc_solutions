const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let tile;
let tileSet = [];
let dim = 10;
let nameToTile = {};

lines.forEach(l => {
    if (l.length > 0) {
        if (l.startsWith("Tile")) {
            let terms = l.split(" ");
            let tileNumber = parseInt(terms[1], 10);
            // console.log(tileNumber);
            tile = {
                name: tileNumber,
                photo: []
            };
        } else {
            tile.photo.push(l);
        }
    } else {
        console.log(tile);
        tileSet.push(tile);
        nameToTile[tile.name] = tile;
    }
});

const reverse = (t) => {
    let buf = '';
    for (let i=dim-1; i>-1; i--) {
        buf += t[i];
    }
    return buf;
}

const flipTile = (t) => {
    let temp = {
        name: t.name,
        photo: [...t.photo],
    }
    temp.photo.reverse();
    return temp;
}

const pushUnique = (arr, val) => {
    if (!arr.some(e => e === val)) {
        arr.push(val);
    }
}

const precomputeTile = (t) => {
    // we want comparisons to be easy for top to bottom, right to left of different tiles
    t.top = t.photo[0];
    t.bottom = t.photo[dim-1];
    let buf ='';
    for (let i=0; i<dim; i++) {
        buf += t.photo[i][dim-1]
    }
    t.right = buf;
    buf = '';
    for (let i=0; i<dim; i++) {
        buf += t.photo[i][0];
    }
    t.left = buf;
    t.orientation = [];
    for(let i=0; i<8; i++) {
        t.orientation[i] = getTileOrientation(t, i);
    }
}

const getTileOrientation = (t, i) => {
    // each tile has 8 orientations
    switch (i) {
        case 0:
            return {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
            }
            break;
        case 1:
            // rotate 90 cw
            return {
                top: reverse(t.left),
                right: t.top,
                bottom: reverse(t.right),
                left: t.bottom,
            }
            break;
        case 2:
            // rotate 180 cw
            return {
                top: reverse(t.bottom),
                right: reverse(t.left),
                bottom: reverse(t.top),
                left: reverse(t.right),
            }
            break;
        case 3:
            // rotate 270 cw
            return {
                top: t.right,
                right: reverse(t.bottom),
                bottom: t.left,
                left: reverse(t.top),
            }
            break;
        case 4:
            // flipped
            return {
                top: t.bottom,
                right: reverse(t.right),
                bottom: t.top,
                left: reverse (t.left),
            }
            break;
        case 5:
            // flipped rotate 90 cw
            return {
                top: t.left,
                right: t.bottom,
                bottom: t.right,
                left: t.top,
            }
            break;
        case 6:
            // flipped rotate 180 cw
            return {
                top: reverse(t.top),
                right: t.left,
                bottom: reverse(t.bottom),
                left: t.right,
            }
            break;
        case 7:
            // flipped rotate 270 cw
            return {
                top: reverse(t.right),
                right: reverse(t.top),
                bottom: reverse(t.left),
                left: reverse(t.bottom),
            }
            break;
    }
}

const getTileImage = (image, o) => {
    let dest = [...image];
    switch (o) {
        case 0:
            break;
        case 1:
            dest = rotateImage(dest, 90);
            break;
        case 2:
            dest = rotateImage(dest, 180);
            break;
        case 3:
            dest = rotateImage(dest, 270);
            break;
        case 4:
            dest = flipImage(dest);
            break;
        case 5:
            dest = flipImage(dest);
            dest = rotateImage(dest, 90);
            break;
        case 6:
            dest = flipImage(dest);
            dest = rotateImage(dest, 180);
            break;
        case 7:
            dest = flipImage(dest);
            dest = rotateImage(dest, 270);
    }
    return dest;
}

const rotateImage = (image, degrees) => {
    let r, c;
    let dim = image[0].length;
    let dest = [];
    if (degrees === 90) {
        for (r=0; r<dim; r++) {
            let buffer = '';
            for (c=0; c<dim; c++) {
                buffer += image[dim-1-c][r];
            }
            dest[r] = buffer;
        }
    } else if (degrees === 180) {
        for (r=0; r<dim; r++) {
            let buffer = '';
            for (c=0; c<dim; c++) {
                buffer += image[dim-1-r][dim-1-c];
            }
            dest[r] = buffer;
        }
    } else if (degrees === 270) {
        for (r=0; r<dim; r++) {
            let buffer = '';
            for (c=0; c<dim; c++) {
                buffer += image[c][dim-1-r]
            }
            dest[r] = buffer;
        }
    }
    return dest;
}

const flipImage = (image) => {
    let dest = [...image];
    dest.reverse();
    return dest;
}

const printImage = (image) => {
    image.forEach(l => {
        console.log(l);
    })
}

const hashTile = (tile, map, adj) => {
    // adjacency map
    if (adj[tile.name] === undefined) {
        adj[tile.name] = [];
    }

    // iterate through all orientations of the tile
    for (let i=0; i<8; i++) {
        let t = tile.orientation[i];
        // hash the top
        let top = t.top;
        if (map[top] === undefined) {
            map[top] = [];
        }
        map[top].forEach(entry => {
            pushUnique(adj[tile.name], entry);
            pushUnique(adj[entry], tile.name);
        })
        map[top].push(tile.name);

        // hash the bottom
        let bottom = t.bottom;
        if (map[bottom] === undefined) {
            map[bottom] = [];
        }
        map[bottom].forEach(entry => {
            pushUnique(adj[tile.name], entry);
            pushUnique(adj[entry], tile.name);
        })
        map[bottom].push(tile.name);

        // map the right edge
        let right = t.right;
        if (map[right] === undefined) {
            map[right] = [];
        }
        map[right].forEach(entry => {
            pushUnique(adj[tile.name], entry);
            pushUnique(adj[entry], tile.name);
        })
        map[right].push(tile.name);

        // map the left edge
        let left = t.left;
        if (map[left] === undefined) {
            map[left] = [];
        }
        map[left].forEach(entry => {
            pushUnique(adj[tile.name], entry);
            pushUnique(adj[entry], tile.name);
        })
        map[left].push(tile.name);
    }
}

let edgeMap = {}
let adjacencyMap = {};
tileSet.forEach(t => {
    precomputeTile(t);
    hashTile(t, edgeMap, adjacencyMap);
});

console.log(edgeMap);
console.log(tileSet.length);
console.log(adjacencyMap);
dim = Math.sqrt(tileSet.length);
console.log(`puzzle dimension ${dim}`);

const prettyPrint = (board) => {
    for (let r=0; r<dim; r++) {
        let buffer = '';
        for (let c=0; c<dim; c++) {
            buffer = buffer + board[r*dim+c].name.toString() + " ";
        }
        console.log(buffer);
    }
}

const checkFitment = (p, b, l) => {
    // console.log('checkFitment');
    // console.log('p', p);
    // console.log('b', b);
    // console.log('l', l);
    // if (l === 8) {
    //     console.log('pee', p);
    //     console.log('b[5]');
    //     console.log(b[5].edges);
    //     console.log('b[7]');
    //     console.log(b[7].edges);
    //     // console.log(b);
    // }
    if (l === 0) {
        return true;
    } else if (l % dim === 0) {
        // left edge, first piece in a row
        // only top has to match
        if (p.edges.top === b[l-dim].edges.bottom) {
            return true;
        }
    } else if (l-dim < 0) {
        // top row, just match left
        if (p.edges.left === b[l-1].edges.right) {
            return true;
        }
    } else {
        // top and left have to match
        // top matches previous row's bottom
        // left matches previous piece's right
        if ((p.edges.top === b[l-dim].edges.bottom) && (p.edges.left === b[l-1].edges.right)) {
            return true;
        }
    }
    // if (l === 8) {
    //     console.log('false**');
    //     console.log('b[5]', b[5].edges.bottom);
    //     console.log('b[7]', b[7].edges.right);
    //     console.log('mytop', p.edges.top);
    //     console.log('myleft', p.edges.left);
    // }
    return false;
}
let maxDepth = 0;
let solutions = [];
const searchSolution = (board, freePieces, level) => {
    let freeList;
    // find the set of pieces to search
    if (level === 0) {
        // first placement
        freeList = freePieces;
    } else {
        if (level % dim === 0) {
            // left edge, pick the one from above
            let adj = adjacencyMap[board[level-dim].name];
            freeList = [];
            adj.forEach(a => {
                if (freePieces.some(f => f === a)) {
                    freeList.push(a);
                }
            })
        } else {
            // take the one from before
            let adj = adjacencyMap[board[level-1].name];
            freeList = [];
            adj.forEach(a => {
                if (freePieces.some(f => f === a)) {
                    freeList.push(a);
                }
            })
        }
    }

    // if (level > maxDepth) {
    //     maxDepth = level;
    //     console.log("** max depth **", maxDepth);
    // }
    // for each piece & orientation
    // place the piece
    let boardStack = [...board];
    for (let p of freeList) {
        for (let o=0; o<8; o++) {
            let currentPiece = {
                name: p,
                edges: nameToTile[p].orientation[o],
                orientation: o
            };
            // if ((level === 0) && (p === 2539)) {
            //     console.log('testing 2539');
            // }
            // if ((level === 0) && (p === 1433)) {
            //     console.log('testing 1433');
            // }
            // if ((level === 0) && (p === 3613)) {
            //     console.log('testing 3613');
            // }
            if (checkFitment(currentPiece, boardStack, level) === true) {
                boardStack[level] = currentPiece;
                // if it is the last piece
                //  ** found solution
                // else
                // searchSolution(board, level + 1)
                // console.log(level);
                if (level === tileSet.length-1) {
                    console.log("** possible solution **", level);
                    prettyPrint(boardStack);
                    boardStack.forEach(tile => {
                        console.log(tile.name, tile.orientation);
                    })
                    solutions.push([...boardStack]);
                    console.log(boardStack[0].name*boardStack[dim-1].name*boardStack[dim*(dim-1)].name*boardStack[dim*dim-1].name);
                } else {
                    let freeStack = freePieces.filter(f => f !== p);
                    searchSolution(boardStack, freeStack, level + 1);
                }
            }
        }
    }
}

let freeList = tileSet.map(t => t.name);
// console.log(freeList);
let board = [];
searchSolution(board, freeList, 0);
// console.log(nameToTile[3079]);
console.log('done');

// solutions.forEach(s => {
//     console.log("solution");
//     s.forEach(entry => {
//         console.log(`${entry.name} ${entry.orientation}`);
//     });
// })

// printImage(tileSet[0].photo);
// console.log("");
// console.log("rotate 90");
// const rot90 = rotateImage(tileSet[0].photo, 90);
// printImage(rot90);
// console.log("");
// console.log("rotate 180");
// const rot180 = rotateImage(tileSet[0].photo, 180);
// printImage(rot180);
// console.log("");
// console.log("rotate 270");
// const rot270 = rotateImage(tileSet[0].photo, 270);
// printImage(rot270);

let theSolution = solutions[0];
theSolution.forEach(tile => {
    console.log(tile.name, tile.orientation);
});
theSolution = theSolution.map(t => {
    let tile = nameToTile[t.name];
    let image = getTileImage(tile.photo, t.orientation);
    return image;
})

// theSolution.forEach(t => {
//     printImage(t);
// })

const stitchImages = (solution) => {
    let dest = [];
    let tileDim = solution[0].length;
    let totalDestRows = tileDim * dim;
    for (let destRow=0; destRow<totalDestRows; destRow++) {
        dest.push('');
    }

    for (let tileRow=0; tileRow < dim; tileRow ++) {
        for (let tileOffset=0; tileOffset<tileDim; tileOffset++) {
            for (let tileCol=0; tileCol<dim; tileCol++) {
                dest[tileRow*tileDim+tileOffset] += solution[tileRow*dim+tileCol][tileOffset];
            }
        }
    }

    return dest;
}

const stitchedSolution = stitchImages(theSolution);
printImage(stitchedSolution);

const stripImageBorder = (image) => {
    const numLines = image.length;
    const imageWidth = image[0].length;
    let dest = [];
    for (let row=1; row<numLines-1; row++) {
        dest.push(image[row].slice(1, imageWidth-1));
    }
    return dest;
}

const borderlessTiles = theSolution.map(t => {
    return stripImageBorder(t);
});

const borderlessImage = stitchImages(borderlessTiles);
console.log("");
printImage(borderlessImage);

let seaMonster = fs.readFileSync("seamonster.txt").toString().split("\n");
const seaMonsterWidth = 20;
const seaMonsterHeight = 3;
seaMonster = seaMonster.map(l => {
    let lineLen = l.length;
    let padSpaces = seaMonsterWidth-l.length;
    for (let j=0; j<padSpaces; j++) {
        l += ' ';
    }
    return l;
})

let seaMonsterCoords = [];
let seaMonsterMask = "";

seaMonster.forEach((l, row) => {
    // console.log(`${l} ${l.length}`);
    for (let j=0; j<l.length; j++) {
        if (l[j] === "#") {
            seaMonsterCoords.push(row*l.length+j);
            seaMonsterMask += "#";
        }
    }
});

console.log(seaMonsterCoords);

const blit = (image, x, y, width, height) => {
    let dest = [];
    for (let row = y; row < y+height; row++) {
        dest.push(image[row].slice(x, x+width));
    }
    return dest;
}

let blitTest = blit(borderlessImage, 4, 0, 20, 3);
// printImage(blitTest);

const isSeaMonster = (image, coords) => {
    let width = image[0].length;
    let height = image.length;
    let buffer = "";
    let linearImage = "";
    image.forEach(l => {
        linearImage += l;
    })
    coords.forEach(loc => {
        buffer += linearImage[loc];
    })
    // console.log("buffer", buffer);
    return buffer === seaMonsterMask;
}

// console.log(isSeaMonster(blitTest, seaMonsterCoords));
const countSeaMonsters = (image) => {
    let xdelta = image[0].length - seaMonsterWidth;
    let ydelta = image.length - seaMonsterHeight;
    let seaMonsterCount = 0;
    for (let r=0; r<ydelta; r++) {
        for (let c=0; c<xdelta; c++) {
            let subImage = blit(image, c, r, seaMonsterWidth, seaMonsterHeight);
            if (isSeaMonster(subImage, seaMonsterCoords)) {
                seaMonsterCount++;
            }
        }
    }
    return seaMonsterCount;
}

console.log(countSeaMonsters(borderlessImage));

const countWaves = (image) => {
    let numWaves = 0;
    image.forEach(l => {
        for (let c=0; c<l.length; c++) {
            if (l[c] === "#") {
                numWaves++;
            }
        }
    })
    return numWaves;
}

const numWaves = countWaves(borderlessImage);
console.log(`numWaves ${numWaves}`);

console.log("testing orientations");
for (let o=0; o<8; o++) {
    let rotatedImage = getTileImage(borderlessImage, o);
    let seaMonsterCount = countSeaMonsters(rotatedImage);
    console.log(`${o}: ${seaMonsterCount} ${numWaves - seaMonsterCount * seaMonsterCoords.length}`);
}









