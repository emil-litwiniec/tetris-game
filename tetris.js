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

testMap = [[0,19], [1,19], [2,19], [3,19], [4,19], [5,19], [6,19], [7,19], [8,19],[0,18], [1,18], [2,18], [3,18], [4,18], [5,18], [6,18], [7,18], [8,18]];

let shapePosition = [];
let rotatePosition = 0;
let actualShape;

ctx.beginPath();
ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
ctx.fillStyle = "#00B962";
ctx.fill();

function setActualShape() {
switch (getRandomInt(6)) {
    case 0:
        actualShape = tShape;
        break;
    case 1:
        actualShape = sShape;
        break;
    case 2:
        actualShape = zShape;
        break;
    case 3:
        actualShape = iShape;
        break;
    case 4:
        actualShape = oShape;
        break;
    case 5:
        actualShape = lShape;
        break;
    case 6:
        actualShape = jShape;
        break;
}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function createShapeCoords(shape) {
    for (let i = 0; i < shape[rotatePosition].length; i++) {
        for(let j = 0; j < shape[rotatePosition][i].length; j++) {
            if(shape[rotatePosition][i][j]) {
                let arr = [j, i];
                shapePosition.push(arr);
            }
        }
    }
}

function clearShape() {
    shapePosition.forEach(coords => {
        let x = coords[0] * step;
        let y = coords[1] * step;
        ctx.fillStyle = '#00B962';
        ctx.fillRect(x, y, sl + 1, sl +1);
        ctx.fillStyle = '#003511';
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
    createShapeCoords(actualShape);
    moveToPreviousPosition(previousPosition);
    
    render(shapePosition);
}

function moveToPreviousPosition(previousPosition) {
    let previousX = previousPosition[3][0];
    let previousY = previousPosition[3][1];
    shapePosition.forEach(coords => {
        coords[0] = coords[0] + previousX - 1;
        coords[1] = coords[1] + previousY - 1;

    })
}
function moveRight() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[0] = coords[0] + 1;
    });
    render(shapePosition);
    check();
}

function moveLeft() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[0] = coords[0] + -1;
    });

    render(shapePosition);
    check();
}

function moveDown() {
    clearShape();
    shapePosition.forEach(coords => {
         coords[1] = coords[1] + 1;
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

            saveAndReset();
    } else {
    testMap.forEach(mapCoords => {
        if(shapePosition.some(coords => coords[1] === (mapCoords[1] - 1) && coords[0] === mapCoords[0])){
            
            saveAndReset();

        };
    });
}

    

    function saveAndReset() {
        shapePosition.forEach(coords => testMap.push(coords));
        shapePosition = [];
        render(testMap);
        setActualShape();
        createShapeCoords(actualShape);
        render(shapePosition);
        checkRow();
    }

}
let fullRows = [];
function checkRow() {
    fullRows = [];
    let counter = [];
    for(let i = 0; i < 20; i++) {
        testMap.forEach(coords => {
            // console.log(coords[1]);
            if (coords[1] === i){
                // console.log(i);
                counter.push(i);
            }
        })
    }
    
    console.log(counter);
    let current = null;
    let cnt = 0;
    for (let i = 0; i < counter.length; i++) {
    if (counter[i] != current) {
        if (cnt > 9) {
            fullRows.push(current);
        }
        current = counter[i];
        cnt = 1;
    } else {
        cnt++;
    }
    }
    if (cnt > 9) {
        fullRows.push(current);
    };

    if (fullRows.length > 0) deleteFullRows();


};

function deleteFullRows() {
    let newMap;


    // for(let j = 0; j < fullRows.length; j++) {
    //     console.log('hej', j);
    //     for(let i = 0; i < testMap.length; i++) {
    //         console.log(i, testMap[i][1]);
    //         if(testMap[i][1] == fullRows[j] ){
    //             // console.log(testMap[i]);
    //             testMap.splice(i, 1);
    //         };
    //     }
    // }
    fullRows.forEach(row => {
        console.log(row);
        newMap = testMap.filter(coords => coords[1] !== row);
        testMap = newMap;


    });
        
    

    // fullRows = [];
    clearCanvas();
    render(shapePosition);
    render(testMap);
}

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#00B962";
    ctx.fill();
    ctx.fillStyle = "#003511";
}

function drawSquare(xp, yp, color) {
    let cXp = xp * step;
    let cYp = yp * step;

    ctx.fillStyle = color;
    ctx. fillRect(cXp, cYp, sl, sl);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#00B962";
    ctx.rect(cXp  , cYp , sl  , sl ); 
    ctx.stroke();
    ctx.closePath();
}
check();
setActualShape();
createShapeCoords(actualShape);
render(shapePosition, '#003511');
render(testMap);
// setInterval(moveDown, 400);