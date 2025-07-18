const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cells;
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6]  // diagonals
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
  cells = document.querySelectorAll('.cell');
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] &&
           gameState[a] === gameState[b] &&
           gameState[a] === gameState[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = Array(9).fill('');
  statusText.textContent = "Player X's turn";
  createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Initialize on load
createBoard();
