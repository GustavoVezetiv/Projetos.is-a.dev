import React, { useState } from 'react';
import StyleRoulette from './components/StyleRoulette';
import GameModeSelector from './components/GameModeSelector';
import PlayerPanel from './components/PlayerPanel';
import ChoiceButtons from './components/ChoiceButtons';
import ResultDisplay from './components/ResultDisplay';
import { determineWinner, getRandomChoice } from './utils/gameLogic';

export default function App() {
  const [gameState, setGameState] = useState('ROULETTE'); // ROULETTE, MODE_SELECT, PLAYING, RESULT
  const [gameMode, setGameMode] = useState(null); // 'auto', 'pve', 'pvp'
  
  const [p1Style, setP1Style] = useState('');
  const [p2Style, setP2Style] = useState('');
  
  const [p1Choice, setP1Choice] = useState(null);
  const [p2Choice, setP2Choice] = useState(null);
  
  const [scores, setScores] = useState({ p1: 0, p2: 0, draws: 0 });
  const [winner, setWinner] = useState(null);
  
  const [currentPlayer, setCurrentPlayer] = useState(1); // Para modo pvp
  const [isSpinningChoices, setIsSpinningChoices] = useState(false);

  const handleStylesSelected = (style1, style2) => {
    setP1Style(style1);
    setP2Style(style2);
    setTimeout(() => {
      setGameState('MODE_SELECT');
    }, 1000);
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setGameState('PLAYING');
    setCurrentPlayer(1);
    setP1Choice(null);
    setP2Choice(null);

    if (mode === 'auto') {
      // Auto mode: play immediately
      playRoundAuto();
    }
  };

  const playRoundAuto = () => {
    setIsSpinningChoices(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setP1Choice(getRandomChoice());
      setP2Choice(getRandomChoice());
      iterations++;
      if (iterations > 10) {
        clearInterval(interval);
        const c1 = getRandomChoice();
        const c2 = getRandomChoice();
        setP1Choice(c1);
        setP2Choice(c2);
        setIsSpinningChoices(false);
        processResult(c1, c2);
      }
    }, 100);
  };

  const processResult = (c1, c2) => {
    const result = determineWinner(c1, c2);
    setWinner(result);
    setScores(prev => {
      if (result === 'player1') return { ...prev, p1: prev.p1 + 1 };
      if (result === 'player2') return { ...prev, p2: prev.p2 + 1 };
      return { ...prev, draws: prev.draws + 1 };
    });
    setTimeout(() => {
      setGameState('RESULT');
    }, 800); // tempo de revelação
  };

  const handlePlayerChoice = (choice) => {
    if (gameMode === 'pve') {
      setP1Choice(choice);
      setIsSpinningChoices(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setP2Choice(getRandomChoice());
        iterations++;
        if (iterations > 10) {
          clearInterval(interval);
          const c2 = getRandomChoice();
          setP2Choice(c2);
          setIsSpinningChoices(false);
          processResult(choice, c2);
        }
      }, 100);
    } else if (gameMode === 'pvp') {
      if (currentPlayer === 1) {
        setP1Choice(choice);
        setCurrentPlayer(2);
      } else {
        setP2Choice(choice);
        processResult(p1Choice, choice);
      }
    }
  };

  const resetRound = () => {
    setP1Choice(null);
    setP2Choice(null);
    setWinner(null);
    setGameState('PLAYING');
    setCurrentPlayer(1);
    if (gameMode === 'auto') {
      playRoundAuto();
    }
  };

  const changeMode = () => {
    setP1Choice(null);
    setP2Choice(null);
    setWinner(null);
    setGameState('MODE_SELECT');
  };

  const respinStyles = () => {
    setP1Style('');
    setP2Style('');
    setP1Choice(null);
    setP2Choice(null);
    setWinner(null);
    setScores({ p1: 0, p2: 0, draws: 0 });
    setGameState('ROULETTE');
  };

  return (
    <div className="game-container">
      {gameState !== 'ROULETTE' && gameState !== 'MODE_SELECT' && (
        <PlayerPanel 
          title="Amigo" 
          styleName={p1Style} 
          choice={p1Choice} 
          score={scores.p1} 
          isPlayer1={true}
          hiddenChoice={gameMode === 'pvp' && currentPlayer === 2 && gameState === 'PLAYING'}
          isSpinning={isSpinningChoices}
        />
      )}

      <div className="center-area">
        <h1>JoKenPo!</h1>
        
        {gameState === 'ROULETTE' && (
          <StyleRoulette onComplete={handleStylesSelected} />
        )}

        {gameState === 'MODE_SELECT' && (
          <GameModeSelector onSelectMode={handleModeSelect} />
        )}

        {gameState === 'PLAYING' && (
          <>
            {gameMode === 'pve' && (
              <ChoiceButtons 
                styleName={p1Style} 
                onChoice={handlePlayerChoice} 
                title="Sua Vez" 
              />
            )}
            
            {gameMode === 'pvp' && currentPlayer === 1 && (
              <ChoiceButtons 
                styleName={p1Style} 
                onChoice={handlePlayerChoice} 
                title="Vez do Jogador 1 (Amigo)" 
              />
            )}
            
            {gameMode === 'pvp' && currentPlayer === 2 && (
              <ChoiceButtons 
                styleName={p2Style} 
                onChoice={handlePlayerChoice} 
                title="Vez do Jogador 2 (Inimigo)" 
              />
            )}
            
            {gameMode === 'auto' && (
              <h2 className="animate-pop">Batalha Automática!</h2>
            )}
          </>
        )}

        {gameState === 'RESULT' && (
          <ResultDisplay 
            winner={winner} 
            onPlayAgain={resetRound}
            onChangeMode={changeMode}
            onRespin={respinStyles}
          />
        )}

        {gameState !== 'ROULETTE' && (
           <div style={{color: 'var(--text-secondary)', marginTop: '2rem'}}>
             Empates: {scores.draws}
           </div>
        )}
      </div>

      {gameState !== 'ROULETTE' && gameState !== 'MODE_SELECT' && (
        <PlayerPanel 
          title="Inimigo" 
          styleName={p2Style} 
          choice={p2Choice} 
          score={scores.p2} 
          isPlayer1={false}
          hiddenChoice={false}
          isSpinning={isSpinningChoices}
        />
      )}
    </div>
  );
}
