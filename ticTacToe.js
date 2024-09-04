const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (isBoardFull()) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetBoard);
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Initialize the game status
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
