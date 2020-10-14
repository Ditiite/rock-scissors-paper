
/**
 * @class GameState representing games functionality.
 */
class GameState{
    constructor() {
        this.playerScoreHistory = [];
        this.computerScoreHistory = [];
        this.playerScoreCounter = 0;
        this.computerScoreCounter = 0;
        this.roundsPlayed = 0;
        this.playerChoise = null;
        this.computerChoise = null;
        this.playerResult = null;
        this.computerResult = null;
    };

    setPlayerChoise(value) {
        this.playerChoise = value;
    }

    /**
     * Randomly calculate the hand of computer
     */
    generateComputerChoise() {
        // const randomNumber = Math.ceil( Math.random() * 3 );
        const randomNumber = 2
        switch(randomNumber) {
            case 1:
                this.computerChoise = 'rock';
                break;
            case 2:
                this.computerChoise = 'scissors';
                break;
            case 3:
                this.computerChoise = 'paper';
                break;
            default:
                this.computerChoise = 'rock';
        }
        // this.roundsOfGame();
    }

    /**
     * Round counter, if reach max rounds (10) call for displayGameOverModal() func. 
     * else call to update values
     */
    roundsOfGame() {
        this.playerResult = this.getPlayerGameResult();
        this.computerResult = this.getComputerResult(this.playerResult);

        this.roundsPlayed ++;
    };

    /**
     * Based on players result, we get computers result win/lose
     * @param {string} playerResult 
     */
    getComputerResult(playerResult) {
        switch (playerResult) {
            case 'win':
                return 'lose';
            case 'lose':
                return 'win';
            default:
                return 'tie';
        };
    };

    /**
     * Get player result of the round
     */
    getPlayerGameResult() {
        if (this.playerChoise === this.computerChoise) {
            return 'tie';
        }
        if (this.playerChoise === 'rock') {
            return this.computerChoise === 'scissors' ? 'win' : 'lose';
        } else if (this.playerChoise === 'paper') {
            return this.computerChoise === 'rock' ? 'win' : 'lose';
        } else if (this.playerChoise === 'scissors') {
            return this.computerChoise === 'paper' ? 'win' : 'lose';
        };
    };

    /**
     * Upadate array of player/computer
     */
    updateResultHistory() {
        this.playerScoreHistory.push(this.playerResult);
        this.computerScoreHistory.push(this.computerResult);
    };

    /**
     * Update the win rouond score
     */
    updateScoreCounter() {
        if (this.playerResult === 'win') {
            this.playerScoreCounter ++;
        } else if (this.computerResult === 'win') {
            this.computerScoreCounter ++;
        };
    };


    /**
     * Check if for any of player won last three round in a row
     * 
     * @param {string} player 
     * @param {number} playerScore
     */
    isLastThreeWins(playerScore, cb) {
        const compareLastThreeRounds = playerScore.slice(-3).every(score => score === 'win');
        if (compareLastThreeRounds === true) {
            cb();
        };
    };

};
