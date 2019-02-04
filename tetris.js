const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', e => {
    switch(e.keyCode) {
        case 37: 
            moveLeft();
            break;     
        case 38:
            rotateShape();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
})

const tShape = [[[0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]],
                
                [[0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]],

                [[0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]],
            
            ];
const lShape = [[[0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]],
                
                [[0, 0, 0],
                [1, 1, 1],
                [1, 0, 0]],

                [[1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]],

                [[0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]],
            
            ];
const jShape = [[[0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]],
                
                [[1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]],

                [[0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]],
            
            ];
const zShape = [[[1, 1, 0],
                [, 1, 1],
                [0, 0, 0]],
                
                [[0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]],

                [[0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]],

                [[0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]],
            
            ];
const sShape = [[[0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]],
                
                [[0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]],

                [[0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]],

                [[1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]],
            
            ];
const oShape = [[[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]],
                
                 [[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]],

                 [[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]],

                 [[0, 0, 0, 0],
                 [0, 1, 1, 0],
                 [0, 1, 1, 0],
                 [0, 0, 0, 0]],
                ];
const iShape = [[[0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0]],
                
                 [[0, 0, 0, 0],
                 [1, 1, 1, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]],

                 [[0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0]],

                 [[0, 0, 0, 0],
                 [1, 1, 1, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]],
                ];
xp = yp = 0; // x position, y position
sl = step = 20 // SIDE LENGTH of a single square AND grid step

testMap = [[2, 5], [2, 6]];

let shapePosition = [];
let rotatePosition = 0;


function createShapeCoords(shape) {
    // console.log(shape[1]);
    for (let i = 0; i < shape[rotatePosition].length; i++) {
        for(let j = 0; j < shape[rotatePosition][i].length; j++) {
            if(shape[rotatePosition][i][j]) {
                let arr = [j, i];
                shapePosition.push(arr);
                // console.log(shapePosition);
            }
        }
    }
}

function clearShape() {
    console.log('clear');
    shapePosition.forEach(coords => {
        // console.log(coords);
        let x = coords[0] * step;
        let y = coords[1] * step;
        ctx.clearRect(x, y, sl, sl);
    })
    
}

function rotateShape() {
    let previousPosition = shapePosition;
    clearShape();
    shapePosition = [];
    rotatePosition++;
    if(rotatePosition === 4) {
        rotatePosition = 0;
    }
    createShapeCoords(iShape);
    moveToPreviousPosition(previousPosition);
    // console.log(previousPosition);
    
    render(shapePosition);
}

function moveToPreviousPosition(previousPosition) {
    let previousX = previousPosition[3][0];
    let previousY = previousPosition[3][1];
    console.log(previousX, previousY);
    shapePosition.forEach(coords => {
        console.log(coords);
        coords[0] = coords[0] + previousX - 1;
        coords[1] = coords[1] + previousY - 1;
        console.log(coords[0]);
        console.log(coords[1]);

    })
    // console.log(shapePosition);
}
function moveRight() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[0] = coords[0] + 1;
    //    console.log(coords);
    });
    render(shapePosition);
}

function moveLeft() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[0] = coords[0] + -1;
    //    console.log(coords);
    });

    render(shapePosition);
}

function moveDown() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[1] = coords[1] + 1;
    //    console.log(coords);
    });

    render(shapePosition);
    check();
}
function render(coordsArr, color) {
    // ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    coordsArr.forEach(coords => {
        let x = coords[0];
        let y = coords[1];
        drawSquare(x, y, color);
    });
}
function check() {
    if(shapePosition.some(coords => coords[1] === 19) )
         {
        console.log('shape reached the bottom!');
        shapePosition.forEach(coords => testMap.push(coords));
        shapePosition = [];
        render(testMap);
        createShapeCoords(lShape);
        render(shapePosition);
    }
    // testMap.forEach(mapCoords => {
    //     if(shapePosition.some(coords => coords[1] === (mapCoords[1] - 1))){
    //         console.log('aj');
    //     };
    // });
}



function drawSquare(xp, yp, color) {
    let cXp = xp * step;
    let cYp = yp * step;

    ctx.fillStyle = color;
    ctx. fillRect(cXp, cYp, sl, sl);
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
    ctx.rect(cXp, cYp, sl, sl); 
    ctx.stroke();
}
check();
createShapeCoords(oShape);
render(shapePosition, 'blue');
render(testMap);
// setInterval(moveDown, 500);