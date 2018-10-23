var wordclass = require("./word.js");
var inquirer = require("inquirer");
var remainingGuess = 10;
var gameOver = false;
var lettersGuessed = new Set(); //empty array alternate

var word = new wordclass();

var letters_left= word.letters.length;
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
      guess(response.letter);
      if (!gameOver) {
        question();
      }
    });
}
question();

//guessing the letter
function guess(letter) {
  if (letter.length === 1) {
    if (!lettersGuessed.has(letter)) {
      //could do .imcludes
      lettersGuessed.add(letter);
    } else {
      console.log("THIS LETTER HAS ALREADY BEEN ENTERED\n");
      return;
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
    if (remainingGuess === 0) {
      console.log("YOU WIN!");
      word.showLetters();
      gameOver = true;
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
    console.log("YOU CAN ONLY GUESS ONE LETTER AT A TIME\n");
  }
}
