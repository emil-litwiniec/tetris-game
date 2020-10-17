import Shape from './Shape';
import Score from './Score';
import Renderer from './Renderer';
import Board from './Board';

const score = Score.getInstance();
const renderer = Renderer.getInstance();
const shape = Shape.getInstance();
const board = Board.getInstance();

let intervalId;

let isOn = false;
let isGameOver = false;

renderer.init();

export const saveAndReset = () => {
    shape.position.forEach((coords) => board.board.push(coords));
    shape.position = [];
    renderer.render(board.board);
    shape.setCurrentShape();
    shape.rotatePosition = 0;
    shape.createShapeCoords();
    shape.center();
    renderer.render(shape.position);
    board.checkRow();
    checkIfGameOver();
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
    const shouldPlayAgain = shape.position.length === 0 && board.board.length === 0;
    if (!shouldPlayAgain) return;

    isGameOver = false;
    renderer.clearCanvas();
    shape.createShapeCoords();
    shape.center();
    renderer.render(shape.position);
};

const resetGame = () => {
    score.updateHighScoreDisplay();
    score.previous = JSON.parse(JSON.stringify(score.value));
    score.value = 0;
    score.updateScoreDisplay();
    renderer.clearCanvas();
    shape.setCurrentShape();
    shape.rotatePosition = 0;
    board.checkRow();
    board.board = [];
    shape.position = [];
};

const checkIfGameOver = () => {
    const shouldBeGameOver = board.board.some(
        (coords) => coords[1] === 0 && board.board.length > 5
    );
    if (!shouldBeGameOver) return;

    resetGame();
    stop();
    isGameOver = true;
    renderer.drawGameOverScreen();
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
