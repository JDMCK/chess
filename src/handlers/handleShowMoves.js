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

const kingMoves = (coordinate, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {

  } else if (!isWhite && !isWhiteToMove) {

  }
  return squaresToHighlight;
}

const queenMoves = (coordinate, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {

  } else if (!isWhite && !isWhiteToMove) {

  }
  return squaresToHighlight;
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

const bishopMoves = (coordinate, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {

  } else if (!isWhite && !isWhiteToMove) {

  }
  return squaresToHighlight;
}

const knightMoves = (coordinate, board, isWhite, isWhiteToMove) => {
  let squaresToHighlight = [];
  if (isWhite && isWhiteToMove) {

  } else if (!isWhite && !isWhiteToMove) {

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