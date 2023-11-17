const fs = require('fs');

const file = fs.readFileSync("input.txt").toString();

const Player1Preamble = "Player 1:";
const Player2Preamble = "Player 2:";
const decodeGame = (game, separator) => {
    let player1 = [];
    let player2 = [];
    let deck

    const lines = game.split(separator);
    lines.forEach(l => {
        if (l.startsWith(Player1Preamble)) {
            deck = player1;
        } else if (l.startsWith(Player2Preamble)) {
            deck = player2;
        } else if (l.length > 0) {
            deck.push(parseInt(l, 10));
        }
    })

    return [player1, player2];
}

const encodeGame = (player1, player2) => {
    let buffer = Player1Preamble + "*";
    for (let i=0; i<player1.length; i++) {
        buffer += player1[i].toString() + "*";
    }
    buffer += Player2Preamble + "*";
    for (let i=0; i<player2.length; i++) {
        buffer += player2[i].toString() + "*";
    }
    return buffer;
}

const playGame = (player1, player2) => {
    let player1card, player2card;
    let round = 1;
    while (player1.length > 0 && player2.length > 0) {
        console.log(`Round ${round++}`)
        player1card = player1.shift();
        player2card = player2.shift();
        if (player1card > player2card) {
            player1.push(player1card);
            player1.push(player2card);
        } else if (player1card < player2card) {
            player2.push(player2card);
            player2.push(player1card);
        } else {
            throw new Error("tie round");
        }
    }
}

const score = (deck) => {
    let score = 0;
    deck.forEach((c, index) => {
        score += (deck.length-index) * c;
    })
    return score;
}

let gameCount = 1;
const playRecursiveGame = (player1, player2, level) => {
    let gameStates = {};
    let winner = 0;
    let round = 0;
    let currentGame = gameCount;
    gameCount++;
    console.log(`=== Game ${currentGame} ===`);
    while ((winner === 0) && (player1.length > 0) && (player2.length > 0)) {
        let currentState = encodeGame(player1, player2);
        round ++;
        if (gameStates[currentState] === undefined) {
            gameStates[currentState] = 1;
            let card1 = player1.shift();
            let card2 = player2.shift();
            // console.log(`player1 drew ${card1} player2 drew ${card2}`);
            if ((player1.length >= card1) && (player2.length >= card2)) {
                // play a round of recursive
                let subdeck1 = player1.slice(0, card1);
                let subdeck2 = player2.slice(0, card2);
                let subWinner = playRecursiveGame(subdeck1, subdeck2, level+1);
                if (subWinner === 1) {
                    // console.log(`player 1 wins round ${round} of game ${currentGame}`);
                    player1.push(card1);
                    player1.push(card2);
                } else {
                    // console.log(`player 2 wins round ${round} of game ${currentGame}`);
                    player2.push(card2);
                    player2.push(card1);
                }
            } else {
                // play normally
                if (card1 > card2) {
                    player1.push(card1);
                    player1.push(card2);
                    // console.log(`player 1 wins round ${round} of game ${currentGame}`)
                } else if (card2 > card1) {
                    player2.push(card2);
                    player2.push(card1);
                    // console.log(`player 2 wins round ${round} of game ${currentGame}`)
                } else {
                    throw new Error("tie round");
                }
            }
        } else {
            console.log("Player 1 wins due to recursion");
            winner = 1;
        }
    }

    if (winner !== 0) {
        return winner;
    } else {
        if (player1.length === 0) {
            console.log(`player 2 wins ${currentGame}`)
            return 2;
        } else {
            console.log(`player 1 wins ${currentGame}`)
            return 1;
        }
    }
}


let [player1, player2] = decodeGame(file, "\n");

console.log(player1);
console.log(player2);
// let encodedGame = encodeGame(player1, player2);
// console.log(encodedGame);
// [player1, player2] = decodeGame(encodedGame, "*");
// console.log(player1);
// console.log(player2);

let winner = playRecursiveGame(player1, player2, 0);
console.log(`player1 ${player1}`);
console.log(`player2 ${player2}`);

if (winner === 2) {
    console.log(`player 2 wins ${score(player2)}`);
} else {
    console.log(`player 1 wins ${score(player1)}`);
}
