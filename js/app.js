import * as game from "./game.js";

const player = document.querySelector(".human__score");
const computer = document.querySelector(".computer__score");
const roundResult = document.querySelector(".result__txt");
const playerSelectionElement = document.querySelector(".result-selection__player");
const computerSelectionElement = document.querySelector(".result-selection__computer");
const roundDescription = document.querySelector(".result__description");
const selectionButtons = document.querySelectorAll(".game-selection__btn");
const rulesButton = document.querySelector(".modal-toggle");
const modalOverlay = document.querySelector(".modal-overlay");
const rulesModal = document.querySelector(".modal--primary");
const closeButton = document.querySelector(".btn--close");
const playAgainModal = document.querySelector(".modal--secondary");
const modalTxt = document.querySelector(".modal-content__txt");
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
function updateColorFromSelection(selection = "") {
    let color = ""
    if (selection.length === 0) {
        return color;
    }
    switch (selection) {
        case "rock":
            color = "red";
            break;
        case "paper":
            color = "yellow";
            break;
        case "scissors":
            color = "purple";
            break;
        case "lizard":
            color = "green";
            break;
        case "spock":
            color = "blue";
            break;
    }
    return color;
}
function updateLabelFromSelection(selection = "") {
    if (selection.length === 0) {
        return `<i class="fas fa-question fa-3x"></i>`
    }
    const color = updateColorFromSelection(selection);
    return `<i class="fas fa-hand-${selection} ${color} fa-3x"></i>`
}
function playGame(playerSelection) {
    const computerSelection = game.computerPlay();
    const round = game.play(playerSelection, computerSelection);
    player.textContent = game.getPlayerScore();
    computer.textContent = game.getComputerScore();
    roundResult.textContent = round.result;
    playerSelectionElement.innerHTML = updateLabelFromSelection(playerSelection);
    computerSelectionElement.innerHTML = updateLabelFromSelection(computerSelection);
    roundDescription.innerHTML = updateRoundDescription(round.description, playerSelection, computerSelection);
}
function updateRoundDescription(roundDescription = "", player = "", computer = "") {
    if (player.length === 0) {
        return "";
    }
    const playerColor = updateColorFromSelection(player);
    const computerColor = updateColorFromSelection(computer);
    return `<p>
            <span class=${playerColor}>${player}</span> 
            ${roundDescription} 
            <span class=${computerColor}>${computer}</span>
            </p>`
}
function showModal() {
    modalOverlay.classList.toggle("modal-overlay--closed");
    modalOverlay.classList.toggle("clickable");
    modalOverlay.removeEventListener("click", toggleRuleModal);
    modalTxt.textContent = changeModalTxt();
    playAgainModal.classList.toggle("modal--closed");
    playAgainBtn.addEventListener("click", resetGame);
}
function changeModalTxt() {
    if (game.getComputerScore() === game.maxScore) {
        return "No! You Lost!"
    }
    return "Yay!! You Won!"
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
    playerSelectionElement.innerHTML = updateLabelFromSelection();
    computerSelectionElement.innerHTML = updateLabelFromSelection();
    roundDescription.innerHTML = updateRoundDescription();
}
start();