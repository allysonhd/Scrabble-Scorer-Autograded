// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

// function oldScrabbleScorer(word) {
//   word = word.toUpperCase();
//   let letterPoints = 0;
//   for (let i = 0; i < word.length; i++) {
//     for (const pointValue in oldPointStructure) {
//       if (oldPointStructure[pointValue].includes(word[i])) {
//         letterPoints += Number(pointValue);
//       }
//     }
//   }
//   return letterPoints;
// }
//console.log(oldScrabbleScorer(initialPrompt()));

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";

function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word to score: ");
  return word;
}
//console.log(initialPrompt())
//What about compound words? e.g. ice cream
let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
  let letterPoints = Number(word.replace(" ", "").trim().length);
  return letterPoints;
};
//console.log(simpleScorer("ice cream"));

const vowelCheck = {
  3: ["A", "E", "I", "O", "U"],
};

let vowelBonusScorer = function (word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in vowelCheck) {
      if (vowelCheck[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      } else {
        letterPoints += 1;
      }
    }
  }
  return letterPoints;
};
//console.log(vowelBonusScorer("lilypad"));

//if letterpoints = vowel then points = 3,

let scrabbleScorer = function (word) {
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (letter in newPointStructure) {
      if (letter.includes(word[i])) {
        letterPoints += newPointStructure[letter];
      }
    }
  }
  return letterPoints;
};

let scorerOne = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScorer,
};

let scorerTwo = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer,
};

let scorerThree = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [scorerOne, scorerTwo, scorerThree];

function scorerPrompt(word) {
  scorerChoice = input.question(
    `How do you want to score your word?\n\nEnter '0' for Simple Scorer: ${scorerOne.description}\nEnter '1' for Vowel Scorer: ${scorerTwo.description}\nEnter '2' for Scrabble Scorer: ${scorerThree.description}\n\nEnter your choice:`
  );
  scrabbleScore = scoringAlgorithms[scorerChoice].scorerFunction(word);
  return scrabbleScore;
}
//console.log(scorerPrompt());
//lowercase letters need to be keys.
//the correct numbers need to be assigned to each lowercase letter key
// item//this should access the current keys (1,2,3,4,5,8,10)
// pointSystem[item] //this should access the entire array of letters
// pointSystem[item][index] //this should access a specific letter within an array
function transform(pointSystem) {
  let newPointSystem = {};
  for (item in pointSystem) {
    for (index = 0; index < pointSystem[item].length; index++) {
      newPointSystem[pointSystem[item][index].toLowerCase()] = Number(item);
    }
  }
  return newPointSystem;
}
//console.log(transform(oldPointStructure));

function runProgram() {
  score = scorerPrompt(initialPrompt());
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
