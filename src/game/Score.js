const scorePoints = document.querySelector('.score');
const highScorePoints = document.querySelector('.highscore');

export default class Score {
    static instance = null;

    constructor() {
        this.highScore = 0;
        this.previousHighScore = 0;
        this.value = 0;
        this.previous = 0;
    }

     static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }

        return Score.instance;
    }

    updateScoreDisplay = () => {
        scorePoints.innerText = `score: ${this.value}`;
    };

    get isHighestScore() {
        return this.highScore > this.previousHighScore;
    }

    updateHighScoreDisplay = () => {
        this.previousHighScore = this.highScore;
        if (this.value > this.highScore) {
            this.highScore = this.value;
            highScorePoints.innerText = `high score: ${this.highScore}`;
        }
    };
}
