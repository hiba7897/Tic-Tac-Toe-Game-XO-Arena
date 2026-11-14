import {checkWinner, checkDraw} from "./gameLogic";

function getOppositeSymbol(symbol) {
    return symbol === "X" ? "O" : "X";
}

function minimax(board, currentTurn, aiSymbol, humanSymbol, depth) {
    // Check whether the game has a winner
    const result = checkWinner(board);

    if (result) {
        if (result.winner === aiSymbol) {
            return 10 - depth;
        }

        if (result.winner === humanSymbol) {
            return depth - 10;
        }
    }

    // Check whether the game is a draw
    if (checkDraw(board)) {
        return 0;
    }

     // Determine whether the computer is maximizing.
    const isMaximizing = currentTurn === aiSymbol;

    let bestScore = isMaximizing ? -Infinity : Infinity;

    // Examine every empty square
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            // Simulate a move
            board[i] = currentTurn;

            // Evaluate the resulting position
            const score = minimax(board, getOppositeSymbol(currentTurn), aiSymbol, humanSymbol, depth + 1);

            board[i] = null;

            // Keep the best score
            if (isMaximizing) {
                bestScore = Math.max(bestScore, score);
            } else {
                bestScore = Math.min(bestScore, score);
            }
        }
    }

    return bestScore;
}

/* humanSymbol	The symbol belonging to the human.
bestScore	Stores the best score found so far.
bestMove	Stores the position the computer should select. */ 

export function findBestMove(board, aiSymbol) {
    const humanSymbol = getOppositeSymbol(aiSymbol);

    let bestScore = -Infinity;
    let bestMove = null;

    // Examine every empty square
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            // Simulate the computer's move
            board[i] = aiSymbol;

            // Evaluate the move
            const score = minimax(board, humanSymbol, aiSymbol, humanSymbol, 1);

            // Undo the simulated move
            board[i] = null;

            // Save the best move
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

