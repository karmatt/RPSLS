import { playerScore, computerScore, isGameOver, computerPlay, play, resetGame } from "./game.js";

const player = document.querySelector(".human__score");
const computer = document.querySelector(".computer__score");
const roundResult = document.querySelector(".result__txt");
const selectionButtons = document.querySelectorAll(".game-selection__btn");
const playerSelectionElement = document.querySelector(".result-selection__player");
const computerSelectionElement = document.querySelector(".result-selection__computer");
const rulesButton = document.querySelector(".modal-toggle");
const modalOverlay = document.querySelector(".modal-overlay");
const rulesModal = document.querySelector(".modal--primary");
const closeButton = document.querySelector(".btn--close");
const playAgainModal = document.querySelector(".modal--secondary");
const playAgainBtn = document.querySelector(".modal__btn")

rulesButton.addEventListener("click", toggleRuleModal);
modalOverlay.addEventListener("click", toggleRuleModal);
closeButton.addEventListener("click", toggleRuleModal);

function start() {
    selectionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selection = button.id;
            playGame(selection);
        });
    });
}
function toggleRuleModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
}
function updateLabel(selection) {
    let newColor = ""
    switch (selection) {
        case "rock":
            newColor = "red";
            break;
        case "paper":
            newColor = "yellow";
            break;
        case "scissors":
            newColor = "purple";
            break;
        case "lizard":
            newColor = "green";
            break;
        case "spock":
            newColor = "blue";
            break;
    }
    return `<i class="fas fa-hand-${selection} color-${newColor} fa-3x"></i>`
}
function playGame(playerSelection) {
    if (isGameOver()) {
        showModal();
    }

    const computerSelection = computerPlay();
    const resultMessage = play(playerSelection, computerSelection);
    player.textContent = `${playerScore}`;
    computer.textContent = `${computerScore}`;
    roundResult.textContent = resultMessage;
    playerSelectionElement.innerHTML = updateLabel(playerSelection);
    computerSelectionElement.innerHTML = updateLabel(computerSelection);

    if (isGameOver()) {
        showModal();
    }

}
function showModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    modalOverlay.classList.toggle("clickable");
    modalOverlay.removeEventListener("click", toggleRuleModal);
    playAgainModal.classList.toggle("modal--closed");
    playAgainBtn.addEventListener("click", playAgain);
    


}
function playAgain() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    modalOverlay.classList.toggle("clickable");
    modalOverlay.addEventListener("click", toggleRuleModal);
    playAgainModal.classList.toggle("modal--closed");
    resetGame();
    player.textContent = `${playerScore}`;
    computer.textContent = `${computerScore}`;
}
start();