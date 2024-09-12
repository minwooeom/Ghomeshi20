const cardImages = [
    'imgs/card1.jpg', 'imgs/card1.jpg', // Pair 1
    'imgs/card2.jpg', 'imgs/card2.jpg', // Pair 2
    'imgs/card3.jpg', 'imgs/card3.jpg', // Pair 3
    'imgs/card4.jpg', 'imgs/card4.jpg', // Pair 4
    'imgs/card5.PNG', 'imgs/card5.PNG', // Pair 5
    'imgs/card6.PNG', 'imgs/card6.PNG'  // Pair 6
];

let flippedCards = [];
let matchedCards = 0;
const gameBoard = document.getElementById('game-board');

// Initialize the game
function initializeGame() {
    const shuffledCards = shuffleArray(cardImages);
    createCards(shuffledCards);
}

// Shuffle the cards
function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Create card elements and add them to the board
function createCards(images) {
    gameBoard.innerHTML = ''; // Clear previous game
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back" style="background-image: url(${image})"></div>
            </div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip a card
function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched'); // Add the 'matched' class for the glowing effect
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];

        // Check if the game is won
        if (matchedCards === cardImages.length) {
            setTimeout(() => {
                window.location.href = 'finalPage.html';  // Redirect to the final page
            }, 700);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 700);
    }
}

// Restart the game
function restartGame() {
    flippedCards = [];
    matchedCards = 0;
    initializeGame();
}


// Start the game for the first time
initializeGame();
