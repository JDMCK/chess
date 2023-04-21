import { useState } from 'react';
import Square from './Square';
import handleShowMoves from "./handlers/handleShowMoves";

const Board = ({ board: BOARD }) => {

  const [board, setBoard] = useState(BOARD);
  const [isHighlighted, setIsHighlighted] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState({});
  const [isWhiteToMove, setIsWhiteToMove] = useState(true);

  const handleMove = (from, to) => {
    let newBoard = [...board];
    let piece = newBoard[from.y][from.x];
    newBoard[from.y][from.x] = 'x';
    newBoard[to.y][to.x] = piece;
    setBoard(newBoard);
    setIsWhiteToMove((previous) => !previous);
    setIsHighlighted([]);
  }

  return (
    <div id="board">
      {board.map((row, y) => row.map((piece, x) =>
        <Square
          key={x + y * 8}
          className={`square r${y + 1} c${x + 1} ${(x + y) % 2 === 0 ? 'dark' : 'light'}`}
          coordinate={{ x, y }}
          piece={piece}
          handleShowMoves={() => handleShowMoves({ x, y }, board, isWhiteToMove, setIsHighlighted, setSelectedPiece)}
          handleMove={() => handleMove(selectedPiece, { x, y })}
          isHighlighted={isHighlighted?.some((coordinate) => coordinate.x === x && coordinate.y === y)} />
      ))}
      <p>{isWhiteToMove ? 'White' : 'Black'} to move</p>
      <button onClick={() => console.log('nope lol')}>UNDO</button>
    </div>
  );
}

export default Board;