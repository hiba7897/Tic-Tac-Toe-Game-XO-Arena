// currentPlayer: The symbol whose turn it is.
// winner: 	The winning symbol, if one exists.
// isDraw:	Whether the game ended in a draw.

function GameStatus({ currentSymbol, winner, isDraw, currentParticipant, player1Symbol, gameMode, isComputerTurn }) {
    let message;
    
    if (winner) {
        const winnerName = winner === player1Symbol 
        ? gameMode === "computer" 
            ? "You"
            : "Player 1"
        : gameMode === "computer"
            ? "Computer"
            : "Player 2";
        message = `${winnerName} wins as ${winner}!`;

    } else if (isDraw) {
        message = "It's a draw!";
    } else if (isComputerTurn) {
        message = "Computer is thinking ...";
    } else {
        message = `${currentParticipant}'s turn (${currentSymbol})`;
    }

    return (
        <div 
            className="game-status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            <h2>{message}</h2>
        </div>
    );
}

export default GameStatus;