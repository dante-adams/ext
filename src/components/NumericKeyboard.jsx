import React, { useState } from 'react';
import { X } from 'lucide-react';

const NumericKeyboard = ({ onInput, onClose, value, onChange }) => {
  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (key === 'clear') {
      onChange('');
    } else if (key === '.') {
      if (!value.includes('.')) {
        onChange(value + key);
      }
    } else {
      onChange(value + key);
    }
  };

  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', 'backspace']
  ];

  return (
    <div className="numeric-keyboard">
      <div className="keyboard-header">
        <span className="keyboard-value">{value || '0'}</span>
        <button onClick={onClose} className="keyboard-close">
          <X size={20} />
        </button>
      </div>
      <div className="keyboard-grid">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`keyboard-key ${key === 'backspace' ? 'keyboard-key-backspace' : ''}`}
              >
                {key === 'backspace' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
        <button
          onClick={() => {
            onInput(value);
            onClose();
          }}
          className="keyboard-done"
        >
          Готово
        </button>
      </div>
    </div>
  );
};

export default NumericKeyboard;
