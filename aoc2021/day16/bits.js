const fs = require('fs');

const line = fs.readFileSync('testinput3.txt').toString();

const hexToBinary = (hex) => {
    let bits = '';
    let i;
    for (i=0; i<hex.length; i++) {
        const term = hex[i];
        switch (term) {
            case '0':
                bits += '0000';
                break;
            case '1':
                bits += '0001';
                break;
            case '2':
                bits += '0010';
                break;
            case '3':
                bits += '0011';
                break;
            case '4':
                bits += '0100';
                break;
            case '5':
                bits += '0101';
                break;
            case '6':
                bits += '0110';
                break;
            case '7':
                bits += '0111';
                break;
            case '8':
                bits += '1000';
                break;
            case '9':
                bits += '1001';
                break;
            case 'A':
                bits += '1010';
                break;
            case 'B':
                bits += '1011';
                break;
            case 'C':
                bits += '1100';
                break;
            case 'D':
                bits += '1101';
                break;
            case 'E':
                bits += '1110';
                break;
            case 'F':
                bits += '1111';
                break;
        }
    }
    return bits;
}

const parsePacket = (bits, solution) => {
    let index = 0;

    // first 3 bits are version
    let version = parseInt(bits.slice(0, 3), 2);
    // console.log(`version ${version}`);
    solution.versionSum += version;

    // next 3 bits are the type
    let type = parseInt(bits.slice(3, 6), 2);
//    console.log(type);

    const packetValues = [];
    if (type === 4) {
        // literal
        // read 5 bits in a loop
        let moreNums = false;
        index = 6;
        let immBuffer = '';
        do {
            const fiveBits = bits.slice(index, index+5);
            moreNums = fiveBits[0] === '1';
            immBuffer += fiveBits.slice(1);
            index += 5;
        } while (moreNums === true);
        const immediate = parseInt(immBuffer, 2);
        packetValues.push(immediate);
//        console.log(`immediate: ${immediate}`);
//        console.log(index);
    } else {
        // contains more operands
        const lengthType = bits[6];
        index = 7;
        if (lengthType === '0') {
            // 15 bit number
            const fifteenBits = bits.slice(index, index+15);
            index += 15;
            const length = parseInt(fifteenBits, 2);
            // length represents the number of bits
            let bitsParsed = 0;
            while (bitsParsed < length) {
                const subString = bits.slice(index);
                const [subPacketLength, subPacketValue] = parsePacket(subString, solution);
                bitsParsed += subPacketLength;
                index += subPacketLength;
                packetValues.push(subPacketValue);
            }
        } else {
            // 11 bit number
            const elevenBits = bits.slice(index, index+11);
            index += 11;
            const length = parseInt(elevenBits, 2);
            // length represents the number of subpackets
            let packetsParsed = 0;
            while (packetsParsed < length) {
                const subString = bits.slice(index);
                const [subPacketLength, subPacketValue] = parsePacket(subString, solution);
                packetsParsed ++;
                index += subPacketLength;
                packetValues.push(subPacketValue);
            }
        }
    }

    let myValue;
    switch (type) {
        case 4:
            myValue = packetValues[0];
            break;
        case 0:
            myValue = packetValues.reduce((acc, val) => {
                return acc + val;
            }, 0);
            break;
        case 1:
            myValue = packetValues.reduce((acc, val) => {
                return acc * val;
            }, 1);
            break;
        case 2:
            myValue = Math.min(...packetValues);
            break;
        case 3:
            myValue = Math.max(...packetValues);
            break;
        case 5:
            myValue = packetValues[0] > packetValues[1] ? 1 : 0;
            break;
        case 6:
            myValue = packetValues[0] < packetValues[1] ? 1 : 0;
            break;
        case 7:
            myValue = packetValues[0] === packetValues[1] ? 1 : 0;
            break;
    }

    return [index, myValue];
};

const computeVersionSum = (bits) => {
    const solution = {
        versionSum: 0,
    }
    parsePacket(bits, solution);
    return solution.versionSum;
}

const computeValue = (bits) => {
    const solution = {
        versionSum: 0,
    }
    const [bitsParsed, value] = parsePacket(bits, solution);
    return value;
}


const bits  = hexToBinary(line);
console.log(bits);
//const bitsParsed = parsePacket(bits);
//console.log(`bitsParsed ${bitsParsed}`);

//const versionSum = computeVersionSum(bits);
//console.log(`version sum ${versionSum}`)
//
//const moreInputs = fs.readFileSync('testinput4.txt').toString().split('\n');
//moreInputs.forEach(data => {
//    const theBits = hexToBinary(data);
//    const theSum = computeVersionSum(theBits);
//    console.log(`${data}: ${theSum}`);
//});

const realInput = fs.readFileSync('input.txt').toString();
const realBits = hexToBinary(realInput);
const realSum = computeVersionSum(realBits);
console.log(`real sum ${realSum}`);

const valueInputs = fs.readFileSync('testinput5.txt').toString().split('\n');
valueInputs.forEach(data => {
    const theBits = hexToBinary(data);
    const theValue = computeValue(theBits);
    console.log(`${data}: ${theValue}`);
});

const realValue = computeValue(realBits);
console.log(`real value ${realValue}`);