import React, { useEffect, useState } from 'react';
import './StyleRoulette.css';
import { STYLES } from '../utils/gameLogic';
import assets from '../utils/assetsMapper';

export default function StyleRoulette({ onComplete }) {
  const [spinning, setSpinning] = useState(false);
  const [p1Display, setP1Display] = useState(STYLES[0]);
  const [p2Display, setP2Display] = useState(STYLES[0]);

  const startRoulette = () => {
    setSpinning(true);
    let iterations = 0;
    const maxIterations = 20; // How many times it spins before stopping
    
    const interval = setInterval(() => {
      setP1Display(STYLES[Math.floor(Math.random() * STYLES.length)]);
      setP2Display(STYLES[Math.floor(Math.random() * STYLES.length)]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setSpinning(false);
        const finalP1 = STYLES[Math.floor(Math.random() * STYLES.length)];
        const finalP2 = STYLES[Math.floor(Math.random() * STYLES.length)];
        setP1Display(finalP1);
        setP2Display(finalP2);
        onComplete(finalP1, finalP2);
      }
    }, 100);
  };

  return (
    <div className="glass roulette-container">
      <h2>Sorteio de Estilos</h2>
      <div className="roulette-displays">
        <div className={`roulette-box p1-box ${spinning ? 'spinning' : ''}`}>
          <span>Jogador 1</span>
          <img src={assets[p1Display]['pedra']} alt="Estilo 1" style={{width: 50, height: 50, objectFit: 'contain'}} />
          <strong style={{marginTop: '5px'}}>{p1Display}</strong>
        </div>
        <div className={`roulette-box p2-box ${spinning ? 'spinning' : ''}`}>
          <span>Jogador 2</span>
          <img src={assets[p2Display]['pedra']} alt="Estilo 2" style={{width: 50, height: 50, objectFit: 'contain'}} />
          <strong style={{marginTop: '5px'}}>{p2Display}</strong>
        </div>
      </div>
      <button 
        className="primary spin-btn" 
        onClick={startRoulette} 
        disabled={spinning}
      >
        {spinning ? 'Sorteando...' : 'Sortear Estilos!'}
      </button>
    </div>
  );
}
