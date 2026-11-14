function GameControls({ onPlayAgain, onResetScores }) {
    return (
        <div className="game-controls">
            <button
                className="play-again-button"
                onClick={onPlayAgain}
            >Play Again
            </button>

            <button
                className="reset-scores-button"
                onClick={onResetScores}
            >
            Reset Scores
            </button>
        </div>
    );
}

export default GameControls;