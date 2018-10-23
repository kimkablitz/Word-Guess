var letter = require("./letter.js");

//generate a random word from a given array
function randomWord() {
  var things = ["eclipse", "earthquake", "disaster", "hurricane","storm","rain","fullmoon","typhoon"];
  var thing = things[Math.floor(Math.random() * things.length)];
  return thing.toUpperCase();
}
randomWord();

function Word() {

  var letters = [];
  var word = randomWord();
  this.word = word;
  //turn the selected word into an array
  var split_word = word.split("");

  //have the array being pushed to letters one at a time
  split_word.forEach(function(l) {
    var dup = new letter(l);
    letters.push(dup);
  });

  this.letters = letters;
 
  //SHOWLETTER FUNCTION
  this.showLetters = function() {
    var display = "";
    this.letters.forEach(function(letter) {
      display += letter.getChar() + " ";
    });
    console.log(display);
    display = display.slice(0, -1);
    console.log("Catergory: weather");
    console.log(display);
  };

  //CHECKGUESS FUNCTION
  this.checkGuess = function(guess) {
    var matches_found = 0;
    this.letters.forEach(function(letter) {
      if (letter.guessed === false && letter.checkGuess(guess) === true) {
        letter.guessed = true;
        matches_found++;
      }
    });
    return matches_found;
  };
}

module.exports = Word;

//words to be uses ["elipse","earthquake", "disaster", "hurricane"];
