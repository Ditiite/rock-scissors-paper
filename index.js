
let playerScoreHistory = [];
let computerScoreHistory = [];
let playerScoreCounter = 0;
let computerScoreCounter = 0;
let roundsPlayed = 0;
let computerChoise;
let playerChoise;

const playerOptions = document.querySelectorAll('.btn__option');
const playerScoreHTML = document.querySelector('#player__score');
const computerScoreHTML = document.querySelector('#computer__score');
const roundWinner = document.querySelector('.round-winner');
const animation = document.querySelector('.choise');
const computerHand = document.querySelector('.computer__hand');
const modal = document.querySelector("#modal");


const startGame = () => {
    const startBtn = document.querySelector('.btn__start-game');
    const gameScreen = document.querySelector('.game-screen');
    startBtn.addEventListener('click', () => {
        gameScreen.classList.add('fade__in');
        gameScreen.classList.remove('fade__out');
        startBtn.classList.add('fade__out');
    });

    getPlayerChoise();
}

// Get the choise of user
const getPlayerChoise = () => {
    const playerHand = document.querySelector('.player-hand');

    for(const option of playerOptions) {
        option.addEventListener('click', () => {
            playerHand.src = './assets/rock.png';
            computerHand.src = './assets/rock.png';
            roundWinner.innerHTML = '';

            playerChoise = option.value;
            animation.classList.add('animation');
            setTimeout(() => {
                displayChoise(playerChoise, playerHand);
                getComputerChoise();
            }, 3000)
        })
    }
}

// Get the choise of computer
const getComputerChoise = () => {
    computerChoise = Math.ceil( Math.random() * 3 );

    switch(computerChoise) {
        case 1:
            computerChoise = 'rock';
            break;
        case 2:
            computerChoise = 'scissors';
            break;
        case 3:
            computerChoise = 'paper';
            break;
        default:
            computerChoise = 'rock';
    }

    displayChoise(computerChoise, computerHand);
    roundsOfGame();
}

// Display image for player and computer accordingly to choise
const displayChoise = (choise, player) => {
    animation.classList.remove('animation');
    player.src = `./assets/${choise}.png`;
}

// Counts rounds of the game and check if the game reachem max rounds.
const roundsOfGame = () => {
    roundsPlayed ++;

    if (roundsPlayed >= 2) {
        // If game over, disable the choise buttons
        for(let btn of playerOptions) {
            btn.setAttribute('disabled', true);
        }

        displayGameOverModal();
    }

    getMatchResult();

}

// Get the winner/looser or tie of the match
const getMatchResult = () => {
    console.log("Player choise: ", playerChoise);
    console.log("Computer choise: ", computerChoise);

    if (playerChoise === computerChoise) {
        displayWinnerOfRound('tie')
        updatePlayerScore('tie');
        updateComputerScore('tie');
        console.log("it's a tie!!!")
        return;
    }

    if (playerChoise === 'rock') {
        if (computerChoise === 'scissors') {
            updatePlayerScore('win')
            updateComputerScore('lose');
        } else {
            updatePlayerScore('lose');
            updateComputerScore('win');
        }
    } else if (playerChoise === 'paper') {
        if (computerChoise === 'scissors') {
            updatePlayerScore('lose');
            updateComputerScore('win');
        } else {
            updatePlayerScore('win')
            updateComputerScore('lose');
        }
    } else if (playerChoise === 'scissors') {
        if (computerChoise === 'rock') {
            updatePlayerScore('lose');
            updateComputerScore('win');
        } else {
            updatePlayerScore('win')
            updateComputerScore('lose');
        }
    }
}


// Update player score
const updatePlayerScore = ( result ) => {
    playerScoreHistory.push( result );
    if ( result === 'win' ) {
        playerScoreCounter ++;
        playerScoreHTML.innerHTML = playerScoreCounter;
        displayWinnerOfRound('Player');

        if (playerScoreCounter >= 3) {
            isLastThreeWins(playerScoreHistory, 'Player');
        }
    }

    console.log("playerScoreCounter: ", playerScoreCounter);
}

// Update computer score
const updateComputerScore = ( result ) => {
    computerScoreHistory.push( result );
    if ( result === 'win' ) {
        computerScoreCounter ++;
        computerScoreHTML.innerHTML = computerScoreCounter;
        displayWinnerOfRound('Computer');
        if (computerScoreCounter >= 3) {
            isLastThreeWins(computerScoreHistory, 'Computer');
        }
    }

    console.log("computerScoreCounter: ", computerScoreCounter);
}

// Game over
const displayGameOverModal = (player) => {
    const gameWinner = document.querySelector('.winner');
    modal.classList.remove('fade__out', 'not-visible');
    modal.classList.add('fade__in');

    if (playerScoreCounter > computerScoreCounter) {
        gameWinner.innerHTML = `The winner is palyer`;
    } else if (playerScoreCounter < computerScoreCounter) {
        gameWinner.innerHTML = `The winner is computer`;
    } else if (playerScoreCounter === computerScoreCounter) {
        gameWinner.innerHTML = "It's a tie!!!";
    } else {
        gameWinner.innerHTML = `The winner is ${player}`;
    }

    startNewGame();
}

// Display text who won the round
const displayWinnerOfRound = (winner) => {
    if (winner === 'tie') {
        return roundWinner.innerHTML = "It's a tie!!!";
    } else {
        return roundWinner.innerHTML = `${winner} wins!`;
    }
}

// Check for 3 wins
const isLastThreeWins = (playerScore, player) => {
    const compareLastThreeRounds = playerScore.slice(-3).every(score => score === 'win');
    if (compareLastThreeRounds === true) {
        displayGameOverModal(player);
    }
}

// Start new game. Reset all values
const startNewGame = () => {
    const newGameBtn = document.querySelector('.btn__start-new-game');
    newGameBtn.addEventListener('click', () => {
        modal.classList.add('fade__out');
        modal.classList.remove('fade__in');
        setTimeout(() => {
            location.reload();
        }, 500)
    })
}


startGame();

