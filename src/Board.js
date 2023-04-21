import { useEffect, useState } from 'react';
import Square from './Square';
import handleShowMoves from "./handlers/handleShowMoves";

const Board = ({ board: BOARD }) => {

  // Keeps track of all boards
  const [boardHistory, setBoardHistory] = useState([BOARD]);
  // Current board (if move is made when in the past, future is overwritten)
  const [historyIndex, setHistoryIndex] = useState(0);

  const [selectedPiece, setSelectedPiece] = useState({});
  const [isHighlighted, setIsHighlighted] = useState([]);
  const [isWhiteToMove, setIsWhiteToMove] = useState(true);

  const [isFlipLock, setIsFlipLock] = useState(true);
  const [flipBoard, setFlipBoard] = useState(false);

  const handleMove = (from, to) => {
    // Slices future boards (if any)
    setBoardHistory(history => history.slice(0, historyIndex + 1))

    // Deep copies board
    let newBoard = JSON.parse(JSON.stringify(boardHistory[historyIndex]));

    // Moves piece
    let piece = newBoard[from.y][from.x];
    newBoard[from.y][from.x] = 'x';
    newBoard[to.y][to.x] = piece;

    // Adds next board to history
    setBoardHistory(boardHistory => boardHistory.concat([JSON.parse(JSON.stringify(newBoard))]));
    setHistoryIndex(previousIndex => previousIndex + 1);

    // Preps next move
    setIsWhiteToMove((previous) => !previous);
    setIsHighlighted([]);
  }

  useEffect(() => {
    setIsWhiteToMove(historyIndex % 2 === 0);
    handleFlipBoard();
  }, [historyIndex, isFlipLock]);

  const handleFlipBoard = () => {
    if (!isFlipLock) setFlipBoard(!isWhiteToMove);
  }

  const handleUndo = () => {
    setHistoryIndex(previousIndex => previousIndex > 0 ? previousIndex - 1 : previousIndex);
  }

  const handleRedo = () => {
    setHistoryIndex(previousIndex => previousIndex < boardHistory.length - 1 ? previousIndex + 1 : previousIndex);
  }

  return (
    <div id="board">
      {boardHistory[historyIndex].map((row, y) => row.map((piece, x) =>
        <Square
          key={x + y * 8}
          className={`square r${y + 1} c${x + 1} ${(x + y) % 2 === 0 ? 'dark' : 'light'} ${flipBoard ? 'flip' : ''}`}
          coordinate={{ x, y }}
          piece={piece}
          handleShowMoves={() => handleShowMoves({ x, y }, boardHistory[historyIndex], isWhiteToMove, setIsHighlighted, setSelectedPiece)}
          handleMove={() => handleMove(selectedPiece, { x, y })}
          isHighlighted={isHighlighted?.some((coordinate) => coordinate.x === x && coordinate.y === y)} />
      ))}
      <p>{isWhiteToMove ? 'White' : 'Black'} to move</p>
      <button onClick={handleUndo}>Back</button>
      <button onClick={handleRedo}>Forward</button>
      <button onClick={() => setIsFlipLock(previous => !previous)}>Flip Lock</button>
    </div>
  );
}

export default Board;