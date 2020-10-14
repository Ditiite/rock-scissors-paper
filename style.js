/**
 * @class GameUI representing game UI changes.
 */
class GameUI {
    constructor() {
        this.startBtn = document.querySelector('.btn__start-game');
        this.gameScreen = document.querySelector('.game-screen');
        this.playerHand = document.querySelector('.player-hand');
        this.computerHand = document.querySelector('.computer__hand');
        this.roundWinner = document.querySelector('.round-winner');
        this.animation = document.querySelector('.choise');
        this.modal = document.querySelector("#modal");
        this.playerScoreHTML = document.querySelector('#player__score');
        this.computerScoreHTML = document.querySelector('#computer__score');
        this.gameWinner = document.querySelector('.winner');
    };

    /**
     * Open the screen of the game once user click on "Let's play" button
     */
    onUserClickStart(cb) {
        this.startBtn.addEventListener('click', () => {
            this.gameScreen.classList.add('fade__in');
            this.gameScreen.classList.remove('fade__out');
            this.startBtn.classList.add('fade__out');
            cb();
        });
    };

    /**
     * Reloads the page reseting all the values, when "Startt new game" button is clicked 
     */
    reloadGame() {
        const newGameBtn = document.querySelector('.btn__start-new-game');
        newGameBtn.addEventListener('click', () => {
            this.modal.classList.add('fade__out');
            this.modal.classList.remove('fade__in');
            setTimeout(() => {
                location.reload();
            }, 500);
        });
    };

    /**
     * Listen player click on options and forward the 
     * value to callback
     */
    onPlayerClick(cb) {
        const playerOptions = document.querySelectorAll('.btn__option');
        for(let option of playerOptions) {
            option.addEventListener('click', () => {
                cb(option.value);
            });
        };
    };

    /**
     * Reset values for hands and text before each round
     */
    displayDefault() {
        this.playerHand.src = './assets/rock.png';
        this.computerHand.src = './assets/rock.png';
        this.roundWinner.innerHTML = '';
        
    };

    /**
     * Responsible for animation
     */
    startHandAnimation() {
        this.animation.classList.add('animation');
    }
    stopHandAnimation() {
        this.animation.classList.remove('animation');
    }

    /**
     * Display the choise of player/computer
     * 
     * @param {string} choise selected hand
     * @param {string} player player or computer
     */
    displayPlayerChoise(choise) {
        this.playerHand.src = `./assets/${choise}.png`;
    };
    displayComputerChoise(choise) {
        this.computerHand.src = `./assets/${choise}.png`;
    };

    /**
     * Following three func dispaly the winner/tie of the round
     */
    showTie() {
        this.roundWinner.innerHTML = "It's a tie!!!";
    };
    showPlayerWins() {
        this.roundWinner.innerHTML = "Player wins!";
    };
    showComputerWins() {
        this.roundWinner.innerHTML = "Computer wins!";
    };

    /**
     * Check the winner of the game and display in game over modal.
     * @param {number} playerScoreCounter
     * @param {number} computerScoreCounter
     * @param {string} player
     */
    displayGameOverModal = (playerScoreCounter, computerScoreCounter) => {
        this.modal.classList.remove('fade__out', 'not-visible');
        this.modal.classList.add('fade__in');

        if (playerScoreCounter > computerScoreCounter) {
            this.gameWinner.innerHTML = `The winner is Palyer!`;
        } else if (playerScoreCounter < computerScoreCounter) {
            this.gameWinner.innerHTML = `The winner is Computer!`;
        } else if (playerScoreCounter === computerScoreCounter) {
            this.gameWinner.innerHTML = "It's a tie!!!";
        };
    };

    /**
     * Display winner if the last three rounds in row are win
     * @param {string} player 
     */
    displayWinnerOfThreeRouunds(player) {
        this.modal.classList.remove('fade__out', 'not-visible');
        this.modal.classList.add('fade__in');
        this.gameWinner.innerHTML = `The winner is ${player}!`;
    };

    /**
     * Display score of player/computer
     * @param {number} playerCounter 
     * @param {number} computerCounter 
     */
    displayScore(playerCounter, computerCounter) {
        this.playerScoreHTML.innerHTML = playerCounter;
        this.computerScoreHTML.innerHTML = computerCounter;
    };
};
