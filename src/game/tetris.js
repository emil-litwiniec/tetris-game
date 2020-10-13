import Shape from './Shape';
import Score from './Score';
import Renderer from './Renderer';

const score = Score.getInstance();
const renderer = Renderer.getInstance();
const shape = new Shape();

let intervalId;

let isOn = false;
let isGameOver = false;

renderer.init();

export class TetrisBoard {
    static instance = null;

    constructor() {
        this.board = [];
        this.fullRows = [];
    }

    static getInstance() {
        if (!TetrisBoard.instance) {
            TetrisBoard.instance = new TetrisBoard();
        }
        return TetrisBoard.instance;
    }

    check = () => {
        if (shape.position.some((coords) => coords[1] === 19)) {
            saveAndReset();
        } else {
            this.board.forEach((mapCoords) => {
                const shouldSaveAndReset = shape.position.some(
                    (coords) => coords[1] === mapCoords[1] - 1 && coords[0] === mapCoords[0]
                );
                shouldSaveAndReset && saveAndReset();
            });
        }
    };

    checkRow = () => {
        let counter = [];
        for (let i = 0; i < 20; i++) {
            this.board.forEach((coords) => {
                if (coords[1] === i) {
                    counter.push(i);
                }
            });
        }

        let current = null;
        let cnt = 0;
        for (let i = 0; i < counter.length; i++) {
            if (counter[i] != current) {
                if (cnt > 9) {
                    this.fullRows.push(current);
                }
                current = counter[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }

        if (cnt > 9) {
            this.fullRows.push(current);
        }

        if (this.fullRows.length > 0) deleteFullRows();
    };

    clearRows = () => {
        let newBoard;
        this.fullRows.forEach((row) => {
            newBoard = this.board.filter((coords) => coords[1] !== row);
            this.board = newBoard;
            this.board.forEach((coords) => {
                if (coords[1] < row) {
                    coords[1] = coords[1] + 1;
                }
            });
        });
        this.fullRows = [];
    };
}

const saveAndReset = () => {
    shape.position.forEach((coords) => TetrisBoard.getInstance().board.push(coords));
    shape.position = [];
    renderer.render(TetrisBoard.getInstance().board);
    shape.setCurrentShape();
    shape.rotatePosition = 0;
    shape.createShapeCoords();
    shape.center();
    renderer.render(shape.position);
    TetrisBoard.getInstance().checkRow();
    gameOver();
};

const deleteFullRows = () => {
    const fullRows = TetrisBoard.getInstance().fullRows;
    const scoreMultiplier = Math.pow(fullRows.length, 2);

    TetrisBoard.getInstance().clearRows();
    renderer.clearCanvas();
    renderer.render(shape.position);
    renderer.render(TetrisBoard.getInstance().board);
    score.value = score.value + 250 * scoreMultiplier;
    score.updateScoreDisplay();
};

const toggleOn = () => {
    !isOn ? play() : stop();
};

const play = () => {
    intervalId = setInterval(shape.moveDown, 400);
    score.updateScoreDisplay();
    isOn = !isOn;
};
const stop = () => {
    clearInterval(intervalId);
    isOn = !isOn;
};

const playAgain = () => {
    if (shape.position.length === 0 && TetrisBoard.getInstance().board.length === 0) {
        isGameOver = false;
        renderer.clearCanvas();
        shape.createShapeCoords();
        shape.center();
        renderer.render(shape.position);
    }
};

const resetGame = () => {
    score.updateHighScoreDisplay();
    score.previous = JSON.parse(JSON.stringify(score.value));
    score.value = 0;
    score.updateScoreDisplay();
    renderer.clearCanvas();
    shape.setCurrentShape();
    shape.rotatePosition = 0;
    TetrisBoard.getInstance().checkRow();
    TetrisBoard.getInstance().board = [];
    shape.position = [];
};

const gameOver = () => {
    const board = TetrisBoard.getInstance().board;
    if (board.some((coords) => coords[1] === 0 && board.length > 5)) {
        resetGame();
        stop();
        isGameOver = true;
        renderer.drawGameOverScreen();
    }
};

const handleKeys = (e) => {
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            if (!isGameOver) {
                shape.moveLeft();
            }
            break;
        case 38:
            e.preventDefault();
            if (!isGameOver) {
                shape.rotate();
            }
            break;
        case 39:
            e.preventDefault();
            if (!isGameOver) {
                shape.moveRight();
            }
            break;
        case 40:
            e.preventDefault();
            if (!isGameOver) {
                shape.moveDown();
            }
            break;
        case 80:
            e.preventDefault();
            if (isGameOver) {
                playAgain();
            }
            toggleOn();
            break;
        case 82:
            e.preventDefault();
            resetGame();
            playAgain();
            break;
    }
};
window.addEventListener('keydown', handleKeys);
canvas.addEventListener('click', toggleOn);

resetGame();
playAgain();
