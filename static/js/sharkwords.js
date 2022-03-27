const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

const word = 'hello';
let numWrong = 0;
let correctGuesses = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  const containers = document.querySelectorAll(`.${letter}`);
  
  for (const container of containers) {
    container.innerHTML = letter;
    correctGuesses += 1;
  }

  if (correctGuesses === word.length) {
    document.querySelector('#win').style.display = 'block';
    
  }
  
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  if (numWrong === 5) {
    const containers = document.querySelectorAll('button');
    for (const container of containers) {
      disableLetterButton(container);
    }
    const linkElement = document.querySelector('a#play-again');
    linkElement.style.display='';
  }
  else {
    const imageElement = document.querySelector('img');
    imageElement.setAttribute('src', `/static/images/guess${numWrong}.png`);
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.


  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      const letter = evt.target.innerHTML;
      disableLetterButton(evt.target);
      
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter, word);
      }
      else {
        handleWrongGuess();
      }

    });
  }

  // add an event handler to handle clicking on the Play Again button
  const playAgain = document.querySelector('#play-again');
  playAgain.addEventListener('click', resetGame);

  // add an event handler to handle clicking on the You Won! button
  const playAfterWon = document.querySelector('#win');
  playAfterWon.addEventListener('click', resetGame);
})();
