// selectedSymbol:	Stores the currently selected symbol.
// onSymbolChange:	Changes the selected symbol.
// playerLabel:	Displays who is choosing: Player 1 or You.

function PlayerSymbolSelector({ selectedSymbol, onSymbolChange, playerLabel }) {
    return (
        <div className="symbol-selector">
            <h3>{playerLabel}, choose your symbol</h3>
            <div className="symbol-options">
                <button 
                    type="button"
                    className={selectedSymbol === "X" ? "active": ""}
                    onClick={() => onSymbolChange("X")}
                    aria-pressed={selectedSymbol === "X"}
                >
                    X
                </button>
                <button
                    type="button"
                    className={selectedSymbol === "O" ? "active" : ""}
                    onClick={() => onSymbolChange("O")}
                    aria-pressed={selectedSymbol === "O"}
                >
                    O
                </button>
            </div>
        </div>
    );
}

export default PlayerSymbolSelector