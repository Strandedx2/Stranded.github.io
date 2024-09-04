// Initial setup for board and pieces
const initialBoardSetup = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

const boardElement = document.querySelector('.board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let selectedCell = null;
let currentPlayer = 'white';
let gameActive = true;

// Unicode representation to identify pieces by type and color
const pieceSymbols = {
    '♜': { type: 'rook', color: 'black' },
    '♞': { type: 'knight', color: 'black' },
    '♝': { type: 'bishop', color: 'black' },
    '♛': { type: 'queen', color: 'black' },
    '♚': { type: 'king', color: 'black' },
    '♟': { type: 'pawn', color: 'black' },
    '♖': { type: 'rook', color: 'white' },
    '♘': { type: 'knight', color: 'white' },
    '♗': { type: 'bishop', color: 'white' },
    '♕': { type: 'queen', color: 'white' },
    '♔': { type: 'king', color: 'white' },
    '♙': { type: 'pawn', color: 'white' }
};

// Create the chessboard
function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            if (initialBoardSetup[row][col]) {
                const piece = document.createElement('span');
                piece.classList.add('piece');
                piece.textContent = initialBoardSetup[row][col];
                cell.appendChild(piece);
            }
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle click events on cells
function handleCellClick(event) {
    const cell = event.currentTarget;
    const piece = cell.querySelector('.piece');

    if (!gameActive) return;

    if (selectedCell && selectedCell !== cell && (!piece || pieceSymbols[piece.textContent].color !== currentPlayer)) {
        movePiece(selectedCell, cell);
    } else {
        selectCell(cell);
    }
}

// Select a cell (and a piece)
function selectCell(cell) {
    const piece = cell.querySelector('.piece');
    if (piece && pieceSymbols[piece.textContent].color === currentPlayer) {
        selectedCell?.classList.remove('selected');
        selectedCell = cell;
        selectedCell.classList.add('selected');
    }
}

// Move a piece if the move is valid
// function movePiece(fromCell, toCell) {
//     const fromPiece = fromCell.querySelector('.piece');
//     if (fromPiece && isMoveValid(fromCell, toCell, fromPiece.textContent)) {
//         toCell.innerHTML = '';
//         toCell.appendChild(fromPiece);
//         fromCell.innerHTML = '';
//         switchPlayer();
//     }
// }

function movePiece(fromCell, toCell) {
    const fromPiece = fromCell.querySelector('.piece');

    if (fromPiece && isMoveValid(fromCell, toCell, fromPiece.textContent)) {
        const fromRect = fromCell.getBoundingClientRect();
        const toRect = toCell.getBoundingClientRect();

        const deltaX = toRect.left - fromRect.left;
        const deltaY = toRect.top - fromRect.top;

        // Move the piece with a smooth transition
        fromPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // Wait for the transition to complete before actually moving the piece in the DOM
        setTimeout(() => {
            toCell.innerHTML = '';
            toCell.appendChild(fromPiece);
            fromPiece.style.transform = ''; // Reset the transform for the next move
            fromCell.innerHTML = '';
            switchPlayer();
        }, 300); // Match the timeout duration with the CSS transition duration
    }
}


// Validate the move based on piece type and rules
function isMoveValid(fromCell, toCell, pieceSymbol) {
    const fromRow = parseInt(fromCell.getAttribute('data-row'));
    const fromCol = parseInt(fromCell.getAttribute('data-col'));
    const toRow = parseInt(toCell.getAttribute('data-row'));
    const toCol = parseInt(toCell.getAttribute('data-col'));
    const piece = pieceSymbols[pieceSymbol];

    switch (piece.type) {
        case 'pawn':
            return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece.color);
        case 'rook':
            return isValidRookMove(fromRow, fromCol, toRow, toCol);
        case 'knight':
            return isValidKnightMove(fromRow, fromCol, toRow, toCol);
        case 'bishop':
            return isValidBishopMove(fromRow, fromCol, toRow, toCol);
        case 'queen':
            return isValidQueenMove(fromRow, fromCol, toRow, toCol);
        case 'king':
            return isValidKingMove(fromRow, fromCol, toRow, toCol);
        default:
            return false;
    }
}

// Movement logic for each piece type

function isValidPawnMove(fromRow, fromCol, toRow, toCol, color) {
    const direction = color === 'white' ? -1 : 1; // White moves up, black moves down
    const startRow = color === 'white' ? 6 : 1;

    const pieceAtDestination = document.querySelector(`.cell[data-row='${toRow}'][data-col='${toCol}']`).querySelector('.piece');

    // Standard one-step forward move
    if (fromCol === toCol && fromRow + direction === toRow && !pieceAtDestination) {
        return true;
    }

    // Two-step forward move from the starting position
    if (fromCol === toCol && fromRow === startRow && fromRow + 2 * direction === toRow) {
        const cellInBetween = document.querySelector(`.cell[data-row='${fromRow + direction}'][data-col='${fromCol}']`);
        if (!pieceAtDestination && !cellInBetween.querySelector('.piece')) {
            return true;
        }
    }

    // Diagonal capture move
    if (Math.abs(fromCol - toCol) === 1 && fromRow + direction === toRow && pieceAtDestination && pieceSymbols[pieceAtDestination.textContent].color !== color) {
        return true;
    }

    // If none of the conditions are met, it's not a valid pawn move
    return false;
}

function isValidRookMove(fromRow, fromCol, toRow, toCol) {
    if (fromRow !== toRow && fromCol !== toCol) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol);
}

function isValidKnightMove(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(fromRow, fromCol, toRow, toCol) {
    if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol);
}

function isValidQueenMove(fromRow, fromCol, toRow, toCol) {
    return isValidRookMove(fromRow, fromCol, toRow, toCol) || isValidBishopMove(fromRow, fromCol, toRow, toCol);
}

function isValidKingMove(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    return rowDiff <= 1 && colDiff <= 1;
}

// Ensure no pieces are in the way for linear moves (rook, bishop, queen)
function isPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = toRow === fromRow ? 0 : toRow > fromRow ? 1 : -1;
    const colStep = toCol === fromCol ? 0 : toCol > fromCol ? 1 : -1;
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
        if (cell.querySelector('.piece')) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }
    return true;
}

// Switch player turn
function switchPlayer() {
    selectedCell.classList.remove('selected');
    selectedCell = null;
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the board to the initial state
function resetBoard() {
    selectedCell = null;
    currentPlayer = 'white';
    gameActive = true;
    createBoard();
}

resetButton.addEventListener('click', resetBoard);
createBoard();
