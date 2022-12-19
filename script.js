'use strict';
const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');

const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');
let score, currentScore, activePlayer, player;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('.dice').classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  dice.classList.add('hidden');
};
init();
//switch players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//roll dice function
btnRoll.addEventListener('click', function () {
  if (player) {
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);
    dice.src = `dice-${diceNum}.png`;
    dice.classList.remove('hidden');

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//hold function
btnHold.addEventListener('click', function () {
  if (player) {
    dice.classList.add('hidden');
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      player = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
//reset function
btnNew.addEventListener('click', init);
