export const WINNING_COMBINATIONS = [
    // Horizontal combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

  // Vertical combination
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

  // Diagonal combinations
    [0, 4, 8],
    [2, 4, 6]
];

// Check whether X or O has won
export function checkWinner(board) {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;

        if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
            return {
                winner: board[a], combination: combination
            };
        }
    }
    return null;
}

// Check whether the board is full
export function checkDraw(board) {
    return board.every((square) => square !== null);
}