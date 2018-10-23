//Constructor function for creating LETTER
function Letter(letter) {
  this.letter = letter;
  this.guessed = false;

  this.getChar = function() {
    if (!this.guessed) {
      return "_";
    } else {
      return this.letter;
    }
  };

  this.checkGuess = function(guess) {
    if (guess === this.letter) {
      this.guessed = true;
      return true;
    } else {
      return false;
    }
  };
}
module.exports = Letter;
