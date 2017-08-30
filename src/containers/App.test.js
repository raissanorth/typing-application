import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import Functions from './Functions';
import Input from './components/Input';
import NavButton from './components/NavButton';
import Passage from './components/Passage';


it('app renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('app renders shallowly without crashing', () => {
  shallow(<App />);
});

it('input renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input />, div);
});

it('navbutton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavButton />, div);
});

it('passage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Passage />, div);
});

it('word count is correct', () => {
  expect(Functions.getWordCount('Lorem ipsum dolor sit amet.').toEqual(5));
});

test('word value is correct', () => {
  expect(getWordValue('Lorem ipsum dolor sit amet.', 3).toEqual('sit'));
});

test('correct words are detected', () => {
  expect(checkWordCorrect('ispu', 'Lorem ipsum dolor sit amet.', 1)).toEqual(true);
});

test('incorrect words are detected', () => {
  expect(checkWordCorrect('ispa', 'Lorem ipsum dolor sit amet.', 1)).toEqual(false);
});

test('words in wrong case are detected', () => {
  expect(checkWordCorrect('LO', 'Lorem ipsum dolor sit amet.', 0)).toEqual(false);
});

test('any complete word other than last is detected', () => {
  expect(checkInputComplete ("Lorem ", 'Lorem ipsum dolor sit amet.', 0)).toEqual(true);
});

test('first incomplete word is detected', () => {
  expect(checkInputComplete ("Lor", 'Lorem ipsum dolor sit amet.', 0)).toEqual(false);
});

test('last incomplete word is detected', () => {
  expect(checkInputComplete ('am', 'Lorem ipsum dolor sit amet.', 4)).toEqual(false);
});

test('last complete word is detected', () => {
  expect(checkInputComplete ('amet.', 'Lorem ipsum dolor sit amet.', 4)).toEqual(false);
});
  
