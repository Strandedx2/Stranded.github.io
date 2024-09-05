const boardElement = document.querySelector('.board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const gameOptions = document.getElementById('game-options');
const gameElement = document.getElementById('game');
const playPersonButton = document.getElementById('play-person');
const playBotButton = document.getElementById('play-bot');

let cells;
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'person'; // 'person' or 'bot'

// Event Listeners
playPersonButton.addEventListener('click', () => startGame('person'));
playBotButton.addEventListener('click', () => startGame('bot'));
resetButton.addEventListener('click', resetGame);
backButton.addEventListener('click', showOptions);

function startGame(mode) {
    gameMode = mode;
    gameOptions.style.display = 'none';
    gameElement.style.display = 'block';
    createBoard();
    updateStatus();
    resetGame();
}

function createBoard() {
    boardElement.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
        cells.push(cell);
    }
}

function handleCellClick(index) {
    if (!gameActive || cells[index].textContent) return;

    cells[index].textContent = currentPlayer;
    if (checkWin()) {
        updateStatus(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }
    if (isBoardFull()) {
        updateStatus('It\'s a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();

    if (gameMode === 'bot' && currentPlayer === 'O') {
        setTimeout(botMove, 500);
    }
}

function updateStatus(message = `${currentPlayer}'s turn`) {
    statusDisplay.textContent = message;
}

function botMove() {
    let availableCells = cells.map((cell, index) => cell.textContent === '' ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[randomIndex].textContent = 'O';

    if (checkWin()) {
        updateStatus('Bot wins!');
        gameActive = false;
        return;
    }
    if (isBoardFull()) {
        updateStatus('It\'s a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    updateStatus();
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function isBoardFull() {
    return cells.every(cell => cell.textContent);
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
    createBoard();
    if (gameMode === 'bot' && currentPlayer === 'O') {
        setTimeout(botMove, 500);
    }
}

function showOptions() {
    gameElement.style.display = 'none';
    gameOptions.style.display = 'block';
}