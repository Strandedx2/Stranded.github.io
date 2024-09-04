// // Initial setup for board and pieces
// const initialBoardSetup = [
//     ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
//     ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
//     ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
// ];

// const boardElement = document.querySelector('.board');
// const statusDisplay = document.getElementById('status');
// const resetButton = document.getElementById('resetButton');

// let selectedCell = null;
// let currentPlayer = 'white';
// let gameActive = true;

// // Unicode representation to identify pieces by type and color
// const pieceSymbols = {
//     '♜': { type: 'rook', color: 'black' },
//     '♞': { type: 'knight', color: 'black' },
//     '♝': { type: 'bishop', color: 'black' },
//     '♛': { type: 'queen', color: 'black' },
//     '♚': { type: 'king', color: 'black' },
//     '♟': { type: 'pawn', color: 'black' },
//     '♖': { type: 'rook', color: 'white' },
//     '♘': { type: 'knight', color: 'white' },
//     '♗': { type: 'bishop', color: 'white' },
//     '♕': { type: 'queen', color: 'white' },
//     '♔': { type: 'king', color: 'white' },
//     '♙': { type: 'pawn', color: 'white' }
// };

// // Create the chessboard
// function createBoard() {
//     boardElement.innerHTML = '';
//     for (let row = 0; row < 8; row++) {
//         for (let col = 0; col < 8; col++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
//             cell.setAttribute('data-row', row);
//             cell.setAttribute('data-col', col);
//             if (initialBoardSetup[row][col]) {
//                 const piece = document.createElement('span');
//                 piece.classList.add('piece');
//                 piece.textContent = initialBoardSetup[row][col];
//                 cell.appendChild(piece);
//             }
//             cell.addEventListener('click', handleCellClick);
//             boardElement.appendChild(cell);
//         }
//     }
//     statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
// }

// // Handle click events on cells
// function handleCellClick(event) {
//     const cell = event.currentTarget;
//     const piece = cell.querySelector('.piece');

//     if (!gameActive) return;

//     if (selectedCell && selectedCell !== cell && (!piece || pieceSymbols[piece.textContent].color !== currentPlayer)) {
//         movePiece(selectedCell, cell);
//     } else {
//         selectCell(cell);
//     }
// }

// // Select a cell (and a piece)
// function selectCell(cell) {
//     const piece = cell.querySelector('.piece');
//     if (piece && pieceSymbols[piece.textContent].color === currentPlayer) {
//         selectedCell?.classList.remove('selected');
//         selectedCell = cell;
//         selectedCell.classList.add('selected');
//     }
// }

// // Move a piece if the move is valid
// // function movePiece(fromCell, toCell) {
// //     const fromPiece = fromCell.querySelector('.piece');
// //     if (fromPiece && isMoveValid(fromCell, toCell, fromPiece.textContent)) {
// //         toCell.innerHTML = '';
// //         toCell.appendChild(fromPiece);
// //         fromCell.innerHTML = '';
// //         switchPlayer();
// //     }
// // }



// // Validate the move based on piece type and rules
// function isMoveValid(fromCell, toCell, pieceSymbol) {
//     const fromRow = parseInt(fromCell.getAttribute('data-row'));
//     const fromCol = parseInt(fromCell.getAttribute('data-col'));
//     const toRow = parseInt(toCell.getAttribute('data-row'));
//     const toCol = parseInt(toCell.getAttribute('data-col'));
//     const piece = pieceSymbols[pieceSymbol];

//     switch (piece.type) {
//         case 'pawn':
//             return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece.color);
//         case 'rook':
//             return isValidRookMove(fromRow, fromCol, toRow, toCol);
//         case 'knight':
//             return isValidKnightMove(fromRow, fromCol, toRow, toCol);
//         case 'bishop':
//             return isValidBishopMove(fromRow, fromCol, toRow, toCol);
//         case 'queen':
//             return isValidQueenMove(fromRow, fromCol, toRow, toCol);
//         case 'king':
//             return isValidKingMove(fromRow, fromCol, toRow, toCol);
//         default:
//             return false;
//     }
// }

