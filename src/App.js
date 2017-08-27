import React, { Component } from 'react';
import Passage from './components/Passage';
import Input from './components/Input';
import NavButton from './components/NavButton';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const firstPassage = getPassage();

    // The variables that this app needs.
    this.state = {
      barWidth: 0,
      passage: firstPassage,
      lastWord: false,
      wordCompleted: false,
      wordCorrect: true,
      wordCount: getWordCount(firstPassage),
      numWordsTyped: 0,
      input: '',
      wpm: '000',
      index: 0,
      formattedPassage: defineStyle(firstPassage, 0, true),
      start: null,
      wpmStyle: ''
    };

    // All the functions that will be used are listed and bound here
    this.handleChange = this.handleChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  handleChange(passedInput) {

    const wordCompleted = checkInputComplete(passedInput, this.state.passage, this.state.index);
    const wordCorrect = checkWordCorrect(passedInput, this.state.passage, this.state.index);
    const input = wordCompleted ? '' : passedInput;
    const index = wordCompleted ? this.state.index + 1 : this.state.index;
    const numWordsTyped = index;
    const lastWord = LastWordCompleted(passedInput, this.state.passage, this.state.index);


    // Calculates the time passed since user started typing. 
    let elapsedSeconds = 0;
    if (this.state.start !== null) {
      const elapsedMilliseconds = Date.parse(new Date()) - Date.parse(this.state.start); // Converts the date objects to millisecond
      elapsedSeconds = elapsedMilliseconds / 1000;
    }

    /* Calculates the WPMs. Rounds values to natural numbers.*/
    let wpm = 0;
    if (elapsedSeconds > 0 && numWordsTyped > 0) {
      wpm = Math.floor((numWordsTyped / elapsedSeconds) * 60);
    }

    // Updates the state (the variables)
    this.setState({
      start: (this.state.start === null) ? new Date() : this.state.start,
      input: input,
      index: index,
      wordCompleted: wordCompleted,
      numWordsTyped: numWordsTyped,
      wordCorrect: wordCorrect,
      lastWord: lastWord,
      formattedPassage: defineStyle(this.state.passage, index, wordCorrect),
      barWidth: showProgress(input, this.state.passage, index, this.state.wordCount),
      wpm: pad(wpm),
      wpmStyle: lastWord ? 'wpm-bounce' : ''
    });
  }

  handleResetButton(event) {
    // Update state and reset all values. Only passage value to remain.
    this.setState({
      lastWord: false,
      wordCompleted: false,
      wordCorrect: true,
      numWordsTyped: 0,
      input: '',
      wpm: '000',
      index: 0,
      formattedPassage: defineStyle(this.state.passage, 0, true),
      barWidth: 0,
      start: null,
      wpmStyle: ''
    });
  }

  handleNextButton(event) {
    const firstPassage = getPassage();
    // Update state and reset all values, including passage. 

    this.setState({
      passage: firstPassage,
      lastWord: false,
      wordCompleted: false,
      wordCorrect: true,
      wordCount: getWordCount(firstPassage),
      numWordsTyped: 0,
      input: '',
      wpm: '000',
      index: 0,
      formattedPassage: defineStyle(firstPassage, 0, true),
      barWidth: 0,
      start: null,
      wpmStyle: ''
    });
  }

  // The updated render function shows the formattedPassage.
  render() {
    return (
      <div>
        <div className="header">
          <h1 id="title">Typing Website</h1>
        </div>

        <div className="main">
          <div id="progress">
            <div id="bar" style={{ width: this.state.barWidth + "%" }}></div>
          </div>

          <div id="wpm-container" className={this.state.wpmStyle}>
            <p id="wpm-display">{this.state.wpm}</p>
          </div>

          <Passage id="text-display" formattedPassage={this.state.formattedPassage} />
          <Input type="text" input={this.state.input} onChange={this.handleChange} />

          <div className="buttons">
            <NavButton id="reset-button" onClick={this.handleResetButton} title="Reset"></NavButton>
            <NavButton id="next-button" onClick={this.handleNextButton} title="Next"></NavButton>
          </div>
        </div>

        {/* Printouts for debugging */}
        <div>
          <p>
            WPM: {this.state.wpm}<br />
            Index: {this.state.index}<br />
            LastWord: {this.state.lastWord.toString()}<br />
            WordCount: {this.state.wordCount}<br />
            WordCompleted:  {this.state.wordCompleted.toString()}<br />
            WordCorrect: {this.state.wordCorrect.toString()}<br />
            NumberWordsTyped: {this.state.numWordsTyped}<br />
            Input: {this.state.input}<br />
            BarWidth: {this.state.barWidth}<br />
          </p>
        </div>
      </div>
    );
  }
}
  // Calculates width for progress bar based on index of the passage.
