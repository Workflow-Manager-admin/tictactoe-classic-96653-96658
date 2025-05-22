import React from 'react';

// PUBLIC_INTERFACE
/**
 * Square component represents a single cell in the Tic Tac Toe game board
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value to display in the square ('X', 'O', or null)
 * @param {Function} props.onClick - Function to call when square is clicked
 * @returns {JSX.Element} - Rendered square component
 */
function Square({ value, onClick }) {
  return (
    <button 
      className="square" 
      onClick={onClick}
      style={{ 
        color: value === 'X' ? '#E87A41' : '#ffffff' 
      }}
    >
      {value}
    </button>
  );
}

export default Square;
