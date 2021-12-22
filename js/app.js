import * as game from "./game.js";

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
const playAgainBtn = document.querySelector(".modal-content__btn")

rulesButton.addEventListener("click", toggleRuleModal);
modalOverlay.addEventListener("click", toggleRuleModal);
closeButton.addEventListener("click", toggleRuleModal);

const defaultText = roundResult.textContent;

function start() {
    selectionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selection = button.id;
            playGame(selection);
            if (game.isOver()) {
                showModal();
            }
        });
    });
}
function toggleRuleModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
}
function updateLabel(selection = "") {
    if (selection.length === 0) {
        return `<i class="fas fa-question fa-3x"></i>`
    }
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
    return `<i class="fas fa-hand-${selection} ${newColor} fa-3x"></i>`
}
function playGame(playerSelection) {
    const computerSelection = game.computerPlay();
    const resultMessage = game.play(playerSelection, computerSelection);
    player.textContent = game.getPlayerScore();
    computer.textContent = game.getComputerScore();
    roundResult.textContent = resultMessage;
    playerSelectionElement.innerHTML = updateLabel(playerSelection);
    computerSelectionElement.innerHTML = updateLabel(computerSelection);

}
function showModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    modalOverlay.classList.toggle("clickable");
    modalOverlay.removeEventListener("click", toggleRuleModal);
    playAgainModal.classList.toggle("modal--closed");
    playAgainBtn.addEventListener("click", resetGame);
}
function resetGame() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    modalOverlay.classList.toggle("clickable");
    modalOverlay.addEventListener("click", toggleRuleModal);
    playAgainModal.classList.toggle("modal--closed");
    game.reset();
    player.textContent = game.getPlayerScore();
    computer.textContent = game.getComputerScore();
    roundResult.textContent = defaultText;
    playerSelectionElement.innerHTML = updateLabel();
    computerSelectionElement.innerHTML = updateLabel();
}
start();