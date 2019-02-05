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
                 [0, 0, 0, 0]]
                ];
const iShape = [[[0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 0, 0]],
                
                 [[0, 0, 0, 0],
                 [1, 1, 1, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]]
                ];
xp = yp = 0; // x position, y position
sl = step = 20 // SIDE LENGTH of a single square AND grid step

testMap = [];

let shapePosition = [];
let rotatePosition = 0;
let actualShape;
let score = 0;

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
let preventRotate = shapePosition.some(coords => {



})



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


function centerNewShape() {
    shapePosition.forEach(coords => {
        if(shapePosition.some(coords => coords[1] <= 1)){
        coords[0] = coords[0] + 3;
        }
    });
}


function isGameOver() {
    if(testMap.some(coords => coords[1] === 0)) {
        resetGame();
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
function findDuplicate(arr) {
    const object = {};
    const result = [];

    arr.forEach(item => {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    }
    )

    for(const prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
}



let fakeRotatePosition = rotatePosition;

function simulateBut() {
    let fakeMap = [...testMap];

    let fakePreviousPosition = fakePosition = [...shapePosition];
    // fakeClearShape();
    fakePosition = [];
    fakeRotatePosition++;
    if(fakeRotatePosition === actualShape.length) {
       fakeRotatePosition = 0;
    }
    function fakeCreateShapeCoords(shape) {
        for (let i = 0; i < shape[fakeRotatePosition].length; i++) {
            for(let j = 0; j < shape[fakeRotatePosition][i].length; j++) {
                if(shape[fakeRotatePosition][i][j]) {
                    let arr = [j, i];
                    fakePosition.push(arr);
                }
            }
        }
        
    }
    function fakeMoveToPreviousPosition(fakePreviousPosition) {
        let previousX = fakePreviousPosition[3][0];
        let previousY = fakePreviousPosition[3][1];
        fakePosition.forEach(coords => {
            coords[0] = coords[0] + previousX - 1;
            coords[1] = coords[1] + previousY - 1;
    
        })
    }
  
    let cont = true;

    fakeCreateShapeCoords(actualShape);
    fakeMoveToPreviousPosition(fakePreviousPosition);

    let ringa = () => {fakePosition.forEach(coords => {
        // console.log(coords);
        fakeMap.forEach(mapCoords => {
            // console.log('hej', mapCoords, coords);
            // console.log(mapCoords[0] == coords[0]);

            if((mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) || 
                coords[0] > 9 || coords[0] < 0 ) {
                cont =  false;
                
            }
        })
    })}
    ringa();

    // console.log(`fakeRotatePosition: ${fakeRotatePosition} 
    // rotatePosition: ${rotatePosition} previousPosition: ${fakePreviousPosition} 
    // fakePosition: ${fakePosition} shapePosition:${shapePosition}`)

    return cont;
}

function rotateShape() {
    fakeRotatePosition = rotatePosition;
    if(simulateBut()){
    let previousPosition = shapePosition;
    clearShape();
    shapePosition = [];

    console.log(previousPosition, shapePosition);
    rotatePosition++;
    if(rotatePosition === actualShape.length) {
        rotatePosition = 0;
    }
    createShapeCoords(actualShape);
    moveToPreviousPosition(previousPosition);
    // console.log(shapePosition);
    // if(shapePosition.forEach(coords => {
    //     testMap.forEach(mapCoords => mapCoords === coords)
    // })){
    //     console.log('auauaua!');
    // }
    shapePosition.forEach(coords => {
        // console.log(coords);
        testMap.forEach(mapCoords => {
            // console.log('hej', mapCoords, coords);
            // console.log(mapCoords[0] == coords[0]);

            if(mapCoords[0] == coords[0] && mapCoords[1] == coords[1]) {
                return false;
                
            }
        })
        return true;
    })
    check();
    
    render(shapePosition);
}
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
    if(shapePosition.some(coords => coords[0] === 9)) {
        null;
    } else {
    shapePosition.forEach(coords => {
        
            coords[0] = coords[0] + 1;
    });
    }
    render(shapePosition);
    check();
}

function moveLeft() {
    clearShape();

    if(shapePosition.some(coords => coords[0] === 0)) {
        null;
    } else {
    shapePosition.forEach(coords => {
        
            coords[0] = coords[0] + -1;
    });
    }

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
        rotatePosition = 0;
        createShapeCoords(actualShape);
        centerNewShape();
        render(shapePosition);
        checkRow();
        isGameOver();
    }

}
let fullRows = [];
function checkRow() {
    fullRows = [];
    let counter = [];
    for(let i = 0; i < 20; i++) {
        testMap.forEach(coords => {
            if (coords[1] === i){
                counter.push(i);
            }
        })
    }
    
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
    fullRows.forEach(row => {
        newMap = testMap.filter(coords => coords[1] !== row);
        testMap = newMap;
        testMap.forEach(coords => {
            if(coords[1] < row) {
                coords[1] = coords[1] + 1;
            }
        })
    });
    let scoreMultiplier = fullRows.length*1.3;
    fullRows = [];
    clearCanvas();
    render(shapePosition);
    render(testMap);
    score = score + (250 * scoreMultiplier);
    console.log(`Your score is ${score}.`);
}

function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#00B962";
    ctx.fill();
    ctx.fillStyle = "#003511";
}

function resetGame() {
    testMap = [];
    score = 0;
    clearCanvas();
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

// function stopGame() {

// }
check();
setActualShape();
createShapeCoords(actualShape);
render(shapePosition, '#003511');
render(testMap);
setInterval(moveDown, 400);