function Scoreboard({ scores, gameMode }) {
    return (
        <section className="scoreboard">
            <h2>Scoreboard</h2>
            <div className="scoreboard-grid">
                <div className="score-card">
                    <h3>{gameMode === "computer" ? "You": "Player 1"}</h3>
                    <p>{scores.player1}</p>
                </div>
                {gameMode === "two-player" ? (
                    <div className="score-card">
                        <h3>Player 2</h3>
                        <p>{scores.player2}</p>
                    </div>
                ): (
                    <div className="score-card">
                        <h3>Computer</h3>
                        <p>{scores.computer}</p>
                    </div>
                )}

                <div className="score-card">
                    <h3>Draws</h3>
                    <p>{scores.draws}</p>
                </div>
            </div>
        </section>
    );
}

export default Scoreboard;