// // Movement logic for each piece type

// function isValidPawnMove(fromRow, fromCol, toRow, toCol, color) {
//     const direction = color === 'white' ? -1 : 1; // White moves up, black moves down
//     const startRow = color === 'white' ? 6 : 1;

//     const pieceAtDestination = document.querySelector(`.cell[data-row='${toRow}'][data-col='${toCol}']`).querySelector('.piece');

//     // Standard one-step forward move
//     if (fromCol === toCol && fromRow + direction === toRow && !pieceAtDestination) {
//         return true;
//     }

//     // Two-step forward move from the starting position
//     if (fromCol === toCol && fromRow === startRow && fromRow + 2 * direction === toRow) {
//         const cellInBetween = document.querySelector(`.cell[data-row='${fromRow + direction}'][data-col='${fromCol}']`);
//         if (!pieceAtDestination && !cellInBetween.querySelector('.piece')) {
//             return true;
//         }
//     }

//     // Diagonal capture move
//     if (Math.abs(fromCol - toCol) === 1 && fromRow + direction === toRow && pieceAtDestination && pieceSymbols[pieceAtDestination.textContent].color !== color) {
//         return true;
//     }

//     // If none of the conditions are met, it's not a valid pawn move
//     return false;
// }

// function isValidRookMove(fromRow, fromCol, toRow, toCol) {
//     if (fromRow !== toRow && fromCol !== toCol) return false;
//     return isPathClear(fromRow, fromCol, toRow, toCol);
// }

// function isValidKnightMove(fromRow, fromCol, toRow, toCol) {
//     const rowDiff = Math.abs(fromRow - toRow);
//     const colDiff = Math.abs(fromCol - toCol);
//     return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
// }

// function isValidBishopMove(fromRow, fromCol, toRow, toCol) {
//     if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
//     return isPathClear(fromRow, fromCol, toRow, toCol);
// }

// function isValidQueenMove(fromRow, fromCol, toRow, toCol) {
//     return isValidRookMove(fromRow, fromCol, toRow, toCol) || isValidBishopMove(fromRow, fromCol, toRow, toCol);
// }

// function isValidKingMove(fromRow, fromCol, toRow, toCol) {
//     const rowDiff = Math.abs(fromRow - toRow);
//     const colDiff = Math.abs(fromCol - toCol);
//     return rowDiff <= 1 && colDiff <= 1;
// }

// // Ensure no pieces are in the way for linear moves (rook, bishop, queen)
// function isPathClear(fromRow, fromCol, toRow, toCol) {
//     const rowStep = toRow === fromRow ? 0 : toRow > fromRow ? 1 : -1;
//     const colStep = toCol === fromCol ? 0 : toCol > fromCol ? 1 : -1;
//     let currentRow = fromRow + rowStep;
//     let currentCol = fromCol + colStep;

//     while (currentRow !== toRow || currentCol !== toCol) {
//         const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
//         if (cell.querySelector('.piece')) return false;
//         currentRow += rowStep;
//         currentCol += colStep;
//     }
//     return true;
// }

// // Switch player turn
// function switchPlayer() {
//     selectedCell.classList.remove('selected');
//     selectedCell = null;
//     currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
//     statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
// }

// // Reset the board to the initial state
// function resetBoard() {
//     selectedCell = null;
//     currentPlayer = 'white';
//     gameActive = true;
//     createBoard();
// }

// resetButton.addEventListener('click', resetBoard);
// createBoard();




// // Initial setup for board and pieces
// const initialBoardSetup = [
//     ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
//     ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
//     ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
// ];

// const boardElement = document.querySelector('.board');
// const statusDisplay = document.getElementById('status');
// const resetButton = document.getElementById('resetButton');
// const backButton = document.getElementById('backButton');
// const playPersonButton = document.getElementById('play-person');
// const playBotButton = document.getElementById('play-bot');
// const gameOptions = document.getElementById('game-options');
// const gameElement = document.getElementById('game');

