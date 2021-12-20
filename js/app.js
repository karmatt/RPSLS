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
const playAgainModal = document.querySelector(".modal--secondary");
const closeButton = document.querySelector(".btn--close");


function toggleRuleModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
}
function start() {
    rulesButton.addEventListener("click", toggleRuleModal);
    modalOverlay.addEventListener("click", toggleRuleModal);
    closeButton.addEventListener("click", toggleRuleModal);

    selectionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let selectedButton = button.id;
            playGame(selectedButton);
        });
    });
}
function playGame(playerSelection) {
    if (isGameOver()) {
        return;
    }
    const computerSelection = computerPlay();
    const resultMessage = play(playerSelection, computerSelection);
    player.textContent = `${playerScore}`;
    computer.textContent = `${computerScore}`;
    roundResult.textContent = resultMessage;
    playerSelectionElement.innerHTML = updateLabel(playerSelection);
    computerSelectionElement.innerHTML = updateLabel(computerSelection);
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
start();