const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
    });
    message.innerText = '';
    currentPlayer = 'X';
    gameActive = true;
}

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.innerText !== '') return;

    makeMove(cell, currentPlayer);

    if (checkEndGame()) return;

    currentPlayer = 'O';
    setTimeout(computerMove, 500); // Delay to mimic thinking
}

function makeMove(cell, player) {
    cell.innerText = player;
    cell.classList.add(player.toLowerCase());
}

function computerMove() {
    if (!gameActive) return;

    const emptyCells = [...cells].filter(cell => cell.innerText === '');
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomCell, currentPlayer);

    if (checkEndGame()) return;

    currentPlayer = 'X';
}

function checkEndGame() {
    if (checkWin(currentPlayer)) {
        message.innerText = `${currentPlayer} Wins!`;
        gameActive = false;
        return true;
    }

    if (isDraw()) {
        message.innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.innerText !== '');
}

restartButton.addEventListener('click', startGame);

// Start game on load
startGame();
