const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const turnDisplay = document.getElementById('turn');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

let currentPlayer = 'X';  // X always starts
let board = ['', '', '', '', '', '', '', '', ''];  // Board state

// Score tracking
let scoreX = 0;
let scoreO = 0;

// Initialize game board
function initializeBoard() {
  gameBoard.innerHTML = '';  // Clear board

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle a click on a cell
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] !== '') return;  // If cell already has a value, don't allow further clicks

  // Set the cell value to current player's symbol
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a win or draw
  if (checkWinner()) {
    updateScore(currentPlayer);
    turnDisplay.textContent = `${currentPlayer} wins!`;
    gameBoard.removeEventListener('click', handleCellClick);  // Disable further moves
  } else if (board.every(cell => cell !== '')) {
    turnDisplay.textContent = 'It\'s a draw!';
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check if a player has won
function checkWinner() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombination.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Update the score when a player wins
function updateScore(winner) {
  if (winner === 'X') {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
  } else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  initializeBoard();
  gameBoard.addEventListener('click', handleCellClick);  // Re-enable clicks after reset
});

// Start the game
initializeBoard();
