'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (!playing) return;
  let rolled = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${rolled}.png`;

  if (rolled === 1) {
    switchPlayer();
    return;
  }

  currentScore += rolled;
  activePlayer === 0
    ? (current0.textContent = currentScore)
    : (current1.textContent = currentScore);
});

btnHold.addEventListener('click', function () {
  if (!playing || currentScore < 1) return;
  scores[activePlayer] += currentScore;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = scores[0];
  score1.textContent = scores[1];
  if (scores[activePlayer] < 50) {
    switchPlayer();
    return;
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  playing = false;
});

btnNew.addEventListener('click', init);
