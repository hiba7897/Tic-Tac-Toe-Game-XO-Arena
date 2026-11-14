
import {
  useState,
  useEffect,
  useCallback
} from "react";

import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import GameModeSelector from "./components/GameModeSelector";
import PlayerSymbolSelector from "./components/PlayerSymbolSelector";
import Scoreboard from "./components/Scoreboard";
import GameControls from "./components/GameControls";
import ResetConfirmation from "./components/ResetConfirmation";
import ThemeToggle from "./components/ThemeToggle";

import {
  checkWinner,
  checkDraw
} from "./utils/gameLogic";

import { findBestMove } from "./utils/computerAI";

import {
  DEFAULT_SCORES,
  loadGameState,
  loadScores,
  loadTheme,
  writeStorage,
  removeStorage
} from "./utils/storage";

import "./App.css";

const initialBoard = [
  null, null, null,
  null, null, null,
  null, null, null
];

function App() {
  // Restore an unfinished game before initializing game state
  const [restoredGame] = useState(() => loadGameState());

  // Game state
  const [board, setBoard] = useState(
    () => restoredGame?.board ?? [...initialBoard]
  );

  const [currentSymbol, setCurrentSymbol] = useState(
    () => restoredGame?.currentSymbol ?? "X"
  );

  const [winner, setWinner] = useState(null);

  const [winningCombination, setWinningCombination] =
    useState([]);

  const [isDraw, setIsDraw] = useState(false);

  // Game settings
  const [gameMode, setGameMode] = useState(
    () => restoredGame?.gameMode ?? "two-player"
  );

  const [player1Symbol, setPlayer1Symbol] = useState(
    () => restoredGame?.player1Symbol ?? "X"
  );

  // Other game state
  const [isGameActive, setIsGameActive] = useState(
    () => Boolean(restoredGame)
  );

  const [scores, setScores] = useState(() => loadScores());

  const [theme, setTheme] = useState(() => loadTheme());

  const [showResetConfirmation, setShowResetConfirmation] =
    useState(false);

  // Calculate the other participant's symbol
  const otherSymbol =
    player1Symbol === "X" ? "O" : "X";

  const computerSymbol = otherSymbol;

  // Identify whose turn it is
  const currentParticipant =
    gameMode === "two-player"
      ? currentSymbol === player1Symbol
        ? "Player 1"
        : "Player 2"
      : currentSymbol === player1Symbol
        ? "You"
        : "Computer";

  // Check whether it is the computer's turn
  const isComputerTurn =
    gameMode === "computer" &&
    currentSymbol === computerSymbol;

  // Save unfinished game
  useEffect(() => {
    if (!isGameActive || winner || isDraw) {
      removeStorage("xo-game");
      return;
    }

    const gameToSave = {
      board,
      currentSymbol,
      gameMode,
      player1Symbol
    };

    writeStorage("xo-game", gameToSave);

  }, [
    board,
    currentSymbol,
    gameMode,
    player1Symbol,
    isGameActive,
    winner,
    isDraw
  ]);

  // Save scores
  useEffect(() => {
    writeStorage("xo-scores", scores);
  }, [scores]);

  // Save theme
  useEffect(() => {
    writeStorage("xo-theme", theme);
  }, [theme]);

  // Reset the current round only
  function resetRound() {
    setBoard([...initialBoard]);
    setCurrentSymbol("X");
    setWinner(null);
    setWinningCombination([]);
    setIsDraw(false);
  }

  // Finish a round and update the correct score
  const finishRound = useCallback((finalBoard) => {
    const result = checkWinner(finalBoard);

    if (result) {
      setWinner(result.winner);
      setWinningCombination(result.combination);

      let scoreCategory;

      if (result.winner === player1Symbol) {
        scoreCategory = "player1";
      } else if (gameMode === "two-player") {
        scoreCategory = "player2";
      } else {
        scoreCategory = "computer";
      }

      setScores((previousScores) => ({
        ...previousScores,
        [scoreCategory]: previousScores[scoreCategory] + 1
      }));

      setIsGameActive(false);
      removeStorage("xo-game");

      return true;
    }

    if (checkDraw(finalBoard)) {
      setIsDraw(true);

      setScores((previousScores) => ({
        ...previousScores,
        draws: previousScores.draws + 1
      }));

      setIsGameActive(false);
      removeStorage("xo-game");

      return true;
    }

    return false;

  }, [gameMode, player1Symbol]);

  // Handle a human player's move
  function handleSquareClick(index) {
    if (winner || isDraw) {
      return;
    }

    if (board[index] !== null) {
      return;
    }

    if (isComputerTurn) {
      return;
    }

    setIsGameActive(true);

    const nextBoard = [...board];
    nextBoard[index] = currentSymbol;

    setBoard(nextBoard);

    const roundFinished = finishRound(nextBoard);

    if (roundFinished) {
      return;
    }

    setCurrentSymbol(
      currentSymbol === "X" ? "O" : "X"
    );
  }

  // Handle the computer's move
  useEffect(() => {
    if (!isComputerTurn || winner || isDraw) {
      return;
    }

    const timer = setTimeout(() => {
      const bestMove = findBestMove(
        [...board],
        computerSymbol
      );

      if (bestMove === null) {
        return;
      }

      const nextBoard = [...board];
      nextBoard[bestMove] = computerSymbol;

      setIsGameActive(true);
      setBoard(nextBoard);

      const roundFinished = finishRound(nextBoard);

      if (roundFinished) {
        return;
      }

      setCurrentSymbol(
        computerSymbol === "X" ? "O" : "X"
      );

    }, 500);

    return () => clearTimeout(timer);

  }, [
    isComputerTurn,
    winner,
    isDraw,
    board,
    computerSymbol,
    finishRound
  ]);

  // Change game mode
  function handleModeChange(newMode) {
    setGameMode(newMode);
    resetRound();
    setIsGameActive(true);
  }

  // Change Player 1's symbol
  function handleSymbolChange(newSymbol) {
    setPlayer1Symbol(newSymbol);
    resetRound();
    setIsGameActive(true);
  }

  // Play another round without clearing scores
  function handlePlayAgain() {
    resetRound();
    setIsGameActive(false);
    removeStorage("xo-game");
  }

  // Open reset confirmation
  function handleResetScores() {
    setShowResetConfirmation(true);
  }

  // Confirm reset
  function confirmResetScores() {
    setScores({ ...DEFAULT_SCORES });

    resetRound();

    setIsGameActive(false);
    removeStorage("xo-game");

    setShowResetConfirmation(false);
  }

  // Cancel reset
  function cancelResetScores() {
    setShowResetConfirmation(false);
  }

  // Change theme
  function handleThemeToggle() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  return (
    <main className={`app ${theme}`}>
      <ThemeToggle
        theme={theme}
        onToggle={handleThemeToggle}
      />

      <h1>XO Arena</h1>

      <p>Choose your game mode</p>

      <GameModeSelector
        gameMode={gameMode}
        onModeChange={handleModeChange}
      />

      <PlayerSymbolSelector
        selectedSymbol={player1Symbol}
        onSymbolChange={handleSymbolChange}
        playerLabel={
          gameMode === "computer" ? "You" : "Player 1"
        }
      />

      <GameStatus
        currentSymbol={currentSymbol}
        currentParticipant={currentParticipant}
        winner={winner}
        isDraw={isDraw}
        player1Symbol={player1Symbol}
        gameMode={gameMode}
        isComputerTurn={isComputerTurn}
      />

      <GameBoard
        board={board}
        onSquareClick={handleSquareClick}
        winningCombination={winningCombination}
        isBoardDisabled={
          Boolean(winner) || isDraw || isComputerTurn
        }
      />

      <Scoreboard
        scores={scores}
        gameMode={gameMode}
      />

      <GameControls
        onPlayAgain={handlePlayAgain}
        onResetScores={handleResetScores}
      />

      {showResetConfirmation && (
        <ResetConfirmation
          onConfirm={confirmResetScores}
          onCancel={cancelResetScores}
        />
      )}
    </main>
  );
}

export default App;
