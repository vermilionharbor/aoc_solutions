const card = 9093927;
const door = 11001876;


// const card = 5764801;
// const door = 17807724;

const subjectConstant = 7;
const encryptionConstant = 20201227;

const crack = (publicKey) => {
    let val = 1;
    let loop = 0;

    do {
        val = val * subjectConstant;
        val = val % encryptionConstant;
        loop = loop + 1;
    } while (val !== publicKey);

    return loop;
}

const encryptionKey = (publicKey, loopSize) => {
    let val = 1;
    let loop = 0;

    do {
        val = val * publicKey;
        val = val % encryptionConstant;
        loop = loop + 1;
        // console.log(val);
    } while (loop !== loopSize);

    return val;
}


const cardLoop = crack(card);
const doorLoop = crack(door);
console.log(`card ${cardLoop}`);
console.log(`door ${doorLoop}`);
const key = encryptionKey(door, cardLoop);
console.log(`encryptionKey ${key}`);
console.log(`checking match ${encryptionKey(card, doorLoop)}`);