// let selectedCell = null;
// let currentPlayer = 'white';
// let gameActive = true;
// let gameMode = 'person'; // Default mode

// // Unicode representation to identify pieces by type and color
// const pieceSymbols = {
//     '♜': { type: 'rook', color: 'black' },
//     '♞': { type: 'knight', color: 'black' },
//     '♝': { type: 'bishop', color: 'black' },
//     '♛': { type: 'queen', color: 'black' },
//     '♚': { type: 'king', color: 'black' },
//     '♟': { type: 'pawn', color: 'black' },
//     '♖': { type: 'rook', color: 'white' },
//     '♘': { type: 'knight', color: 'white' },
//     '♗': { type: 'bishop', color: 'white' },
//     '♕': { type: 'queen', color: 'white' },
//     '♔': { type: 'king', color: 'white' },
//     '♙': { type: 'pawn', color: 'white' }
// };

// // Create the chessboard
// function createBoard() {
//     boardElement.innerHTML = '';
//     for (let row = 0; row < 8; row++) {
//         for (let col = 0; col < 8; col++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
//             cell.setAttribute('data-row', row);
//             cell.setAttribute('data-col', col);
//             if (initialBoardSetup[row][col]) {
//                 const piece = document.createElement('span');
//                 piece.classList.add('piece');
//                 piece.textContent = initialBoardSetup[row][col];
//                 cell.appendChild(piece);
//             }
//             cell.addEventListener('click', handleCellClick);
//             boardElement.appendChild(cell);
//         }
//     }
//     statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
// }

// // Handle click events on cells
// function handleCellClick(event) {
//     const cell = event.currentTarget;
//     const piece = cell.querySelector('.piece');

//     if (!gameActive) return;

//     if (selectedCell && selectedCell !== cell && (!piece || pieceSymbols[piece.textContent].color !== currentPlayer)) {
//         movePiece(selectedCell, cell);
//         if (gameMode === 'bot' && currentPlayer === 'black') {
//             botMove();
//         }
//     } else {
//         selectCell(cell);
//     }
// }

// // Select a cell (and a piece)
// function selectCell(cell) {
//     const piece = cell.querySelector('.piece');
//     if (piece && pieceSymbols[piece.textContent].color === currentPlayer) {
//         selectedCell?.classList.remove('selected');
//         selectedCell = cell;
//         selectedCell.classList.add('selected');
//     }
// }

// // Move a piece if the move is valid
// function movePiece(fromCell, toCell) {
//     const fromPiece = fromCell.querySelector('.piece');
//     if (fromPiece && isMoveValid(fromCell, toCell, fromPiece.textContent)) {
//         toCell.innerHTML = '';
//         toCell.appendChild(fromPiece);
//         fromCell.innerHTML = '';
//         switchPlayer();
//     }
// }

// // Validate the move based on piece type and rules
// function isMoveValid(fromCell, toCell, pieceSymbol) {
//     const fromRow = parseInt(fromCell.getAttribute('data-row'));
//     const fromCol = parseInt(fromCell.getAttribute('data-col'));
//     const toRow = parseInt(toCell.getAttribute('data-row'));
//     const toCol = parseInt(toCell.getAttribute('data-col'));
//     const piece = pieceSymbols[pieceSymbol];

//     switch (piece.type) {
//         case 'pawn':
//             return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece.color);
//         case 'rook':
//             return isValidRookMove(fromRow, fromCol, toRow, toCol);
//         case 'knight':
//             return isValidKnightMove(fromRow, fromCol, toRow, toCol);
//         case 'bishop':
//             return isValidBishopMove(fromRow, fromCol, toRow, toCol);
//         case 'queen':
//             return isValidQueenMove(fromRow, fromCol, toRow, toCol);
//         case 'king':
//             return isValidKingMove(fromRow, fromCol, toRow, toCol);
//         default:
//             return false;
//     }
// }

