var wordclass = require("./word.js");
var inquirer = require("inquirer");
var remainingGuess = 10;
var gameOver = false;
var lettersGuessed = new Set();

var word = new wordclass();

var letters_left = word.letters.length;
var divider = "\n==============\n";
// Prompt to ask questions
function question() {
  word.showLetters();
  inquirer
    .prompt([
      {
        type: "input",
        name: "letter",
        message: "GUESS A LETTER"
      }
    ])
    .then(function(response) {
      console.log(divider);
      hasGuess(response.letter);
      if (!gameOver) {
        question();
      }
    });
}
question();

//guessing the letter
function hasGuess(letter) {
  if (letter.length === 1) {
    if (!lettersGuessed.has(letter)) {
      //could do .includes
      lettersGuessed.add(letter);
    } else {
      console.log("THIS LETTER HAS ALREADY BEEN ENTERED\n");
      return true;
      //possibly dont need return
    }

    var numCorrect = word.checkGuess(letter);
    console.log(numCorrect);
    if (numCorrect > 0) {
      console.log("CORRECT!\n");
      letters_left -= numCorrect;
    } else {
      remainingGuess--;
      console.log("INCORRECT! " + remainingGuess + " GUESSES REMAINING\n");
    }
    if (letters_left === 0) {
      console.log("YOU WIN!");
      word.showLetters();
      gameOver = true;
    }
    if (remainingGuess === 0) {
      console.log("YOU LOSE!");
      console.log("THE WORD WAS " + word.word);
      gameOver = true;
    }
  } else {
    console.log("YOU MUST ENTER ONE LETTER AT A TIME\n");
  }
}
