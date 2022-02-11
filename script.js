'use strict';
const log = console.log;

/* Query selectors */
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");

/* Player variables */
let activePlayer = "player--0";
let player0score = 0;
let player1score = 0;
let tempScore = 0;

/* Functions */

/* Returns a random number  between 1 and 6 */
const rollDice = () => {
    return Math.trunc(Math.random()*6) + 1;
};

/* Sets dice image according to generated random digit */
const setDiceImage = (randomDigit) => diceImg.src = `dice-${randomDigit}.png`;

/* Swaps active player */
const swapActivePlayer = () => {
    const prevPlayer = activePlayer;
    activePlayer = activePlayer === "player--0" ? "player--1" : "player--0";
    document.querySelector(`.${prevPlayer}`).classList.remove("player--active");
    document.querySelector(`.${activePlayer}`).classList.add("player--active");
};

/* Updates current */
const updateCurrent = (score) => {
    document.querySelector(`#current--${activePlayer.slice(-1)}`).textContent = score;
};

/* Update score */
const updateScore = () => {
    document.querySelector(`#score--${activePlayer.slice(-1)}`).textContent = activePlayer === "player--0" ? 
                                                                                player0score : player1score;
    updateCurrent(0);
};

/* Checks for winner */
const checkWinner = () => {
    if (player1score >= 100 || player0score >= 100){
        document.querySelector(`.${player1score >= 100 ? "player--1": "player--0"}`).classList.add("player--winner");
        rollBtn.disabled = holdBtn.disabled = true;
    }
};

/* Eventlistener callbacks */
const onRollingDice = () => {
    
    const randomNumber = rollDice();
    setDiceImage(randomNumber);

    if (randomNumber !== 1){
        tempScore += randomNumber;
        updateCurrent(tempScore);
        log(tempScore);
    }else{
        tempScore = 0;
        updateCurrent(tempScore);
        swapActivePlayer();
    }
};

const onHoldingScore = () => {
    
    activePlayer === "player--0" ? player0score += tempScore : player1score += tempScore;

    log(`${activePlayer} holded ${tempScore}, current score is ${activePlayer === "player--0" 
                                                                    ? player0score : player1score}`);

    updateScore();
    tempScore = 0;
    checkWinner();
    swapActivePlayer();
};

const onNewGame = () =>{
    window.location = window.location;
};

/* Eventlisteners */
rollBtn.addEventListener('click', onRollingDice);
holdBtn.addEventListener('click', onHoldingScore);
newBtn.addEventListener('click', onNewGame);