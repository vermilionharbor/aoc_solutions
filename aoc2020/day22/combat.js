const fs = require('fs');

const lines = fs.readFileSync("input.txt").toString().split("\n");

let player1 = [];
let player2 = [];
let deck
lines.forEach(l => {
    if (l.startsWith("Player 1:")) {
        deck = player1;
    } else if (l.startsWith("Player 2:")) {
        deck = player2;
    } else if (l.length > 0) {
        deck.push(parseInt(l, 10));
    }
})

console.log(player1);
console.log(player2);

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

console.log(player1);
console.log(player2);

const score = (deck) => {
    let score = 0;
    deck.forEach((c, index) => {
        score += (deck.length-index) * c;
    })
    return score;
}

if (player1.length === 0) {
    console.log(`player 2 wins ${score(player2)}`);
} else if (player2.length === 0) {
    console.log(`player 1 wins ${score(player1)}`);
}
