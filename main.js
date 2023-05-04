import "./style.css";

//constants
const BORDERS = document.getElementsByClassName("border");
const STARTBTN = document.getElementById("start");
const GAMESTATE = document.getElementById("gameState");
const BESTSCORE = document.getElementById("score");
const ACTUELSCORE = document.getElementById("scoreActuelle");

let bestScore = localStorage.getItem("bestScore")
  ? parseInt(localStorage.getItem("bestScore"))
  : 0;
BESTSCORE.innerHTML = bestScore;

let isStarted = false;
let colorsChoices = [];
//global index to check color
let currentlyChoice = 0;
//variable to count successed room
let successedChoice = 0;

//start the game
STARTBTN.addEventListener("click", () => {
  if (isStarted) {
    STARTBTN.innerHTML = "démarrer";
    isStarted = !isStarted;
    removeEventClicks();
    finishGame();
  } else {
    STARTBTN.innerHTML = "stopper";
    isStarted = !isStarted;
    startGame();
  }
});

function startGame() {
  //if the game is not started
  if (!isStarted) return finishGame();

  //update render of game state
  GAMESTATE.innerHTML = "Le jeu vous montre les nouvelles couleurs";
  //select randomly new color to push to colorChoices
  const selectedColor = Math.floor(Math.random() * BORDERS.length);
  colorsChoices.push(BORDERS[selectedColor].id);
  //set index for loop to add active animation to each selected color
  let indexChoiceAddActive = 0;
  //remove previous event click
  removeEventClicks();
  //toggle active class to each selected color
  let interval = setInterval(() => {
    const choice = document.getElementById(colorsChoices[indexChoiceAddActive]);
    choice.classList.add("active");
    setTimeout(() => {
      choice.classList.remove("active");
      indexChoiceAddActive++;
      if (indexChoiceAddActive >= colorsChoices.length) {
        //add event click to each color
        addClicks();
        return clearInterval(interval);
      }
    }, 500);
  }, 1000);
}

function finishGame() {
  if (successedChoice > bestScore) {
    BESTSCORE.innerHTML = successedChoice;
    localStorage.setItem("bestScore", successedChoice);
  }
  successedChoice = 0;
  currentlyChoice = 0;
  bestScore = 0;
  colorsChoices = [];
  isStarted = false;
  STARTBTN.innerHTML = "démarrer";
  ACTUELSCORE.innerHTML = successedChoice;
  GAMESTATE.innerHTML = "Le jeu n'est pas lancer";
}

//add checkInputs to each colors
function addClicks() {
  for (let index = 0; index < BORDERS.length; index++) {
    const border = BORDERS[index];
    if (index === BORDERS.length - 1) {
      GAMESTATE.innerHTML = "C'est a vous de jouer !";
    }
    border.addEventListener("click", checkInputs);
  }
}

function removeEventClicks() {
  for (let index = 0; index < BORDERS.length; index++) {
    const border = BORDERS[index];
    border.removeEventListener("click", checkInputs);
  }
}

function checkInputs(ev) {
  //check if current color choice is good
  if (ev.target.id !== colorsChoices[currentlyChoice]) {
    finishGame();
  } else {
    //if user has clicked to all good colors
    if (currentlyChoice === colorsChoices.length - 1) {
      currentlyChoice = 0;
      removeEventClicks();
      startGame();
      successedChoice++;
      ACTUELSCORE.innerHTML = successedChoice;
    } else {
      //else increment global choice order
      currentlyChoice++;
    }
  }
}

