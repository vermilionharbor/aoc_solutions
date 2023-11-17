// Player 1 starting position: 10
// Player 2 starting position: 4
const start1 = 10;
const start2 = 4;

// const start1 = 4;
// const start2 = 8;

const deterministicRoll = (die) => {
    let temp = die.value;
    die.value = die.value+1;
    if (die.value > 100) die.value = 1;
    die.rolls++;
    return temp;
}

const die = {
    value: 1,
    rolls: 0,
};

const player1 = {
    position: start1-1,
    score: 0
}

const player2 = {
    position: start2-1,
    score: 0
}

const movePlayer = (player, roll) => {
    player.position += roll;
    player.position = player.position % 10;

    // additional score is the position+1
    player.score += player.position+1;
}

const simulateGame = (p1, p2, die) => {
    let gameEnded = false;
    let roll;
    const droll = deterministicRoll;

    while (gameEnded === false) {
        roll = droll(die) + droll(die) + droll(die);
        movePlayer(p1, roll);
        if (p1.score >= 1000) {
            gameEnded = true;
        } else {
            roll = droll(die) + droll(die) + droll(die);
            movePlayer(p2, roll);
            if (p2.score >= 1000) {
                gameEnded = true;
            }
        }
    }

    const losingScore = p1.score > p2.score ? p2.score : p1.score
    console.log(`${die.rolls}, ${losingScore}, ${die.rolls*losingScore}`);
}

simulateGame(player1, player2, die);

// distribution for rolling 3 3-sided die
// 9 => 1  3 => 1
// 8 => 3  4 => 3
// 7 => 331 322 => 6
// 5 => 122 113 => 6
// 6 => 222 123 => 7
// total 27 possible rolls, but 9,8,7,6,5,4,3 only 7 outcomes


const simulateQuantumRoll = (player1, player2, results, rollValue, isP1Roll, universes) => {
    const p1 = {...player1};
    const p2 = {...player2};
    if (isP1Roll) {
        movePlayer(p1, rollValue);
        if (p1.score >= 21) {
            // p1 has won
            results.oneWins += universes;
            return;
        }

        // simulate the next step of evolution!
        simulateQuantumRoll(p1, p2, results, 9, false, universes * 1);
        simulateQuantumRoll(p1, p2, results, 8, false, universes * 3);
        simulateQuantumRoll(p1, p2, results, 7, false, universes * 6);
        simulateQuantumRoll(p1, p2, results, 6, false, universes * 7);
        simulateQuantumRoll(p1, p2, results, 5, false, universes * 6);
        simulateQuantumRoll(p1, p2, results, 4, false, universes * 3);
        simulateQuantumRoll(p1, p2, results, 3, false, universes * 1);
    } else {
        movePlayer(p2, rollValue);
        if (p2.score >= 21) {
            // p2 has won
            results.twoWins += universes;
            return;
        }

        simulateQuantumRoll(p1, p2, results, 9, true, universes * 1);
        simulateQuantumRoll(p1, p2, results, 8, true, universes * 3);
        simulateQuantumRoll(p1, p2, results, 7, true, universes * 6);
        simulateQuantumRoll(p1, p2, results, 6, true, universes * 7);
        simulateQuantumRoll(p1, p2, results, 5, true, universes * 6);
        simulateQuantumRoll(p1, p2, results, 4, true, universes * 3);
        simulateQuantumRoll(p1, p2, results, 3, true, universes * 1);
    }
}

const simulateMultiverse = () => {
    const results = {
        oneWins: 0,
        twoWins: 0,
    }
    const p1 = {
        position: start1-1,
        score: 0
    }

    const p2 = {
        position: start2-1,
        score: 0
    }

    simulateQuantumRoll(p1, p2, results, 9, true,1);
    simulateQuantumRoll(p1, p2, results, 8, true,3);
    simulateQuantumRoll(p1, p2, results, 7, true,6);
    simulateQuantumRoll(p1, p2, results, 6, true,7);
    simulateQuantumRoll(p1, p2, results, 5, true,6);
    simulateQuantumRoll(p1, p2, results, 4, true,3);
    simulateQuantumRoll(p1, p2, results, 3, true,1);

    console.log(JSON.stringify(results));
    if (results.oneWins > results.twoWins) {
        console.log(`Player 1 wins ${results.oneWins} times`);
    } else {
        console.log(`Player 2 wins ${results.twoWins} times`);
    }
}

simulateMultiverse();
