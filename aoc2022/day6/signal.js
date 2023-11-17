const fs = require('fs');

const line = fs.readFileSync('input.txt').toString();


const findGenericMarker = (distinct) => (l) => {
    let index = distinct-1;
    while (index < l.length) {
        const map = {}
        let i;
        for (i=index; i>index-distinct; i--) {
            map[l[i]] = 1;
        }
        if (Object.keys(map).length === distinct) {
            console.log(`found a marker at ${index + 1}`);
            return index + 1;
        }
        index++;
    }
}

const findMarker = findGenericMarker(4);

findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz');
findMarker('nppdvjthqldpwncqszvftbrmjlhg');
findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
console.log('real data');
// console.log(line);
findMarker(line);
console.log('done');

const findMsgStart = findGenericMarker(14);

// mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26

findMsgStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb'); // first marker after character 19
findMsgStart('bvwbjplbgvbhsrlpgdmjqwftvncz'); // first marker after character 23
findMsgStart('nppdvjthqldpwncqszvftbrmjlhg'); // first marker after character 23
findMsgStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'); // first marker after character 29
findMsgStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'); // first marker after character 26
console.log('real data 2');
findMsgStart(line);
console.log('done');