const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

let stack = [];
let folderStack = [];
let smallFolders = [];
let allFolders = [];

lines.forEach(l => {
    if (l.length > 0) {
        console.log(l);
        const terms = l.split(' ');
        switch (terms[0]) {
            case '$':
                // command
                if (terms[1] === 'cd') {
                    if (terms[2] == '..') {
                        // went up
                        const folderSize = stack.pop();
                        const folderName = folderStack.pop();
                        console.log(`finished folder of size ${folderSize} ${folderName}`);
                        const theFolder = {
                            folder: folderName,
                            size: folderSize
                        }
                        if (folderSize <= 100000) {
                            smallFolders.push(theFolder)
                        }
                        allFolders.push(theFolder);
                        stack[stack.length-1] += folderSize;
                    } else {
                        // went down
                        stack.push(0);
                        folderStack.push(terms[2]);
                    }
                } else if (terms[1] === 'ls') {

                } else {
                    console.log('shouldn not get here');
                }
                break;
            case 'dir':
                // directory
                break;
            default:
                // file
                const size = parseInt(terms[0], 10);
                const index = stack.length-1;
                stack[index] += size;
                break;
        }
    }
});

while (stack.length > 0) {
    // went up
    const folderSize = stack.pop();
    const folderName = folderStack.pop();
    console.log(`finished folder of size ${folderSize} ${folderName}`);
    const theFolder = {
        folder: folderName,
        size: folderSize
    }
    if (folderSize <= 100000) {
        smallFolders.push(theFolder)
    }
    allFolders.push(theFolder);
    stack[stack.length-1] += folderSize;
}

// console.log(smallFolders);
console.log(smallFolders.length);
const sumSize = smallFolders.reduce((acc, x) => {
    console.log(JSON.stringify(x));
    return acc + x.size;
}, 0);
console.log(`sum ${sumSize}`);

const diskSize = 70000000;
allFolders.sort((a, b) => b.size - b.size);
allFolders.forEach(f => {
    console.log(JSON.stringify(f));
});
const totalSize = allFolders[allFolders.length-1].size;
const freeSpace = diskSize - totalSize;
console.log(`total size ${totalSize} free space ${freeSpace}`);
const extraSpaceNeeded = 30000000 - freeSpace;
console.log(`extra needed ${extraSpaceNeeded}`);

let i=0;
while(i < allFolders.length) {
    if (allFolders[i].size >= extraSpaceNeeded) {
        console.log(`Folder ${allFolders[i].folder} size ${allFolders[i].size}`);
        break;
    }
    i++;
}

console.log('done');

