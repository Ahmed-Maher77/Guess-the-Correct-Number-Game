"use strict";
// Select DOM elements
const checkBtn = document.getElementById("checkBtn");
const input = document.getElementById("input");
const msgsContainer = document.querySelector(".msgs");
const popupTrigger = document.getElementById('popup-trigger');
const popupMsg = document.querySelector('#staticBackdrop .modal-body');
// when click "check" button
checkBtn === null || checkBtn === void 0 ? void 0 : checkBtn.addEventListener("click", () => {
    // Validate input: Check for empty value
    if (input.value.trim() === "") {
        createMsg("Enter a value before clicking the button");
    }
    else {
        const enteredNum = Number(input.value);
        // Validate input: Check if number is valid and within range
        if (isNaN(enteredNum) || enteredNum < 0 || enteredNum > 10) {
            createMsg("Enter a number between 0 and 10");
        }
        else {
            compareWithComputerChoice(enteredNum);
        }
    }
});
// Function to compare user's number with a random number
function compareWithComputerChoice(enteredNum) {
    // Generate a random number between 0 and 10
    const randomNum = Math.trunc(Math.random() * 11);
    // Check if the user's guess is correct
    if (randomNum === enteredNum) {
        createPopup('<span class="text-success">Spot On</span> <i class="fa-solid fa-circle-check text-success mt-1"></i>', `Your Choice <b>${enteredNum}</b> is correct`);
    }
    else {
        const relation = enteredNum > randomNum ? 'higher' : 'lower';
        createPopup('<span class="text-danger">Sorry, you lost!</span> <i class="fa-solid fa-circle-xmark text-danger mt-1"></i>', `You entered the number <b>${enteredNum}</b> which is ${relation} than the computer choice <b>${randomNum}</b>`);
    }
}
// Function to display messages to the user
function createMsg(msgContent) {
    msgsContainer.innerText = msgContent;
    msgsContainer.classList.remove('invisible');
}
// Hide message when input changes
input.oninput = () => {
    const enteredNum = Number(input.value);
    if (input.value.trim() !== "" || !isNaN(enteredNum) || enteredNum > 0 || enteredNum < 10) {
        msgsContainer.classList.add('invisible');
    }
};
// Function to create and display a popup
function createPopup(head, content) {
    popupMsg.innerHTML = `
        <h3 class="mb-5 fw-semibold d-flex gap-2 align-items-center justify-content-center">${head}</h3>
        <p class="fs-5 mb-0">${content}</p>
    `;
    popupTrigger.click(); // Trigger popup modal
    input.value = ''; // Clear input after showing popup
}
