
let playerScore = 0;
let computerScore = 0;

const maxScore = 5;

function isGameOver() {
    if (playerScore === maxScore || computerScore === maxScore) {
        return true;
    }
}
function computerPlay() {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    const number = Math.floor(Math.random() * choices.length * 1000);
    const selection = number % choices.length;
    return choices[selection];
}
function codeFrom(selection = "") {
    let code = 0;
    switch (selection) {
        case "rock":
            code = 0;
            break;
        case "paper":
            code = 1;
            break;
        case "scissors":
            code = 2;
            break;
        case "lizard":
            code = 3;
            break;
        case "spock":
            code = 4;
            break;
    }
    return code;
}
function playRound(player = 0, computer = 0) {
    const resultMatrix = [
        [0, 2, 1, 1, 2],
        [1, 0, 2, 2, 1],
        [2, 1, 0, 1, 2],
        [2, 1, 2, 0, 1],
        [1, 2, 1, 2, 0]
    ];
    let result = resultMatrix[player][computer];
    return result;
}
function play(playerSelection = "", computerSelection = "") {
   const playerCode = codeFrom(playerSelection);
   const computerCode = codeFrom(computerSelection);
   const result = playRound(playerCode, computerCode);
   return messageFrom(result);
}
function messageFrom(result) {
    let message = "";

    switch (result) {
        case 0:
            message = "Tied!";
            break;
        case 1:
            message = "You Won!";
            playerScore++;
            break;
        case 2:
            message = "You Lost!";
            computerScore++;
            break;
    }
    return message;
}
function resetGame() {
    if (isGameOver()) {
        playerScore = 0;
        computerScore = 0;
    }
}

export { playerScore, computerScore, isGameOver, computerPlay, play, resetGame }