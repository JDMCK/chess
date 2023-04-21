const BLACK = 'RNBKQP';
const WHITE = 'rnbkqp';

const isOk = (board, x, y) => {
  try { return board[y][x] !== undefined; } catch (e) { return false; }
}

const showMoves = (coordinate, board, isWhiteToMove, setIsHighlighted, setSelectedPiece) => {

  const piece = board[coordinate.y][coordinate.x];
  const isWhite = piece === piece.toLowerCase();
  setSelectedPiece(coordinate);

  switch (piece.toLowerCase()) {
    case 'k':
      setIsHighlighted(kingMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    case 'q':
      setIsHighlighted(queenMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    case 'r':
      setIsHighlighted(rookMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    case 'b':
      setIsHighlighted(bishopMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    case 'n':
      setIsHighlighted(knightMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    case 'p':
      setIsHighlighted(pawnMoves(coordinate, board, isWhite, isWhiteToMove));
      break;
    default:
      console.log('Cannot move from this square.');
      break;
  }
}

const kingMoves = ({ x, y }, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (isOk(board, x + j, y + i)) {
          if (board[y + i][x + j] === 'x' || BLACK.includes(board[y + i][x + j])) squaresToHighlight.push({ x: x + j, y: y + i });
        }
      }
    }
  } else if (!isWhite && !isWhiteToMove) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (isOk(board, x + j, y + i)) {
          if (board[y + i][x + j] === 'x' || WHITE.includes(board[y + i][x + j])) squaresToHighlight.push({ x: x + j, y: y + i });
        }
      }
    }
  }
  return squaresToHighlight;
}

const queenMoves = (coordinate, board, isWhite, isWhiteToMove) => {
  return rookMoves(coordinate, board, isWhite, isWhiteToMove).concat(
    bishopMoves(coordinate, board, isWhite, isWhiteToMove)
  )
}

const rookMoves = ({ x, y }, board, isWhite, isWhiteToMove) => {
  const squaresToHighlight = [];

  if (isWhite && isWhiteToMove) {
    // Check up
    for (let i = y - 1; i >= 0; i--) {
      if (board[i][x] === 'x') squaresToHighlight.push({ x, y: i });
      if (WHITE.includes(board[i][x])) break;
      if (BLACK.includes(board[i][x])) {
        squaresToHighlight.push({ x, y: i });
        break;
      }
    }
    // Check down
    for (let i = y + 1; i < 8; i++) {
      if (board[i][x] === 'x') squaresToHighlight.push({ x, y: i });
      if (WHITE.includes(board[i][x])) break;
      if (BLACK.includes(board[i][x])) {
        squaresToHighlight.push({ x, y: i });
        break;
      }
    }
    // Check left
    for (let i = x - 1; i >= 0; i--) {
      if (board[y][i] === 'x') squaresToHighlight.push({ x: i, y });
      if (WHITE.includes(board[y][i])) break;
      if (BLACK.includes(board[y][i])) {
        squaresToHighlight.push({ x: i, y });
        break;
      }
    }
    // Check right
    for (let i = x + 1; i < 8; i++) {
      if (board[y][i] === 'x') squaresToHighlight.push({ x: i, y });
      if (WHITE.includes(board[y][i])) break;
      if (BLACK.includes(board[y][i])) {
        squaresToHighlight.push({ x: i, y });
        break;
      }
    }
  } else if (!isWhite && !isWhiteToMove) {
    // Check up
    for (let i = y - 1; i >= 0; i--) {
      if (board[i][x] === 'x') squaresToHighlight.push({ x, y: i });
      if (BLACK.includes(board[i][x])) break;
      if (WHITE.includes(board[i][x])) {
        squaresToHighlight.push({ x, y: i });
        break;
      }
    }
    // Check down
    for (let i = y + 1; i < 8; i++) {
      if (board[i][x] === 'x') squaresToHighlight.push({ x, y: i });
      if (BLACK.includes(board[i][x])) break;
      if (WHITE.includes(board[i][x])) {
        squaresToHighlight.push({ x, y: i });
        break;
      }
    }
    // Check left
    for (let i = x - 1; i >= 0; i--) {
      if (board[y][i] === 'x') squaresToHighlight.push({ x: i, y });
      if (BLACK.includes(board[y][i])) break;
      if (WHITE.includes(board[y][i])) {
        squaresToHighlight.push({ x: i, y });
        break;
      }
    }
    // Check right
    for (let i = x + 1; i < 8; i++) {
      if (board[y][i] === 'x') squaresToHighlight.push({ x: i, y });
      if (BLACK.includes(board[y][i])) break;
      if (WHITE.includes(board[y][i])) {
        squaresToHighlight.push({ x: i, y });
        break;
      }
    }
  }
  return squaresToHighlight;
}

