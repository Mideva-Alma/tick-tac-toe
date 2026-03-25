// script.js - Main game logic for Tic Tac Toe
// Supports Player vs Player and Player vs Computer modes
// Tracks wins for both players

// --- Game state variables ---
// gridSize: Current board size (3, 4, or 6)
// board: Array representing the board cells
// currentPlayer: 'X' or 'O'
// gameActive: Is the game ongoing?
// vsComputer: true if playing against robot
// playerWins, robotWins: Win counters
// consecutiveWins: Track player's win streak for level-up
// unlockedLevel: Highest unlocked difficulty
let gridSize = 3; // Default grid size
let board = Array(gridSize * gridSize).fill(null);
let currentPlayer = 'X'; // 'X' always starts
let gameActive = true;
let vsComputer = false; // false: PvP, true: PvC
let playerWins = 0;
let robotWins = 0;
let consecutiveWins = 0;
let unlockedLevel = 'beginner'; // beginner, medium, hard

// --- DOM elements ---
// Get references to all interactive elements
const boardDiv = document.getElementById('board');
const messageDiv = document.getElementById('message');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const resetBtn = document.getElementById('reset');
const pvpBtn = document.getElementById('pvp');
const pvcBtn = document.getElementById('pvc');
const difficultySelect = document.getElementById('difficulty');


// --- Generate winning combinations for any grid size ---
// Returns all possible win lines (rows, columns, diagonals) for a given grid size
function getWinCombos(size) {
    const combos = [];
    // Rows
    for (let r = 0; r < size; r++) {
        combos.push([...Array(size)].map((_, i) => r * size + i));
    }
    // Columns
    for (let c = 0; c < size; c++) {
        combos.push([...Array(size)].map((_, i) => c + i * size));
    }
    // Diagonal TL-BR
    combos.push([...Array(size)].map((_, i) => i * (size + 1)));
    // Diagonal TR-BL
    combos.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));
    return combos;
}
let winCombos = getWinCombos(gridSize);

// --- Render the game board UI ---
// Dynamically creates the board grid and attaches click handlers
function renderBoard() {
    boardDiv.innerHTML = '';
    boardDiv.className = `board size-${gridSize}`;
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.dataset.idx = idx;
        cellDiv.textContent = cell ? cell : '';
        cellDiv.addEventListener('click', handleCellClick);
        boardDiv.appendChild(cellDiv);
    });
}

// --- Handle cell click event ---
// Handles a player's move, checks for win/draw, and triggers robot if needed
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

// --- Robot (computer) move logic: random empty cell ---
// Robot picks a random empty cell and plays as 'O'
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

// --- Check if player has won ---
// Returns true if the player has a winning line
function checkWin(player) {
    return winCombos.some(combo => combo.every(idx => board[idx] === player));
}

// --- End the game and update scores/messages ---
// Updates win counters, messages, and checks for level-up
function endGame(winner) {
    gameActive = false;
    if (winner === 'X') {
        messageDiv.textContent = vsComputer ? 'You win!' : 'Player X wins!';
        playerWins++;
        consecutiveWins++;
        checkLevelUp();
    } else if (winner === 'O') {
        messageDiv.textContent = vsComputer ? 'Robot wins!' : 'Player O wins!';
        robotWins++;
        consecutiveWins = 0;
    } else {
        messageDiv.textContent = "It's a draw!";
        consecutiveWins = 0;
    }
    updateScores();
}

// --- Update scoreboard display ---
function updateScores() {
    player1Score.textContent = vsComputer ? `You: ${playerWins}` : `Player X: ${playerWins}`;
    player2Score.textContent = vsComputer ? `Robot: ${robotWins}` : `Player O: ${robotWins}`;
}

// --- Update message display ---
function updateMessage() {
    if (!gameActive) return;
    if (vsComputer) {
        messageDiv.textContent = currentPlayer === 'X' ? 'Your turn' : "Robot's turn";
    } else {
        messageDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// --- Reset the game board for a new round ---
function resetGame() {
    board = Array(gridSize * gridSize).fill(null);
    winCombos = getWinCombos(gridSize);
    gameActive = true;
    currentPlayer = 'X';
    renderBoard();
    updateMessage();
}

// --- Set game mode (PvP or PvC) ---
function setMode(computer) {
    vsComputer = computer;
    playerWins = 0;
    robotWins = 0;
    consecutiveWins = 0;
    updateScores();
    resetGame();
}

// --- Set difficulty and grid size ---
function setDifficulty(level) {
    if (level === 'beginner') gridSize = 3;
    else if (level === 'medium') gridSize = 4;
    else if (level === 'hard') gridSize = 6;
    resetGame();
}

// --- Check if player can level up ---
function checkLevelUp() {
    if (consecutiveWins >= 5) {
        if (unlockedLevel === 'beginner') {
            unlockedLevel = 'medium';
            difficultySelect.querySelector('option[value="medium"]').disabled = false;
            alert('Medium level unlocked!');
        } else if (unlockedLevel === 'medium') {
            unlockedLevel = 'hard';
            difficultySelect.querySelector('option[value="hard"]').disabled = false;
            alert('Hard level unlocked!');
        }
        consecutiveWins = 0;
    }
}

// --- Event listeners for mode selection and reset ---
pvpBtn.addEventListener('click', () => setMode(false));
pvcBtn.addEventListener('click', () => setMode(true));
resetBtn.addEventListener('click', resetGame);
difficultySelect.addEventListener('change', (e) => {
    if (e.target.value === 'medium' && unlockedLevel === 'beginner') {
        alert('Win 5 times in Beginner to unlock Medium!');
        difficultySelect.value = 'beginner';
        return;
    }
    if (e.target.value === 'hard' && unlockedLevel !== 'hard') {
        alert('Win 5 times in Medium to unlock Hard!');
        difficultySelect.value = unlockedLevel;
        return;
    }
    setDifficulty(e.target.value);
});

// --- Disable locked levels on load ---
function lockLevels() {
    difficultySelect.querySelector('option[value="medium"]').disabled = true;
    difficultySelect.querySelector('option[value="hard"]').disabled = true;
}

// --- Initial setup ---
lockLevels();
setMode(false); // Default to Player vs Player
setDifficulty('beginner');
