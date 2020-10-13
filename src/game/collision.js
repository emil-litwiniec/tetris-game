import { TetrisBoard } from './tetris';
import Shape from './Shape';

export function detectCollision(shapePosition, currentShape, rotatePosition) {
    const board = TetrisBoard.getInstance().board
    let fakeMap = [...board];

    let fakePreviousPosition = [...shapePosition];
    let fakePosition = [];

    rotatePosition++;
    if (rotatePosition >= currentShape.length) {
        rotatePosition = 0;
    }

    function fakeCreateShapeCoords(shape) {
        if (!shape) return;
        for (let i = 0; i < shape[rotatePosition].length; i++) {
            for (let j = 0; j < shape[rotatePosition][i].length; j++) {
                if (shape[rotatePosition][i][j]) {
                    let arr = [j, i];
                    fakePosition.push(arr);
                }
            }
        }
    }

    let shouldContinue = true;

    fakeCreateShapeCoords(currentShape);
    fakePosition = Shape.moveToPreviousPosition(fakePreviousPosition, fakePosition);

    let checkRing = () => {
        fakePosition.forEach((coords) => {
            fakeMap.forEach((mapCoords) => {
                if (
                    (mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) ||
                    coords[0] > 9 ||
                    coords[0] < 0
                ) {
                    shouldContinue = false;
                }
            });
        });
    };
    checkRing();
    return shouldContinue;
}
