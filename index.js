let player = {
    name: "Lenny",
    chips: 145
}

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let message_el = document.getElementById("message-el");
//let sum_el = document.getElementById("sum-el");

// select based on the CSS selector name -> can be .className, #IdName, elementName
let sum_el = document.querySelector(".sum-el");
let cards_el = document.querySelector(".cards-el");
let start_btn = document.querySelector(".start-btn");
let reset_btn = document.querySelector(".reset-btn");
let player_el = document.querySelector("#player-el");
player_el.textContent = `${player.name}: $${player.chips}`; 

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    start_btn.style.display = "none";
    renderGame();
}

function resetGame() {
    cards = [];
    sum = 0;
    hasBlackJack = false;
    reset_btn.style.display = "none";
    start_btn.style.display = "block";
    message = "Want to play a round?";
    renderGame();
}

function renderResetBtn() {
    if (isAlive === false || hasBlackJack === true) {
        // const resetButton = document.createElement('button');
        // const resetText = document.createTextNode("RESET GAME");
        // resetButton.appendChild(resetText);
        // resetButton.setAttribute("onClick","resetGame()")
        // resetButton.setAttribute("id","reset-btn")
        // const btn_section = document.querySelector(".buttons");
        // btn_section.appendChild(resetButton);
        reset_btn.style.display = "block";
    }
}

function renderGame() {
    cards_el.textContent = `Cards: ${cards.join(' ')}`;
    sum_el.textContent = "Sum: " + sum;
    if (sum <= 20 && sum > 0) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        renderResetBtn()
    } else if (sum > 21) {
        message = "You're out of the game!";
        isAlive = false;
        renderResetBtn()
    }

    message_el.textContent = message;
}

// order of functions like this dont matter because they are hoisted to the top
function getRandomCard() {
    // Math.floor() returns the the largest integer less than or equal to given number , 
    // Math.random() between 0 and 1 not inclusive of 1
    let randomCard = Math.floor(Math.random() * 13) + 1; // without +1 range is 0-12, +1 makes it 1-13
    if (randomCard === 1) {
        randomCard = 11;
    }
    else if (randomCard > 10) {
        randomCard = 10;
    }
    return randomCard;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        console.log("Drawing a new card from the deck!");
        let card = getRandomCard();
        cards.push(card);
        sum += card;
        renderGame();
    }
   
};