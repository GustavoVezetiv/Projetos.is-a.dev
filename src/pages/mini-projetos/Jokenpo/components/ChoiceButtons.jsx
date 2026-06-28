import React from 'react';
import './ChoiceButtons.css';
import assets from '../utils/assetsMapper';
import { SHAPES } from '../utils/gameLogic';

export default function ChoiceButtons({ styleName, onChoice, disabled, title }) {
  return (
    <div className="choice-buttons-container">
      {title && <h3 className="choice-title">{title}</h3>}
      <div className="choice-buttons">
        {SHAPES.map(shape => (
          <button 
            key={shape}
            className="choice-btn glass"
            onClick={() => onChoice(shape)}
            disabled={disabled}
            title={shape}
          >
            <img src={assets[styleName][shape]} alt={shape} />
          </button>
        ))}
      </div>
    </div>
  );
}