const bishopMoves = ({ x, y }, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x + i, y + i)) {
        if (board[y + i][x + i] === 'x') squaresToHighlight.push({ x: x + i, y: y + i });
        if (BLACK.includes(board[y + i][x + i])) {
          squaresToHighlight.push({ x: x + i, y: y + i });
          break;
        }
        if (WHITE.includes(board[y + i][x + i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x - i, y + i)) {
        if (board[y + i][x - i] === 'x') squaresToHighlight.push({ x: x - i, y: y + i });
        if (BLACK.includes(board[y + i][x - i])) {
          squaresToHighlight.push({ x: x - i, y: y + i });
          break;
        }
        if (WHITE.includes(board[y + i][x - i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x - i, y - i)) {
        if (board[y - i][x - i] === 'x') squaresToHighlight.push({ x: x - i, y: y - i });
        if (BLACK.includes(board[y - i][x - i])) {
          squaresToHighlight.push({ x: x - i, y: y - i });
          break;
        }
        if (WHITE.includes(board[y - i][x - i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x + i, y - i)) {
        if (board[y - i][x + i] === 'x') squaresToHighlight.push({ x: x + i, y: y - i });
        if (BLACK.includes(board[y - i][x + i])) {
          squaresToHighlight.push({ x: x + i, y: y - i });
          break;
        }
        if (WHITE.includes(board[y - i][x + i])) break;
      }
    }
  } else if (!isWhite && !isWhiteToMove) {
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x + i, y + i)) {
        if (board[y + i][x + i] === 'x') squaresToHighlight.push({ x: x + i, y: y + i });
        if (WHITE.includes(board[y + i][x + i])) {
          squaresToHighlight.push({ x: x + i, y: y + i });
          break;
        }
        if (BLACK.includes(board[y + i][x + i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x - i, y + i)) {
        if (board[y + i][x - i] === 'x') squaresToHighlight.push({ x: x - i, y: y + i });
        if (WHITE.includes(board[y + i][x - i])) {
          squaresToHighlight.push({ x: x - i, y: y + i });
          break;
        }
        if (BLACK.includes(board[y + i][x - i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x - i, y - i)) {
        if (board[y - i][x - i] === 'x') squaresToHighlight.push({ x: x - i, y: y - i });
        if (WHITE.includes(board[y - i][x - i])) {
          squaresToHighlight.push({ x: x - i, y: y - i });
          break;
        }
        if (BLACK.includes(board[y - i][x - i])) break;
      }
    }
    for (let i = 1; i < 8; i++) {
      if (isOk(board, x + i, y - i)) {
        if (board[y - i][x + i] === 'x') squaresToHighlight.push({ x: x + i, y: y - i });
        if (WHITE.includes(board[y - i][x + i])) {
          squaresToHighlight.push({ x: x + i, y: y - i });
          break;
        }
        if (BLACK.includes(board[y - i][x + i])) break;
      }
    }
  }
  return squaresToHighlight;
}

const knightMoves = ({ x, y }, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  let spot;
  if (isWhite && isWhiteToMove) {
    // Horizontal
    if (isOk(board, x + 2, y + 1)) {
      spot = board[y + 1][x + 2];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x + 2, y: y + 1 });
    }
    if (isOk(board, x - 2, y + 1)) {
      spot = board[y + 1][x - 2];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x - 2, y: y + 1 });
    }
    if (isOk(board, x - 2, y - 1)) {
      spot = board[y - 1][x - 2];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x - 2, y: y - 1 });
    }
    if (isOk(board, x + 2, y - 1)) {
      spot = board[y - 1][x - 2];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x + 2, y: y - 1 });
    }
    // Vertical
    if (isOk(board, x + 1, y + 2)) {
      spot = board[y + 2][x + 1];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x + 1, y: y + 2 });
    }
    if (isOk(board, x - 1, y + 2)) {
      spot = board[y + 2][x - 1];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x - 1, y: y + 2 });
    }
    if (isOk(board, x - 1, y - 2)) {
      spot = board[y - 2][x - 1];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x - 1, y: y - 2 });
    }
    if (isOk(board, x + 1, y - 2)) {
      spot = board[y - 2][x + 1];
      if (spot === 'x' || BLACK.includes(spot)) squaresToHighlight.push({ x: x + 1, y: y - 2 });
    }
  } else if (!isWhite && !isWhiteToMove) {
    // Horizontal
    if (isOk(board, x + 2, y + 1)) {
      spot = board[y + 1][x + 2];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x + 2, y: y + 1 });
    }
    if (isOk(board, x - 2, y + 1)) {
      spot = board[y + 1][x - 2];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x - 2, y: y + 1 });
    }
    if (isOk(board, x - 2, y - 1)) {
      spot = board[y - 1][x - 2];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x - 2, y: y - 1 });
    }
    if (isOk(board, x + 2, y - 1)) {
      spot = board[y - 1][x - 2];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x + 2, y: y - 1 });
    }
    // Vertical
    if (isOk(board, x + 1, y + 2)) {
      spot = board[y + 2][x + 1];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x + 1, y: y + 2 });
    }
    if (isOk(board, x - 1, y + 2)) {
      spot = board[y + 2][x - 1];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x - 1, y: y + 2 });
    }
    if (isOk(board, x - 1, y - 2)) {
      spot = board[y - 2][x - 1];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x - 1, y: y - 2 });
    }
    if (isOk(board, x + 1, y - 2)) {
      spot = board[y - 2][x + 1];
      if (spot === 'x' || WHITE.includes(spot)) squaresToHighlight.push({ x: x + 1, y: y - 2 });
    }
  }
  return squaresToHighlight;
}

