const fs = require('fs');

const lines = fs.readFileSync('input.txt').toString().split('\n');

lines.forEach(l => {
    console.log(`"${l}",`);
})