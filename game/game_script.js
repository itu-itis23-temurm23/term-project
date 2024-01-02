const letters = ["t", "e", "m", "u", "r"];
const initialLetters = ["t", "e", "m", "u", "r"];
const initialImages = ["t.svg", "e.svg", "m.svg", "u.svg", "r.svg"];
const game_board = document.getElementById("gameboard");
const score_display = document.getElementById("score");
const start_button = document.getElementById("start");
const restart_button = document.getElementById("restart");
let score = 0;
let currentIndex = 0;
let game_over = false;

function shuffleArrays(letterArray) {
    let arr1 = letterArray;
    for (let i = arr1.length - 1; i > 0; i--) {
        // This is done so all three lists are shuffled with the same seed.
        const j = Math.floor(Math.random() * (i + 1));
        [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
    }
    return arr1;
}

function createCards(sequence) {
    cardElements = [];
    sequence.forEach(letter => {
        const card = document.createElement("div");
        const img = document.createElement("img");
        img.src = letter + ".svg"; // Path to the letter's image
        card.appendChild(img);
        card.setAttribute('data-letter', letter); // Store the letter for later comparison
        card.classList.add("card");
        game_board.appendChild(card);
        cardElements.push(img);
    });
    return cardElements;
}

function clearCards() {
    while (game_board.firstChild) {
        game_board.firstChild.remove();
    }
}

function hideCards() {
    cardElements.forEach(cardElement => {
        cardElement.src = "box.svg";
    });
}

function game_check(event) {
    let clickedCard = event.target.closest(".card");
    if (!clickedCard) return; // Click was not on a card
    if (clickedCard.getAttribute('data-letter') === initialLetters[currentIndex]) {
        clickedCard.firstChild.src = initialImages[currentIndex];
        score += 20;
        score_display.innerHTML = "Score: " + score;
        currentIndex++;
        if (currentIndex === letters.length) {
            alert("Congratulations! You won!");
            game_over = true;
        }
    } else {
        score = 0;
        score_display.innerHTML = "Score: " + score;
        alert("Game Over! You clicked a wrong letter.");
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].firstChild.src = initialImages[i];
        }
        game_over = true;
    }
}
function initializeGame() {
    clearCards()
    shuffleArrays(letters);
    cardElements = createCards(letters);
    setTimeout(hideCards, 2000, cardElements);

}

createCards(letters);
restart_button.hidden = true;
start_button.addEventListener("click", function() {
    initializeGame();
    restart_button.style.display = 'block';
    restart_button.hidden = false;
    start_button.hidden = true;
});
restart_button.addEventListener("click", function() {
    currentIndex = 0;
    score = 0;
    score_display.innerHTML = "Score: " + score;
    clearCards();
    createCards(initialLetters);
    restart_button.hidden = true;
    start_button.hidden = false;
});
game_board.addEventListener("click", event => {
    game_check(event);
});