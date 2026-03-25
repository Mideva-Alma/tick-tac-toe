// script.js - Main game logic for Tic Tac Toe
// Supports Player vs Player and Player vs Computer modes
// Tracks wins for both players

// Game state variables
let board = Array(9).fill(null); // 3x3 board
let currentPlayer = 'X'; // 'X' always starts
let gameActive = true;
let vsComputer = false; // false: PvP, true: PvC
let playerWins = 0;
let robotWins = 0;

// DOM elements
const boardDiv = document.getElementById('board');
const messageDiv = document.getElementById('message');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const resetBtn = document.getElementById('reset');
const pvpBtn = document.getElementById('pvp');
const pvcBtn = document.getElementById('pvc');

// Winning combinations (indices)
const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
];

// Initialize the game board UI
function renderBoard() {
    boardDiv.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.dataset.idx = idx;
        cellDiv.textContent = cell ? cell : '';
        cellDiv.addEventListener('click', handleCellClick);
        boardDiv.appendChild(cellDiv);
    });
}

// Handle cell click event
function handleCellClick(e) {
    const idx = +e.target.dataset.idx;
    if (!gameActive || board[idx]) return; // Ignore if game over or cell filled
    board[idx] = currentPlayer;
    renderBoard();
    if (checkWin(currentPlayer)) {
        endGame(currentPlayer);
        return;
    }
    if (board.every(cell => cell)) {
        endGame(null); // Draw
        return;
    }
    // Switch player or let robot play
    if (vsComputer && currentPlayer === 'X') {
        currentPlayer = 'O';
        setTimeout(robotMove, 400); // Robot plays after short delay
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();
    }
}

// Robot (computer) move logic: random empty cell
function robotMove() {
    if (!gameActive) return;
    const emptyCells = board.map((cell, idx) => cell ? null : idx).filter(idx => idx !== null);
    if (emptyCells.length === 0) return;
    const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[move] = 'O';
    renderBoard();
    if (checkWin('O')) {
        endGame('O');
        return;
    }
    if (board.every(cell => cell)) {
        endGame(null); // Draw
        return;
    }
    currentPlayer = 'X';
    updateMessage();
}

// Check if player has won
function checkWin(player) {
    return winCombos.some(combo => combo.every(idx => board[idx] === player));
}

// End the game and update scores/messages
function endGame(winner) {
    gameActive = false;
    if (winner === 'X') {
        messageDiv.textContent = vsComputer ? 'You win!' : 'Player X wins!';
        playerWins++;
    } else if (winner === 'O') {
        messageDiv.textContent = vsComputer ? 'Robot wins!' : 'Player O wins!';
        robotWins++;
    } else {
        messageDiv.textContent = "It's a draw!";
    }
    updateScores();
}

// Update scoreboard display
function updateScores() {
    player1Score.textContent = vsComputer ? `You: ${playerWins}` : `Player X: ${playerWins}`;
    player2Score.textContent = vsComputer ? `Robot: ${robotWins}` : `Player O: ${robotWins}`;
}

// Update message display
function updateMessage() {
    if (!gameActive) return;
    if (vsComputer) {
        messageDiv.textContent = currentPlayer === 'X' ? 'Your turn' : "Robot's turn";
    } else {
        messageDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Reset the game board for a new round
function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    renderBoard();
    updateMessage();
}

// Set game mode (PvP or PvC)
function setMode(computer) {
    vsComputer = computer;
    playerWins = 0;
    robotWins = 0;
    updateScores();
    resetGame();
}

// Event listeners for mode selection and reset
pvpBtn.addEventListener('click', () => setMode(false));
pvcBtn.addEventListener('click', () => setMode(true));
resetBtn.addEventListener('click', resetGame);

// Initial setup
setMode(false); // Default to Player vs Player
