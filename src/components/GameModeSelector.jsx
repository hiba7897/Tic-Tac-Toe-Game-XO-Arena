// gameMode:	Tells the component which mode is currently selected.
// onModeChange:	Function that changes the selected mode.

function GameModeSelector({ gameMode, onModeChange }) {
    return (
        <div className="game-mode-selector">
            <button
                type="button"
                className={gameMode === "two-player" ? "active" : ""}
                onClick={() => onModeChange("two-player")}
                aria-pressed={gameMode === "two-player"}
            >
                2 Players
            </button>
            <button
                type="button"
                className={gameMode === "computer" ? "active" : ""}
                onClick={() => onModeChange("computer")}
                aria-pressed={gameMode === "computer"}
            >
                Vs Computer
            </button>
        </div>
    );
}

export default GameModeSelector;