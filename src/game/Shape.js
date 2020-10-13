import { detectCollision } from './collision';
import Renderer from './Renderer';
import { TetrisBoard } from './tetris';
const renderer = Renderer.getInstance();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default class Shape {
    constructor() {
        this.currentShape = null;
        this.rotatePosition = 0;
        this.position = [];
    }

    setCurrentShape = () => {
        switch (getRandomInt(6)) {
            case 0:
                this.currentShape = tShape;
                break;
            case 1:
                this.currentShape = sShape;
                break;
            case 2:
                this.currentShape = zShape;
                break;
            case 3:
                this.currentShape = iShape;
                break;
            case 4:
                this.currentShape = oShape;
                break;
            case 5:
                this.currentShape = lShape;
                break;
            case 6:
                this.currentShape = jShape;
                break;
        }
    };

    createShapeCoords = () => {
        const newShapePosition = [];
        for (let i = 0; i < this.currentShape[this.rotatePosition].length; i++) {
            for (let j = 0; j < this.currentShape[this.rotatePosition][i].length; j++) {
                if (this.currentShape[this.rotatePosition][i][j]) {
                    let arr = [j, i];
                    newShapePosition.push(arr);
                }
            }
        }
        this.position = newShapePosition;
    };

    static moveToPreviousPosition(previousPosition, shapePosition) {
        const previousX = previousPosition[3][0];
        const previousY = previousPosition[3][1];
        const newShapePosition = [...shapePosition];
        newShapePosition.forEach((coords) => {
            coords[0] = coords[0] + previousX - 1;
            coords[1] = coords[1] + previousY - 1;
        });

        return newShapePosition;
    }

    rotate = () => {
        if (detectCollision(this.position, this.currentShape, this.rotatePosition)) {
            let previousPosition = this.position;
            renderer.clearShape(this.position);
            this.position = [];

            this.rotatePosition++;
            if (this.rotatePosition === this.currentShape.length) {
                this.rotatePosition = 0;
            }
            this.createShapeCoords();
            this.position = Shape.moveToPreviousPosition(previousPosition, this.position);
            this.position.forEach((coords) => {
                const board = TetrisBoard.getInstance().board;
                board.forEach((mapCoords) => {
                    if (mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) {
                        return false;
                    }
                });
                return true;
            });
            TetrisBoard.getInstance().check();

            renderer.render(this.position);
        }
    };

    center = () => {
        this.position.forEach((coords) => {
            if (this.position.some((coords) => coords[1] <= 1)) {
                coords[0] = coords[0] + 3;
            }
        });
    };

    moveRight = () => {
        renderer.clearShape(this.position);
        let direction = 'right';
        const shouldMove = !(
            this.position.some((coords) => coords[0] === 9) || this.isBlockedSide(direction)
        );
        if (shouldMove) {
            this.position.forEach((coords) => {
                coords[0] = coords[0] + 1;
            });
        }

        renderer.render(this.position);
        TetrisBoard.getInstance().check();
    };

    moveLeft = () => {
        renderer.clearShape(this.position);
        let direction = 'left';
        const shouldMove = !(
            this.position.some((coords) => coords[0] === 0) || this.isBlockedSide(direction)
        );
        if (shouldMove) {
            this.position.forEach((coords) => {
                coords[0] = coords[0] - 1;
            });
        }

        renderer.render(this.position);
        TetrisBoard.getInstance().check();
    };

    moveDown = () => {
        renderer.clearShape(this.position);
        this.position.forEach((coords) => {
            coords[1] = coords[1] + 1;
        });

        renderer.render(this.position);
        TetrisBoard.getInstance().check();
    };

    isBlockedSide = (direction) => {
        if (direction == 'right') {
            direction = 1;
        } else if (direction == 'left') {
            direction = -1;
        }
        let shouldContinue = false;
        this.position.forEach((coords) => {
            const board = TetrisBoard.getInstance().board;

            board.forEach((mapCoords) => {
                if (mapCoords[0] === coords[0] + direction && mapCoords[1] === coords[1]) {
                    shouldContinue = true;
                }
            });
        });

        return shouldContinue;
    };
}

export const tShape = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
];
export const lShape = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],

    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],

    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
];
export const jShape = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],

    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],
];
export const zShape = [
    [
        [1, 1, 0],
        [, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],

    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],
];
export const sShape = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ],

    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],

    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
];
export const oShape = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],

    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
];
export const iShape = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],

    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
];
