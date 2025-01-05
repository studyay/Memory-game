const cardImages = [
    'B1.png', 'B1.png',
    'B2.png', 'B2.png',
    'B3.png', 'B3.png',
    'B4.png', 'B4.png',
    'B5.png', 'B5.png',
    'B6.png', 'B6.png'
];

const gameBoard = document.getElementById('game-board');
let firstCard, secondCard;
let lockBoard = false;
let matchcount = 0;

// 카드 섞기
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 카드 생성
function createCards() {
    const shuffledCards = shuffle(cardImages);
    shuffledCards.forEach(imageUrl => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card front" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
                <div class="card back"></div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// 카드 뒤집기
function flipCard() {
    if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    setTimeout(checkForMatch, 600); // 카드가 완전히 뒤집힌 후 판별
}

// 짝 맞추기 확인
function checkForMatch() {
    const isMatch = firstCard.querySelector('.front').style.backgroundImage === secondCard.querySelector('.front').style.backgroundImage;

    if (isMatch) {
        disableCards();
        matchcount++;
        checkGameOver();
    } else {
        unflipCards();
    }
}

// 카드 비활성화
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // 카드의 불투명도를 0으로 변경
    setTimeout(() => {
        firstCard.style.opacity = '0';
        secondCard.style.opacity = '0';
    });

    resetBoard();
}

// 카드 뒤집기 취소
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 500);
}

// 보드 리셋
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// 게임 종료 확인
function checkGameOver() {
    if (matchcount === cardImages.length/2) {
        setTimeout(() => {
            showMessage("Very Good✨");
        }, 1000);
    }
}

// 메시지 표시
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.fontSize = '40px';
    messageDiv.style.color = '#fff';
    document.body.appendChild(messageDiv);
}

// 게임 시작
createCards();