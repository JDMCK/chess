const Square = ({ className, piece, handleShowMoves, handleMove, isHighlighted }) => {

  const pickIcon = (piece) => {
    switch (piece) {
      case 'k':
        return '♔';
      case 'q':
        return '♕';
      case 'r':
        return '♖';
      case 'b':
        return '♗';
      case 'n':
        return '♘';
      case 'p':
        return '♙';
      case 'K':
        return '♚';
      case 'Q':
        return '♛';
      case 'R':
        return '♜';
      case 'B':
        return '♝';
      case 'N':
        return '♞';
      case 'P':
        return '♟';
      default:
        return '';
    }
  }

  return (
    <div className={`${className} ${isHighlighted ? 'highlight' : ''}`} onClick={
      isHighlighted ? handleMove : handleShowMoves}>
      {piece && pickIcon(piece)}
    </div>
  );
}

export default Square;