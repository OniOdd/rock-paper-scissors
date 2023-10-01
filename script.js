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
  const resetBtn = document.querySelector('[data-id="reset"]');
  const playerScoreDiv = document.querySelector('[data-id="player"]');
  const computerScoreDiv = document.querySelector('[data-id="computer"]');
  const resultDiv = document.querySelector('[data-id="result"]');
  const okButton = document.querySelector('[data-id="ok"]');

  const playerScorePara = document.createElement('p');
  let playerScore = 0;
  playerScorePara.textContent = playerScore;
  playerScoreDiv.append(playerScorePara);

  const computerScorePara = document.createElement('p');
  let computerScore = 0;
  computerScorePara.textContent = computerScore;
  computerScoreDiv.append(computerScorePara);


  function setRoundScore(str) {
    const strLowerCase = str.toLowerCase();

    if (strLowerCase.includes('win')) {
      playerScore++;
    }
    if (strLowerCase.includes('lose')) {
      computerScore++;
    }

    playerScorePara.textContent = playerScore;
    computerScorePara.textContent = computerScore;
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScorePara.textContent = playerScore;
    computerScorePara.textContent = computerScore;

    if (resultDiv.childElementCount === 2) {
      resultDiv.lastElementChild.remove();
    }
  }

  function endOfGame() {
    const title = document.querySelector('#title-popup');

    if (playerScore === 5) {
      title.textContent = 'You have won this game!';
      newGame();
    } else if (computerScore === 5) {
      title.textContent = 'You have lost this game!';
      newGame();
    }
  }

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

    setRoundScore(roundResult);
    endOfGame();
  }

  function newGame() {
    const popup = document.querySelector('[data-id="popup"]');
    const bgPopup = document.querySelector('[data-id="bg-popup"]');
    const body = document.body;

    popup.classList.toggle('active');
    bgPopup.classList.toggle('active');
    body.classList.toggle('lock');
  }

  rockBtn.addEventListener('click', (event) => getResultOfGame(event));
  paperBtn.addEventListener('click', (event) => getResultOfGame(event));
  scissorsBtn.addEventListener('click', (event) => getResultOfGame(event));
  resetBtn.addEventListener('click', resetGame);
  okButton.addEventListener('click', () => {
    newGame();
    resetGame();
  });
}

game();