const pawnMoves = ({ x, y }, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  let checkX = x;
  let checkY = y;
  if (isWhite && isWhiteToMove) {
    checkY = y - 1;
    if (isOk(board, checkX, checkY) && board[checkY][x] === 'x') squaresToHighlight.push({ x, y: checkY });
    checkY = y - 2;
    if (y === 6 && isOk(board, checkX, checkY) && board[checkY][x] === 'x') squaresToHighlight.push({ x, y: checkY });
    checkY = y - 1;
    checkX = x + 1;
    if (isOk(board, checkX, checkY) && BLACK.includes(board[checkY][checkX])) squaresToHighlight.push({ x: checkX, y: checkY });
    checkX = x - 1;
    if (isOk(board, checkX, checkY) && BLACK.includes(board[checkY][checkX])) squaresToHighlight.push({ x: checkX, y: checkY });
  } else if (!isWhite && !isWhiteToMove) {
    checkY = y + 1;
    if (isOk(board, checkX, checkY) && board[checkY][x] === 'x') squaresToHighlight.push({ x, y: checkY });
    checkY = y + 2;
    if (y === 1 && isOk(board, checkX, checkY) && board[checkY][x] === 'x') squaresToHighlight.push({ x, y: checkY });
    checkY = y + 1;
    checkX = x + 1;
    if (isOk(board, checkX, checkY) && WHITE.includes(board[checkY][checkX])) squaresToHighlight.push({ x: checkX, y: checkY });
    checkX = x - 1;
    if (isOk(board, checkX, checkY) && WHITE.includes(board[checkY][checkX])) squaresToHighlight.push({ x: checkX, y: checkY });
  }
  return squaresToHighlight;
}

export default showMoves; 