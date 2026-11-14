import { checkWinner, checkDraw } from "./gameLogic";

// Default scoreboard
export const DEFAULT_SCORES = {
    player1: 0,
    player2: 0,
    computer: 0,
    draws: 0
};

// Safely read and parse information
export function readStorage(key) {
    try {
        const savedValue = localStorage.getItem(key);

        if (savedValue === null) {
            return null;
        }

        return JSON.parse(savedValue);

    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return null;
    }
}

// Safely save information
export function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Could not save ${key}:`, error);
    }
}

// Safely remove information
export function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Could not remove ${key}:`, error);
    }
}

// Restore an unfinished game
export function loadGameState() {
    const savedGame = readStorage("xo-game");

    if (!savedGame) {
        return null;
    }

    
    const validBoard =
        Array.isArray(savedGame.board) &&
        savedGame.board.length === 9 &&
        savedGame.board.every(
            (square) => {
                return (
                    square === null ||
                    square === "X" ||
                    square === "O"
                );
            }
        );


    const validTurn = 
        savedGame.currentSymbol === "X" ||
        savedGame.currentSymbol === "O";

    const validMode = 
        savedGame.gameMode === "two-player" ||
        savedGame.gameMode === "computer";
    
    const validPlayerSymbol = 
        savedGame.player1Symbol === "X" ||
        savedGame.player1Symbol === "O";

    if (!validBoard || !validTurn || !validMode || !validPlayerSymbol) {
        removeStorage("xo-game");
        return null;
    }
    
    if (checkWinner(savedGame.board) || checkDraw(savedGame.board)) {
        removeStorage("xo-game");
        return null;
    }
    
    return {
        board: savedGame.board,
        currentSymbol: savedGame.currentSymbol,
        gameMode: savedGame.gameMode,
        player1Symbol: savedGame.player1Symbol
    };
}

// Restore the scoreboard
export function loadScores() {
    const savedScores = readStorage("xo-scores");

    if (!savedScores || typeof savedScores !== "object") {
        return { ...DEFAULT_SCORES };
    }

    const scoreKeys = [
        "player1",
        "player2",
        "computer",
        "draws"
    ];

    const validScores = scoreKeys.every(
        (key) => 
            Number.isInteger(savedScores[key]) &&
            savedScores[key] >= 0
    );

    if (!validScores) {
        return { ...DEFAULT_SCORES };
    }

    return {
        player1: savedScores.player1,
        player2: savedScores.player2,
        computer: savedScores.computer,
        draws: savedScores.draws
    };
}

// Restore the selected theme
export function loadTheme() {
    const savedTheme = readStorage("xo-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }
    return "dark";
}

