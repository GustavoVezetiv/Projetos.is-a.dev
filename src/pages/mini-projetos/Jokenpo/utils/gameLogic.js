export const WINNING_CONDITIONS = {
  pedra: 'tesoura',
  tesoura: 'papel',
  papel: 'pedra'
};

export function determineWinner(player1Choice, player2Choice) {
  if (!player1Choice || !player2Choice) return null;
  if (player1Choice === player2Choice) return 'draw';
  
  if (WINNING_CONDITIONS[player1Choice] === player2Choice) {
    return 'player1';
  }
  return 'player2';
}

export const STYLES = ['classico', 'fantasia', 'arcade', 'ludico'];

export const SHAPES = ['pedra', 'papel', 'tesoura'];

export function getRandomStyle() {
  return STYLES[Math.floor(Math.random() * STYLES.length)];
}

export function getRandomChoice() {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}
