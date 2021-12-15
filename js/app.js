let rulesButton = document.querySelector(".modal-toggle");
let modalOverlay = document.querySelector(".modal-overlay");
let rulesModal = document.querySelector(".modal--primary");
let playAgainModal = document.querySelector(".modal--secondary");
let closeButton = document.querySelector(".btn--close");

rulesButton.addEventListener("click", () => {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
});
modalOverlay.addEventListener("click", () => {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
});
closeButton.addEventListener("click", () => {
    modalOverlay.classList.toggle("modal-overlay--closed");
    rulesModal.classList.toggle("modal--closed");
});
