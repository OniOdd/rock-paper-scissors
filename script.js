'use strict';

function getComputerChoice() {
  const randomNumber = Math.ceil(Math.random() * 3);
  switch (randomNumber) {
    case 1:
      return 'Rock';
      break;
    case 2:
      return 'Paper';
      break;
    case 3:
      return 'Scissors';
  }
}

function playRound(playerChoice, computerChoice) {
  const player = playerChoice[0].toUpperCase() + playerChoice.slice(1);
  const PATTERN = [
    ['Rock', 'Scissors'],
    ['Paper', 'Rock'],
    ['Scissors', 'Paper']
  ];

  if (player === computerChoice) {
    return 'A tie!';
  }

  for (let i = 0; i < PATTERN.length; i++) {
    if (player === PATTERN[i][0] && computerChoice === PATTERN[i][1]) {
      return `You Win! ${PATTERN[i][0]} beats ${PATTERN[i][1]}`;
    }
    if (player === PATTERN[i][1] && computerChoice === PATTERN[i][0]) {
      return `You Lose! ${PATTERN[i][0]} beats ${PATTERN[i][1]}`;
    }
  }
}

function isDataValid() {
  try {
    let playerSelection =
      prompt('Choose: rock, paper or scissors?').toLowerCase().trim();

    for (let i = 0; i < 100; i ++) {
      if (
        playerSelection === 'rock' ||
        playerSelection === 'paper' ||
        playerSelection === 'scissors'
      ) {
        return playerSelection;
        break;
      } else {
        playerSelection =
          prompt('Wrong! Choose again: rock, paper or scissors?');
      }
    }
  } catch {
    console.log('Oops, error!');
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 1; i <= 5; i++) {
    const playerSelection = isDataValid();
    const computerSelection = getComputerChoice();
    try {
      const result = playRound(playerSelection, computerSelection).toLowerCase();

      if (result.includes('you win')) {
        playerScore++;
      } else {
        computerScore++;
      }
    } catch {
      console.log('Oops, error!');
    }
  }

  return playerScore > computerScore
    ? console.log('You Win!')
    : console.log('You Lose!');
}

game();
