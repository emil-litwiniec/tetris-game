import { saveAndReset } from './tetris';
import Renderer from './Renderer';
import Score from './Score';
import Shape from './Shape';

const renderer = Renderer.getInstance();
const score = Score.getInstance();

export default class Board {
    static instance = null;

    constructor() {
        this.board = [];
        this.fullRows = [];
    }

    static getInstance() {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }

    check = () => {
        const shape = Shape.getInstance();

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

        if (this.fullRows.length > 0) this.deleteFullRows();
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

    deleteFullRows = () => {
        const shape = Shape.getInstance();
        const scoreMultiplier = Math.pow(this.fullRows.length, 2);
        this.clearRows();
        renderer.clearCanvas();
        renderer.render(shape.position);
        renderer.render(this.board);
        score.value = score.value + 250 * scoreMultiplier;
        score.updateScoreDisplay();
    };
}
