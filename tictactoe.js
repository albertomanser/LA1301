class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
    }

    makeMove(index) {
        if (this.gameOver || this.board[index]) return;
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.checkForWinner();
    }

    checkForWinner() {
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.gameOver = true;
                alert(`${this.currentPlayer === 'X' ? 'O' : 'X'} wins!`);
            }
        }
    }

    isBoardFull() {
        return this.board.every(cell => cell !== null);
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.renderBoard();
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        this.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => this.cellClick(index));
            boardElement.appendChild(cellElement);
        });
    }

    cellClick(index) {
        this.makeMove(index);
        this.renderBoard();

        if (!this.gameOver && this.isBoardFull()) {
            this.gameOver = true;
            alert('It\'s a draw!');
        }
    }
}

const game = new TicTacToe();
game.renderBoard();

const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', () => {
    game.resetGame();
});
