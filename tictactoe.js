let currentPlayer = 'X';
let gameOver = false;
let gameMode = '2-player'; // Default to 2-player mode

function makeMove(cell) {
    if (!cell.textContent && !gameOver) {
        cell.textContent = currentPlayer;
        cell.classList.add('selected');
        gameOver = checkWinner();
        if (!gameOver) {
            if (gameMode === '2-player') {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            } else if (gameMode === 'bot') {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (currentPlayer === 'O') {
                    makeBotMove();
                }
            }
        }
    }
}

function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            document.getElementById('winner').textContent = `Player ${currentPlayer} wins!`;
            return true;
        }
    }

    if ([...cells].every((cell) => cell.textContent)) {
        document.getElementById('winner').textContent = "It's a draw!";
        return true;
    }

    return false;
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    
    // Reset cell content and styling
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('selected');
    });

    // Reset the winner message
    document.getElementById('winner').textContent = '';

    // Reset game state
    currentPlayer = 'X';
    gameOver = false;
}

function startTwoPlayerGame() {
    gameMode = '2-player';
    resetGame();
}

function startBotGame() {
    gameMode = 'bot';
    resetGame();
}

function makeBotMove() {
    const emptyCells = Array.from(document.querySelectorAll('.cell')).filter(cell => !cell.textContent);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botCell = emptyCells[randomIndex];
        setTimeout(() => makeMove(botCell), 500); // Delay the bot's move for better user experience
    }
}