// // Movement logic for each piece type
// function isValidPawnMove(fromRow, fromCol, toRow, toCol, color) {
//     const direction = color === 'white' ? -1 : 1;
//     const startRow = color === 'white' ? 6 : 1;

//     const pieceAtDestination = document.querySelector(`.cell[data-row='${toRow}'][data-col='${toCol}']`).querySelector('.piece');

//     if (fromCol === toCol && fromRow + direction === toRow && !pieceAtDestination) {
//         return true;
//     }

//     if (fromCol === toCol && fromRow === startRow && fromRow + 2 * direction === toRow) {
//         const cellInBetween = document.querySelector(`.cell[data-row='${fromRow + direction}'][data-col='${fromCol}']`);
//         if (!pieceAtDestination && !cellInBetween.querySelector('.piece')) {
//             return true;
//         }
//     }

//     if (Math.abs(fromCol - toCol) === 1 && fromRow + direction === toRow && pieceAtDestination && pieceSymbols[pieceAtDestination.textContent].color !== color) {
//         return true;
//     }

//     return false;
// }

// function isValidRookMove(fromRow, fromCol, toRow, toCol) {
//     if (fromRow !== toRow && fromCol !== toCol) return false;
//     return isPathClear(fromRow, fromCol, toRow, toCol);
// }

// function isValidKnightMove(fromRow, fromCol, toRow, toCol) {
//     const rowDiff = Math.abs(fromRow - toRow);
//     const colDiff = Math.abs(fromCol - toCol);
//     return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
// }

// function isValidBishopMove(fromRow, fromCol, toRow, toCol) {
//     if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
//     return isPathClear(fromRow, fromCol, toRow, toCol);
// }

// function isValidQueenMove(fromRow, fromCol, toRow, toCol) {
//     return isValidRookMove(fromRow, fromCol, toRow, toCol) || isValidBishopMove(fromRow, fromCol, toRow, toCol);
// }

// function isValidKingMove(fromRow, fromCol, toRow, toCol) {
//     const rowDiff = Math.abs(fromRow - toRow);
//     const colDiff = Math.abs(fromCol - toCol);
//     return rowDiff <= 1 && colDiff <= 1;
// }

// // Ensure no pieces are in the way for linear moves (rook, bishop, queen)
// function isPathClear(fromRow, fromCol, toRow, toCol) {
//     const rowStep = toRow === fromRow ? 0 : toRow > fromRow ? 1 : -1;
//     const colStep = toCol === fromCol ? 0 : toCol > fromCol ? 1 : -1;
//     let currentRow = fromRow + rowStep;
//     let currentCol = fromCol + colStep;

//     while (currentRow !== toRow || currentCol !== toCol) {
//         const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
//         if (cell.querySelector('.piece')) return false;
//         currentRow += rowStep;
//         currentCol += colStep;
//     }
//     return true;
// }

// // Bot move logic
// function botMove() {
//     const emptyCells = Array.from(document.querySelectorAll('.cell'))
//         .filter(cell => !cell.querySelector('.piece') || pieceSymbols[cell.querySelector('.piece').textContent].color !== currentPlayer);
//     const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
//     const fromCell = document.querySelector(`.cell[data-row='${Math.floor(Math.random() * 8)}'][data-col='${Math.floor(Math.random() * 8)}']`);
//     const piece = fromCell.querySelector('.piece');
    
//     if (piece && pieceSymbols[piece.textContent].color === currentPlayer) {
//         movePiece(fromCell, randomCell);
//     }
// }

// // Switch player turn
// function switchPlayer() {
//     selectedCell.classList.remove('selected');
//     selectedCell = null;
//     currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
//     statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

//     if (gameMode === 'bot' && currentPlayer === 'black') {
//         setTimeout(botMove, 500); // Delay for bot move
//     }
// }

// // Reset the board to the initial state
// function resetBoard() {
//     selectedCell = null;
//     currentPlayer = 'white';
//     gameActive = true;
//     createBoard();
// }

// // Handle button clicks
// playPersonButton.addEventListener('click', () => {
//     gameMode = 'person';
//     gameOptions.style.display = 'none';
//     gameElement.style.display = 'block';
//     resetBoard();
// });

