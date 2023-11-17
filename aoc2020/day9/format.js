const fs = require('fs');

const data = fs.readFileSync("input.txt").toString();
const nums = data.split('\n');

//console.log(data);
nums.forEach(n => {
  console.log(`${n},`);
})

