function Square( { index, value, onSquareClick, isWinningSquare, disabled }) {
    return (
        <button
            type="button"
            className={`square ${value ? `square-${value.toLowerCase()}` : ""} ${isWinningSquare ? "winning-square" : ""}`}
            onClick={onSquareClick}
            disabled={disabled}
            aria-label={`Square ${index + 1}${value ? `, containing ${value}` : ", Empty square"}`}
            aria-pressed={Boolean(value)}
        >
            {value}
        </button>
    );
}

export default Square;