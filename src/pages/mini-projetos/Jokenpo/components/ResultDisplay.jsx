import React from 'react';
import './ResultDisplay.css';

export default function ResultDisplay({ winner, onPlayAgain, onChangeMode, onRespin }) {
  let message = '';
  let resultClass = '';

  if (winner === 'draw') {
    message = 'Empate!';
    resultClass = 'draw';
  } else if (winner === 'player1') {
    message = 'Amigo Venceu!';
    resultClass = 'p1-win';
  } else if (winner === 'player2') {
    message = 'Inimigo Venceu!';
    resultClass = 'p2-win';
  }

  return (
    <div className={`glass result-display animate-pop ${resultClass}`}>
      <h2 className="result-title">{message}</h2>
      <div className="result-actions">
        <button className="primary" onClick={onPlayAgain}>Próxima Rodada</button>
        <button onClick={onChangeMode}>Trocar Modo</button>
        <button onClick={onRespin}>Sortear Estilos Novamente</button>
      </div>
    </div>
  );
}
