import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// function testWordIndex() {
//   console.log(App.currentWordIndex);
// }

// function testWordCount() {
//   console.log(getWordCount(getPassage()));
// }

// function testCurrentWord() {
//   console.log(getCurrentWordValue (getPassage(),5));
// }

// function testCheckWordCorrectTrue() {
//   console.log(checkWordCorrect('Lore', getPassage(), 0));
// }
    
// function testCheckWordCorrectTrue2nd() {
//   console.log(checkWordCorrect('Ipsum', getPassage(), 7));
// }

// function testCheckWordCorrectFalse() {
//   console.log(checkWordCorrect('LO', getPassage(), 0));
// }
    
// function testCheckWordCorrectFalse2nd() {
//   console.log(checkWordCorrect('l', getPassage(), 0));
// }

// function testInputCompleteFirstWord() {
//   console.log(checkInputComplete ("Lorem ", getPassage(), 0));
// }

// function testInputCompleteFirstWordIncomplete() {
//   console.log(checkInputComplete ("Lor", getPassage(), 0));
// }

// function testInputCompleteLastWord() {
//   console.log(checkInputComplete ("amet.", getPassage(), 4));
// }
  

// function testInputCompleteLastWordIncomplete() {
//   console.log(checkInputComplete ("am", getPassage(), 0));
// }
