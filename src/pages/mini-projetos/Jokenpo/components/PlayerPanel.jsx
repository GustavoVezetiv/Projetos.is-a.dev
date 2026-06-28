import React from 'react';
import './PlayerPanel.css';
import assets from '../utils/assetsMapper';

export default function PlayerPanel({ title, styleName, choice, score, isPlayer1, hiddenChoice, isSpinning }) {
  // isPlayer1 dictates the accent color
  const panelClass = `glass player-panel ${isPlayer1 ? 'p1' : 'p2'}`;

  return (
    <div className={panelClass}>
      <h2>{title}</h2>
      
      <div className="score-badge">
        <span>Pontos:</span>
        <strong>{score}</strong>
      </div>

      <div className="style-info">
        <span>Estilo Visual:</span>
        <span className="style-badge">{styleName || 'Sorteando...'}</span>
      </div>

      <div className="choice-display">
        {hiddenChoice ? (
          <div className="mystery-choice">?</div>
        ) : choice ? (
          <img src={assets[styleName][choice]} alt={choice} className={`choice-img ${isSpinning ? 'spinning' : 'animate-pop'}`} />
        ) : (
          <div className="empty-choice">Aguardando...</div>
        )}
      </div>
    </div>
  );
}