function showProgress(input, passage, index, wordCount) {
  let width = 100;
  if (!LastWordCompleted(input, passage, index)) {
    width = (index) ? 100 / (wordCount / index) : 0;
  }
  return width;
}

function getPassage() {
  const passages = ['Lorem ipsum dolor sit amet.', 'Morbi facilisis finibus urna placerat ultrices.', 'Nam mattis tempus nulla, at commodo mi pretium id.', 'Sed nec neque tempor, finibus dui a, varius turpis.', 'Nunc non magna aliquet, laoreet tellus ut, ornare risus.'];
  const min = Math.ceil(0);
  const max = Math.floor(passages.length);
  const randomInt = Math.floor(Math.random() * (max - min)) + min;
  return passages[randomInt];
}

/* Function takes a string, counts how many words are in it, and returns that number. */
function getWordCount(passage) {

  return passage.split(/\s+/).length; /* Regex finds one or more occurences of whitespace elements */
}

/* State needs to know the value of the current word, This function takes an index and a string (the passage). Finds the correct word at the index and returns it. */
function getCurrentWordValue(passage, index) {

  return passage.split(/\s+/)[index];
}

/* CORRECTNESS - Function takes current input(string), passage(string), index(int) and returns true if the indexed word of the passage begins with the given input word*/
function checkWordCorrect(input, passage, index) {

  const word = getCurrentWordValue(passage, index) + ' ';
  return word.startsWith(input);
}

/* COMPLETENESS - Function takes current input, passage, index
returns true if the current word is complete
*/
function checkInputComplete(input, passage, index) {

  /* Check for last word , return true or false */
  if (LastWordCompleted(input, passage, index)) {
    return true;
  }

  var word = getCurrentWordValue(passage, index);
  if (input.endsWith(' ')) {
    word += ' ';
    return (word === input);
  }
  else {
    return false;
  }
}


/* Check if last word reached, and input === the last word. Return Boolean. */
function LastWordCompleted(input, passage, index) {

  if (getWordCount(passage) - 1 === index) { // reached last word
    return (getCurrentWordValue(passage, index) === input); // input is the same as last word
  }

  return false;
}

/* STYLING - Function takes: passage(string), index(int), correct(bool). 
Returns JSX elements */
function defineStyle(passage, index, correct) {
  const style = correct ? "current-correct" : "current-incorrect";
  const passageArray = passage.split(/\s+/);

  const preCurrentWord = passageArray.slice(0, index).join(' '); // holds all the words before the index in passageArray
  const currentWord = passageArray[index]; // holds the current word
  const postCurrentWord = passageArray.slice(index + 1, passageArray.length).join(' '); // holds all the words after the index in                                                                                       passageArray
  return <div id='passage'>
    <text id='pre'> {preCurrentWord} </text>
    <text id={style}> {currentWord} </text>
    <text id='post'> {postCurrentWord} </text>
  </div>;
}

/* Function takes a number and returns a string padded out to 3 digits*/
function pad(n) {
  if (n < 10) {
    return '00' + n
  }
  else if (n < 100) {
    return '0' + n
  }
  else {
    return n;
  }
}


export default App;




