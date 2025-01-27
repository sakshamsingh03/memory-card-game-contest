const cards = [
    'aeroplane.jpg', 'cat.jpg', 'crocodile.jpg', 'dog.jpg', 'elephant.jpg', 'fish.jpg', 'lion.jpg', 'snake.jpg',
    'aeroplane.jpg', 'cat.jpg', 'crocodile.jpg', 'dog.jpg', 'elephant.jpg', 'fish.jpg', 'lion.jpg', 'snake.jpg'
];
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matches = 0;

const gameBoard = document.getElementById('game-board');

cards.sort(() => 0.5 - Math.random());

cards.forEach(cardValue => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', cardValue);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.style.backgroundImage = `url('images/${this.getAttribute('data-value')}')`;
    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    moves++;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchCards();
    } else {
        unflipCards();
    }
}

function matchCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches += 2;
    resetBoard();
    if (matches === cards.length) {
        setTimeout(() => alert(`Game over! Moves: ${moves}`), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.style.backgroundImage = "url('images/card-back.png')";
        secondCard.style.backgroundImage = "url('images/card-back.png')";
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
