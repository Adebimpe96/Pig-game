'use strict';
//declaring variables
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
let score, currentScore, activePlayer, playing;
// setting game's starting logic
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1.textContent = 0;
  score2.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.style.display = 'none';
};
init();

// logic when user rolls a dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    // 2. Display dice
    // dice.classList.remove('hidden');
    dice.style.display = 'block';
    dice.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});
// when the hold button is clicked
//The current score schould be the big score
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //if active player's score is >=100, the player wins
    if (score[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      dice.style.display = 'none';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //Else, then swithch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
