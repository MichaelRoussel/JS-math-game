//all document objects that are interacted with
let answerButton = document.querySelector("#answerBtn");
let skipButton = document.querySelector("#skipBtn");
let saveButton = document.querySelector("#saveBtn");
let loadButton = document.querySelector("#loadBtn");
let num1Field = document.querySelector("#num1");
let num2Field = document.querySelector("#num2");
let operatorField = document.querySelector("#operator");
let answerField = document.querySelector("#guessInput");
let nameField = document.querySelector("#saveName");
let scoreboard = document.querySelector("#scoreField");
let messageField = document.querySelector("#message");
let saveMessage = document.querySelector("#saveMessage");
let saveList = document.querySelector("#saveList");
let resetButton = document.querySelector("#resetBtn");

//stored global variables, tried to keep them local within the function itself but could not get getters/setters to work properly
let score = 0;
let name = '';
let num1 = 0;
let num2 = 0;
let operator = '';


function MathGame(){

}

  MathGame.prototype.fillFields = function() { //function to update the fields with the current values
    num1Field.textContent = num1;
    num2Field.textContent = num2;
    operatorField.textContent = operator;
    scoreboard.textContent = score;
  }

  MathGame.prototype.randomNumber = function(max) { //random number function for both picking an equation type and the numbers involved
  return Math.floor(Math.random() * Math.floor(max));
}

  MathGame.prototype.createAddition = function(){
    num1 = MathGame.prototype.randomNumber(10);
    num2 = MathGame.prototype.randomNumber(10);
    operator = "+";
    MathGame.prototype.fillFields(); //update fields at the end of each function to use new values
  }

  MathGame.prototype.createSubtraction = function(){
    num1 = MathGame.prototype.randomNumber(10);
    num2 = MathGame.prototype.randomNumber(10);
    operator = "-";
    MathGame.prototype.fillFields();
  }

  MathGame.prototype.createMultiplication = function(){
    num1 = MathGame.prototype.randomNumber(10);
    num2 = MathGame.prototype.randomNumber(10);
    operator = "x";
    MathGame.prototype.fillFields();
  }

  MathGame.prototype.createDivision = function(){ 
    num1 = MathGame.prototype.randomNumber(40);
    num2 = MathGame.prototype.randomNumber(10);
    operator = "÷";
    while(num1 % num2 != 0){ //if the 2 numbers dont divide evenly, pick 2 new numbers (may be taxing but simplest way I thought of)
      num1 = MathGame.prototype.randomNumber(40) + 1; //+1 added to both numbers to avoid any dividing of/by zero
      num2 = MathGame.prototype.randomNumber(10) + 1;
    }
    MathGame.prototype.fillFields();
  }

  MathGame.prototype.randomEquation = function(){
    number = MathGame.prototype.randomNumber(4) + 1; //picks a random equation type from all 4
    switch(number){ 
      case 1:
      MathGame.prototype.createAddition();
      break;

      case 2:
      MathGame.prototype.createSubtraction();
      break;

      case 3:
      MathGame.prototype.createMultiplication();
      break;

      case 4:
      MathGame.prototype.createDivision();
      break;
    }
  } //end randomEquation

  MathGame.prototype.correctAnswer = function() {
    score++; //increment score
    messageField.textContent = "Correct!"; //add nice message
    guessInput.value = ''; //reset input field
  }

  MathGame.prototype.wrongAnswer = function() {
    score--; //decrement score
    messageField.textContent = "Wrong!";
    guessInput.value = '';
  }

  MathGame.prototype.evaluateGuess = function(){
    guess = Number(guessInput.value); //take number guess
    switch(operator){ //switch to determine how to calculate the answer
      case '+':
        if(guess === num1 + num2){ //checks answer for each case, if correct calls correct function, otherwise incorrect function
          MathGame.prototype.correctAnswer();
        } else {
          MathGame.prototype.wrongAnswer();
        }
        break;

      case '-':
        if(guess === num1 - num2){
          MathGame.prototype.correctAnswer();
        } else {
          MathGame.prototype.wrongAnswer();
        }
        break;

      case 'x':
        if(guess === num1 * num2){
          MathGame.prototype.correctAnswer();
        } else {
          MathGame.prototype.wrongAnswer();
        }
        break;

      case '÷':
        if(guess === num1 / num2){
          MathGame.prototype.correctAnswer();
        } else {
          MathGame.prototype.wrongAnswer();
        }
        break;
    }
    MathGame.prototype.randomEquation();
  } //end evaluateGuess()

  MathGame.prototype.saveState = function() {
    if(nameField.value === ''){ //checks if field is empty
        saveMessage.textContent = 'Enter a name please';
      } else {
    const user = { //creates new user object with current values
      "name": nameField.value,
      "score": score,
      "num1": num1,
      "num2": num2,
      "operator": operator
      }
    localStorage.setItem(nameField.value, JSON.stringify(user)); //saves the string to local storage
    saveMessage.textContent = 'Save Successful';
    saveList.innerHTML = ''; //delete the old list
    MathGame.prototype.loadSaves(); //create a new list of updated saves, this prevents multiple list entries of the same save
  }
  }

  MathGame.prototype.loadState = function() {
    if(nameField.value === ''){ //check if name is blank
        saveMessage.textContent = 'Enter a name please';
      } else if(localStorage.getItem(nameField.value) === null) { //check if name exists in storage
        saveMessage.textContent = 'Save does not exist';
      } else {
        const user = JSON.parse(localStorage.getItem(nameField.value)); //parses the string from local storage that matches the name
        num1 = user.num1;
        num2 = user.num2;
        operator = user.operator;
        score = user.score;
        name = user.name;
        MathGame.prototype.fillFields();
      }
  }

  MathGame.prototype.loadSaves = function() {
      for (i = 0; i < localStorage.length; i++)   { //grab all local storage keys, parse and append name + score to the list
        let li = document.createElement('li');
        let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
        li.textContent = `Name: ${user.name} | Score: ${user.score}`;
        saveList.append(li);
      }
  }

  MathGame.prototype.resetGame = function() {
    localStorage.clear(); //clears local storage
    name = ''; //clears name variable
    score = 0; //resets score
    MathGame.prototype.randomEquation(); //creates new equation which updates the remaining fields
  }

//onclick functions for all 5 buttons
  saveBtn.onclick = function() { 
    MathGame.prototype.saveState();
  }

  loadBtn.onclick = function() {
    MathGame.prototype.loadState();
  }

  answerBtn.onclick = function() {
    MathGame.prototype.evaluateGuess();
    MathGame.prototype.randomEquation();
  }

  skipBtn.onclick = function() {
    MathGame.prototype.randomEquation();
  }

  resetBtn.onclick = function() {
    MathGame.prototype.resetGame();
    saveList.innerHTML = ''; //deletes list as there are no saves left in local storage
  }
//create new game object, run loadSaves() to grab all stored saves, then creates a new random equation
let game = new MathGame();
game.loadSaves();
game.randomEquation();