// playBotButton.addEventListener('click', () => {
//     gameMode = 'bot';
//     gameOptions.style.display = 'none';
//     gameElement.style.display = 'block';
//     resetBoard();
// });

// backButton.addEventListener('click', () => {
//     gameOptions.style.display = 'flex';
//     gameElement.style.display = 'none';
// });

// resetButton.addEventListener('click', resetBoard);

// // Create the board initially
// createBoard();


// Variables
let gameMode = 'person'; // Default to player vs player
let selectedCell = null;
let currentPlayer = 'white';
let gameActive = true;

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

// DOM Elements
const boardElement = document.querySelector('.board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const playPersonButton = document.getElementById('play-person');
const playBotButton = document.getElementById('play-bot');
const backButton = document.getElementById('backButton');
const gameOptions = document.getElementById('game-options');
const gameElement = document.getElementById('game');

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

    console.log(`Cell clicked: (${cell.getAttribute('data-row')}, ${cell.getAttribute('data-col')})`);

    if (!gameActive) return;

    if (selectedCell && selectedCell !== cell && (!piece || pieceSymbols[piece.textContent].color !== currentPlayer)) {
        if (movePiece(selectedCell, cell)) {
            switchPlayer();
            if (gameMode === 'bot' && currentPlayer === 'black') {
                setTimeout(botMove, 500); // Delay for bot move
            }
        }
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
function movePiece(fromCell, toCell) {
    const fromPiece = fromCell.querySelector('.piece');
    if (fromPiece && isMoveValid(fromCell, toCell, fromPiece.textContent)) {
        toCell.innerHTML = '';
        toCell.appendChild(fromPiece);
        fromCell.innerHTML = '';
        return true;
    }
    return false;
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

// Bot move logic
function botMove() {
    const availableMoves = [];
    document.querySelectorAll('.cell').forEach(fromCell => {
        const fromPiece = fromCell.querySelector('.piece');
        if (fromPiece && pieceSymbols[fromPiece.textContent].color === 'black') {
            document.querySelectorAll('.cell').forEach(toCell => {
                if (isMoveValid(fromCell, toCell, fromPiece.textContent)) {
                    availableMoves.push({ fromCell, toCell });
                }
            });
        }
    });

    if (availableMoves.length > 0) {
        // Filter out moves that capture own pieces
        const filteredMoves = availableMoves.filter(move => {
            const toPiece = move.toCell.querySelector('.piece');
            return !toPiece || pieceSymbols[toPiece.textContent].color !== 'black';
        });

        if (filteredMoves.length > 0) {
            const randomMove = filteredMoves[Math.floor(Math.random() * filteredMoves.length)];
            movePiece(randomMove.fromCell, randomMove.toCell);
            switchPlayer();
        }
    }
}

// Switch player turn
function switchPlayer() {
    if (!selectedCell) return;
    selectedCell.classList.remove('selected');
    selectedCell = null;
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    if (gameMode === 'bot' && currentPlayer === 'black') {
        setTimeout(botMove, 500); // Delay for bot move
    }
}

// Reset the board to the initial state
function resetBoard() {
    selectedCell = null;
    currentPlayer = 'white';
    gameActive = true;
    createBoard();
}

// Handle button clicks
playPersonButton.addEventListener('click', () => {
    console.log('Play vs Person selected');
    gameMode = 'person';
    gameOptions.style.display = 'none';
    gameElement.style.display = 'block';
    resetBoard();
});

playBotButton.addEventListener('click', () => {
    console.log('Play vs Bot selected');
    gameMode = 'bot';
    gameOptions.style.display = 'none';
    gameElement.style.display = 'block';
    resetBoard();
});

backButton.addEventListener('click', () => {
    console.log('Back to options clicked');
    gameOptions.style.display = 'flex';
    gameElement.style.display = 'none';
});

resetButton.addEventListener('click', resetBoard);

// Initialize board
createBoard();
