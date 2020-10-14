
/**
 * @class Game representing game Rock, scissors, paper.
 */
class Game {
    constructor() {
        this.gameUI = new GameUI();
        this.gameState = new GameState();
    };

    // Start the game
    init() {
        this.gameUI.onUserClickStart(this.gameStart.bind(this));
        this.gameUI.onPlayerClick(this.whenPlayerClicks.bind(this))
        this.gameUI.reloadGame();
    };

    gameStart() {
        console.log('Start the game',);
        // this.ganeFunc.getPlayerChoise();
    };

    whenPlayerClicks(playerChoise) {
        this.gameUI.displayDefault();
        this.gameUI.startHandAnimation();

        this.gameState.setPlayerChoise(playerChoise);
        this.gameState.generateComputerChoise();
        this.gameState.roundsOfGame();
        
        // After 3 sec call functions to display players and computers hand
        setTimeout(this.evaluateGame.bind(this), 1000);
        setTimeout(this.checkIfMaxRoundPlayed.bind(this), 3000);

        if(this.gameState.playerScoreCounter > 2) {
            this.gameState.isLastThreeWins(this.gameState.playerScoreHistory,() => {
                this.gameUI.displayWinnerOfThreeRouunds('Player');
            });
        } else if (this.gameState.computerScoreCounter > 2) {
            this.gameState.isLastThreeWins(this.gameState.computerScoreHistory,() => {
                this.gameUI.displayWinnerOfThreeRouunds('Computer');
            });
        };
    };

    evaluateGame() {
        // console.log(JSON.stringify(this.gameState, null , 4));
        this.gameUI.displayPlayerChoise(this.gameState.playerChoise);
        this.gameUI.displayComputerChoise(this.gameState.computerChoise);
        switch (this.gameState.playerResult) {
            case 'win':
                this.gameUI.showPlayerWins();
                break;
            case 'lose':
                this.gameUI.showComputerWins();
                break;
            case 'tie':
                this.gameUI.showTie();
                break;
            default:
                this.gameUI.showTie();
                return 'tie';
        };

        this.gameUI.stopHandAnimation();
        this.gameState.updateResultHistory();
        this.gameState.updateScoreCounter();
        this.gameUI.displayScore(this.gameState.playerScoreCounter, this.gameState.computerScoreCounter);
    };

    checkIfMaxRoundPlayed() {
        if (this.gameState.roundsPlayed === 10) {
            this.gameUI.displayGameOverModal(this.gameState.playerScoreCounter, this.gameState.computerScoreCounter);
        };
    };
};

let game = new Game();
game.init();
