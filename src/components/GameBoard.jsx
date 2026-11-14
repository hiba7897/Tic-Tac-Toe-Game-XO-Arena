import Square from "./Square";

function GameBoard( {board, onSquareClick, winningCombination, isBoardDisabled }) {
    return (
        <div 
            className="game-board"
            role="group"
            aria-label="Tic Tac Toe Game Board"
        >
                {board.map((value, index) => (
                    <Square 
                        key={index}
                        index={index}
                        value={value}
                        onSquareClick={() => onSquareClick(index)}
                        isWinningSquare={winningCombination.includes(index)}
                        disabled={isBoardDisabled || value !== null}
                    />
                ))}
        </div>
    );
}

export default GameBoard;