import React from 'react';
import './GameModeSelector.css';

export default function GameModeSelector({ onSelectMode }) {
  return (
    <div className="glass mode-selector-container">
      <h2>Escolha o Modo de Jogo</h2>
      <div className="mode-buttons">
        <button onClick={() => onSelectMode('auto')} className="mode-btn">
          <span className="mode-icon">🤖</span>
          <strong>Aleatório Total</strong>
          <small>Máquina vs Máquina</small>
        </button>
        
        <button onClick={() => onSelectMode('pve')} className="mode-btn primary">
          <span className="mode-icon">👤</span>
          <strong>Jogador vs Máquina</strong>
          <small>Você contra a IA</small>
        </button>

        <button onClick={() => onSelectMode('pvp')} className="mode-btn">
          <span className="mode-icon">👥</span>
          <strong>Dois Jogadores</strong>
          <small>Local</small>
        </button>
      </div>
    </div>
  );
}
