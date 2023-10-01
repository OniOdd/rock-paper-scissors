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

function game() {
  const rockBtn = document.querySelector('[data-id="rock"]');
  const paperBtn = document.querySelector('[data-id="paper"]');
  const scissorsBtn = document.querySelector('[data-id="scissors"]');
  const resultDiv = document.querySelector('[data-id="result"]');

  function getResultOfGame(event) {
    const playerSelection = event.target.getAttribute('data-id');
    const computerSelection = getComputerChoice();
    const roundResult = playRound(playerSelection, computerSelection);

    const paragraph = document.createElement('p');
    paragraph.textContent = roundResult;

    if (resultDiv.childElementCount === 1) {
      resultDiv.append(paragraph);
    } else {
      resultDiv.lastElementChild.remove();
      resultDiv.append(paragraph);
    }

    if (paragraph.textContent.toLowerCase().includes('win')) {
      paragraph.className = 'color-green';
    } else if (paragraph.textContent.toLowerCase().includes('lose')) {
      paragraph.className = 'color-red';
    } else {
      paragraph.className = 'color-yellow';
    }
  }

  rockBtn.addEventListener('click', (event) => getResultOfGame(event));
  paperBtn.addEventListener('click', (event) => getResultOfGame(event));
  scissorsBtn.addEventListener('click', (event) => getResultOfGame(event));

  /*
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
    */
}

game();
